import { describe, expect, it } from 'vitest';
import { filterEmployees, paginateEmployees, sortEmployees } from './employeeUtils';

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

  it('sorts employees by recent additions by default', () => {
    const result = sortEmployees({ employees });

    expect(result[0].id).toBe(3);
    expect(result[2].id).toBe(1);
  });

  it('sorts employees by joining date', () => {
    const result = sortEmployees({ employees: [{ id: 1, name: 'Asha', joiningDate: '2024-01-01' }, { id: 2, name: 'Liam', joiningDate: '2022-01-01' }], sortBy: 'joiningDateAsc' });

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(1);
  });

  it('prioritizes recently created employees for the default sort', () => {
    const result = sortEmployees({ employees: [{ id: 1, name: 'Asha', createdAt: '2024-01-01T00:00:00.000Z' }, { id: 2, name: 'Liam', createdAt: '2026-01-01T00:00:00.000Z' }] });

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(1);
  });

  it('paginates employees into page-sized chunks', () => {
    const result = paginateEmployees({ employees, page: 2, pageSize: 2 });

    expect(result.items).toHaveLength(1);
    expect(result.totalPages).toBe(2);
  });
});
