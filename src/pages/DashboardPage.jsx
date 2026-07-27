import { useEffect, useMemo, useState } from 'react';
import { Briefcase, Users, Building2, CalendarDays, Plus, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeFormModal from '../components/EmployeeFormModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import AnalyticsSection from '../components/AnalyticsSection';
import { employeeService } from '../services/employeeService';
import { EMPLOYEE_DEPARTMENTS, EMPLOYEE_STATUSES, filterEmployees, paginateEmployees } from '../utils/employeeUtils';

export default function DashboardPage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const pageSize = 5;

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await employeeService.list();
      setEmployees(response);
    } catch (err) {
      setError(err.message || 'Unable to fetch employees.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, department, status]);

  const filteredEmployees = useMemo(
    () => filterEmployees({ employees, query: debouncedQuery, department, status }),
    [employees, debouncedQuery, department, status],
  );

  const paginatedEmployees = useMemo(() => paginateEmployees({ employees: filteredEmployees, page, pageSize }), [filteredEmployees, page]);

  const cards = [
    { title: 'Total Employees', value: employees.length, icon: Users, tone: 'bg-slate-900 text-white' },
    { title: 'Active Employees', value: employees.filter((employee) => employee.status === 'Active').length, icon: Briefcase, tone: 'bg-slate-100 text-slate-700' },
    { title: 'Departments', value: new Set(employees.map((employee) => employee.department)).size, icon: Building2, tone: 'bg-slate-100 text-slate-700' },
    { title: 'Joined This Month', value: employees.filter((employee) => employee.joiningDate?.startsWith('2024')).length, icon: CalendarDays, tone: 'bg-slate-100 text-slate-700' },
  ];

  const handleCreateOrUpdate = async (payload) => {
    try {
      if (selectedEmployee) {
        const updatedEmployee = await employeeService.update(selectedEmployee.id, payload);
        setEmployees((current) => current.map((employee) => (employee.id === selectedEmployee.id ? updatedEmployee : employee)));
        toast.success('Employee updated successfully.');
      } else {
        const createdEmployee = await employeeService.create(payload);
        setEmployees((current) => [createdEmployee, ...current]);
        toast.success('Employee added successfully.');
      }
      setIsModalOpen(false);
      setSelectedEmployee(null);
    } catch (err) {
      toast.error(err.message || 'Unable to save employee.');
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await employeeService.remove(employeeId);
      setEmployees((current) => current.filter((employee) => employee.id !== employeeId));
      toast.success('Employee deleted successfully.');
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
    } catch (err) {
      toast.error(err.message || 'Unable to delete employee.');
    }
  };

  const openCreateModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, tone }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-xl p-2 ${tone}`}>
              <Icon size={18} />
            </div>
            <p className="mt-4 text-sm text-slate-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <AnalyticsSection employees={employees} />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Employee Directory</h3>
            <p className="text-sm text-slate-500">Search, filter, and manage records.</p>
          </div>
          <button type="button" onClick={openCreateModal} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            <Plus size={16} />
            Add Employee
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email" className="w-full border-none bg-transparent outline-none" />
          </label>
          <select value={department} onChange={(event) => setDepartment(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none">
            <option value="">All Departments</option>
            {EMPLOYEE_DEPARTMENTS.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none">
            {EMPLOYEE_STATUSES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          {isLoading ? <Loader /> : error ? <ErrorState message={error} onRetry={loadEmployees} /> : filteredEmployees.length === 0 ? <EmptyState /> : (
            <>
              <EmployeeTable employees={paginatedEmployees.items} onEdit={openEditModal} onDelete={openDeleteModal} />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  Showing {paginatedEmployees.items.length} of {filteredEmployees.length} employees
                </p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
                  {Array.from({ length: paginatedEmployees.totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} className={`h-9 w-9 rounded-lg border text-sm font-semibold ${page === pageNumber ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600'}`}>
                      {pageNumber}
                    </button>
                  ))}
                  <button type="button" onClick={() => setPage((current) => Math.min(paginatedEmployees.totalPages, current + 1))} disabled={page === paginatedEmployees.totalPages} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <EmployeeFormModal isOpen={isModalOpen} employee={selectedEmployee} onClose={() => { setIsModalOpen(false); setSelectedEmployee(null); }} onSubmit={handleCreateOrUpdate} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} employee={selectedEmployee} onClose={() => { setIsDeleteModalOpen(false); setSelectedEmployee(null); }} onConfirm={handleDelete} />
    </div>
  );
}
