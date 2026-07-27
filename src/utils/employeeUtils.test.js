import { describe, expect, it } from 'vitest';
import { filterEmployees, paginateEmployees } from './employeeUtils';

describe('employeeUtils', () => {
  const employees = [
    { id: 1, name: 'Asha Patel', email: 'asha@company.com', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Liam Chen', email: 'liam@company.com', department: 'HR', status: 'Inactive' },
    { id: 3, name: 'Nina Gomez', email: 'nina@company.com', department: 'Sales', status: 'Active' },
  ];

  it('filters employees by query, department, and status', () => {
    const result = filterEmployees({ employees, query: 'li', department: 'HR', status: 'All' });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Liam Chen');
  });

  it('paginates employees into page-sized chunks', () => {
    const result = paginateEmployees({ employees, page: 2, pageSize: 2 });

    expect(result.items).toHaveLength(1);
    expect(result.totalPages).toBe(2);
  });
});
