import { useEffect, useMemo, useState } from 'react';
import { Activity, Briefcase, Building2, Plus, Search, Users, UserX } from 'lucide-react';
import { toast } from 'react-hot-toast';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeFormModal from '../components/EmployeeFormModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import AnalyticsSection from '../components/AnalyticsSection';
import { employeeService } from '../services/employeeService';
import { EMPLOYEE_DEPARTMENTS, EMPLOYEE_STATUSES, filterEmployees, paginateEmployees, sortEmployees } from '../utils/employeeUtils';

export default function DashboardPage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
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
  }, [debouncedQuery, department, status, sortBy]);

  const filteredEmployees = useMemo(
    () => filterEmployees({ employees, query: debouncedQuery, department, status }),
    [employees, debouncedQuery, department, status],
  );

  const sortedEmployees = useMemo(() => sortEmployees({ employees: filteredEmployees, sortBy }), [filteredEmployees, sortBy]);

  const paginatedEmployees = useMemo(() => paginateEmployees({ employees: sortedEmployees, page, pageSize }), [sortedEmployees, page]);

  const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;
  const inactiveEmployees = employees.filter((employee) => employee.status === 'Inactive').length;

  const cards = [
    { title: 'Total Employees', value: employees.length, description: 'All records in the directory', icon: Users, tone: 'bg-blue-50 text-blue-700' },
    { title: 'Active Employees', value: activeEmployees, description: 'Currently contributing', icon: Activity, tone: 'bg-emerald-50 text-emerald-700' },
    { title: 'Inactive Employees', value: inactiveEmployees, description: 'Pending review or offboarded', icon: UserX, tone: 'bg-amber-50 text-amber-700' },
    { title: 'Departments', value: new Set(employees.map((employee) => employee.department)).size, description: 'Distinct business units', icon: Building2, tone: 'bg-indigo-50 text-indigo-700' },
  ];

  const handleCreateOrUpdate = async (payload) => {
    try {
      if (selectedEmployee) {
        const updatedEmployee = await employeeService.update(selectedEmployee.id, payload);
        setEmployees((current) => current.map((employee) => (employee.id === selectedEmployee.id ? updatedEmployee : employee)));
        toast.success('Employee updated successfully.');
      } else {
        const createdEmployee = await employeeService.create({
          ...payload,
          createdAt: new Date().toISOString(),
        });
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

  const resetFilters = () => {
    setQuery('');
    setDepartment('');
    setStatus('All');
    setSortBy('recent');
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      <section id="dashboard" className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, description, icon: Icon, tone }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <div className={`inline-flex rounded-xl p-2 ${tone}`}>
              <Icon size={18} />
            </div>
            <p className="mt-4 text-sm text-slate-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
            <p className="mt-2 text-sm text-slate-500">{description}</p>
          </div>
        ))}
      </section>

      <section id="analytics" className="overflow-hidden">
        <AnalyticsSection employees={employees} />
      </section>

      <section id="employee-list" className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Employee Directory</h3>
            <p className="text-sm text-slate-500">Search, filter, and manage records with confidence.</p>
          </div>
          <button type="button" onClick={openCreateModal} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 md:w-auto">
            <Plus size={16} />
            Add Employee
          </button>
        </div>

        <div className="mt-3 grid gap-2.5 sm:mt-6 sm:grid-cols-2 xl:grid-cols-5">
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 sm:col-span-2 xl:col-span-2">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email" className="w-full border-none bg-transparent outline-none" />
          </label>
          <select value={department} onChange={(event) => setDepartment(event.target.value)} className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none">
            <option value="">All Departments</option>
            {EMPLOYEE_DEPARTMENTS.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none">
            {EMPLOYEE_STATUSES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none sm:col-span-2 xl:col-span-1">
            <option value="recent">Newest Added</option>
            <option value="joiningDateAsc">Joining Date: Oldest</option>
            <option value="joiningDateDesc">Joining Date: Newest</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </select>
          <button type="button" onClick={resetFilters} className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:col-span-2 xl:col-span-1">
            Reset Filters
          </button>
        </div>

        <div className="mt-4 sm:mt-6">
          {isLoading ? <Loader /> : error ? <ErrorState message={error} onRetry={loadEmployees} /> : filteredEmployees.length === 0 ? <EmptyState /> : (
            <>
              <EmployeeTable employees={paginatedEmployees.items} onEdit={openEditModal} onDelete={openDeleteModal} />
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-slate-500">
                  Showing {paginatedEmployees.items.length} of {sortedEmployees.length} employees
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
                  {Array.from({ length: paginatedEmployees.totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} className={`h-9 w-9 cursor-pointer rounded-lg border text-sm font-semibold ${page === pageNumber ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-600'}`}>
                      {pageNumber}
                    </button>
                  ))}
                  <button type="button" onClick={() => setPage((current) => Math.min(paginatedEmployees.totalPages, current + 1))} disabled={page === paginatedEmployees.totalPages} className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <EmployeeFormModal
        isOpen={isModalOpen}
        employee={selectedEmployee}
        existingEmails={employees.map((employee) => employee.email.toLowerCase())}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleCreateOrUpdate}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        employee={selectedEmployee}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEmployee(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
