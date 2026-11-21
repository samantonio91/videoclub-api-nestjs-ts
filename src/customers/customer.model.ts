/**
 * Shape returned by the Customers API.
 * Deliberately free of persistence decorators while the repository is in memory.
 */
export interface Customer {
  id: number;
  name: string;
  documentId?: string;
  phone?: string;
  email?: string;
}

export type CustomerData = Omit<Customer, 'id'>;
export type CustomerFilters = Partial<Pick<Customer, 'name' | 'documentId'>>;
