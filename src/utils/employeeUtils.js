export const EMPLOYEE_DEPARTMENTS = ['Engineering', 'HR', 'Finance', 'Sales', 'Marketing', 'Support', 'Operations', 'IT'];

export const EMPLOYEE_STATUSES = ['All', 'Active', 'Inactive'];

export const formatDate = (value) => {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

export const sortEmployees = ({ employees, sortBy = 'recent' }) => {
  const sortedEmployees = [...employees];

  switch (sortBy) {
    case 'joiningDateAsc':
      sortedEmployees.sort((left, right) => new Date(left.joiningDate) - new Date(right.joiningDate));
      break;
    case 'joiningDateDesc':
      sortedEmployees.sort((left, right) => new Date(right.joiningDate) - new Date(left.joiningDate));
      break;
    case 'nameAsc':
      sortedEmployees.sort((left, right) => left.name.localeCompare(right.name));
      break;
    case 'nameDesc':
      sortedEmployees.sort((left, right) => right.name.localeCompare(left.name));
      break;
    case 'recent':
    default:
      sortedEmployees.sort((left, right) => {
        const leftTimestamp = left.createdAt ? new Date(left.createdAt).getTime() : 0;
        const rightTimestamp = right.createdAt ? new Date(right.createdAt).getTime() : 0;

        if (leftTimestamp !== rightTimestamp) {
          return rightTimestamp - leftTimestamp;
        }

        return Number(right.id) - Number(left.id);
      });
      break;
  }

  return sortedEmployees;
};

export const filterEmployees = ({ employees, query, department, status }) => {
  const normalizedQuery = query.trim().toLowerCase();

  return employees.filter((employee) => {
    const matchesQuery =
      !normalizedQuery ||
      employee.name.toLowerCase().includes(normalizedQuery) ||
      employee.email.toLowerCase().includes(normalizedQuery);

    const matchesDepartment = !department || employee.department === department;
    const matchesStatus = status === 'All' || employee.status === status;

    return matchesQuery && matchesDepartment && matchesStatus;
  });
};

export const paginateEmployees = ({ employees, page, pageSize }) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: employees.slice(startIndex, endIndex),
    totalPages: Math.max(1, Math.ceil(employees.length / pageSize)),
  };
};
