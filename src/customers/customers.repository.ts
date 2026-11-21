import { Injectable } from '@nestjs/common';
import type { Customer, CustomerData, CustomerFilters } from './customer.model.js';

/** Injection token lets a database repository replace the in-memory adapter later. */
export const CUSTOMERS_REPOSITORY = Symbol('CUSTOMERS_REPOSITORY');

export interface CustomersRepository {
  create(data: CustomerData): Customer;
  update(id: number, data: CustomerData): Customer | undefined;
  delete(id: number): boolean;
  findById(id: number): Customer | undefined;
  findAll(filters: CustomerFilters): Customer[];
}

@Injectable()
export class InMemoryCustomersRepository implements CustomersRepository {
  private readonly customers = new Map<number, Customer>();
  private nextId = 1;

  create(data: CustomerData): Customer {
    const customer: Customer = { id: this.nextId++, ...data };
    this.customers.set(customer.id, customer);
    return { ...customer };
  }

  update(id: number, data: CustomerData): Customer | undefined {
    if (!this.customers.has(id)) return undefined;
    const customer: Customer = { id, ...data };
    this.customers.set(id, customer);
    return { ...customer };
  }

  delete(id: number): boolean {
    return this.customers.delete(id);
  }

  findById(id: number): Customer | undefined {
    const customer = this.customers.get(id);
    return customer ? { ...customer } : undefined;
  }

  findAll(filters: CustomerFilters): Customer[] {
    const matches = (value: string | undefined, filter: string | undefined) =>
      !filter || (value ?? '').toLocaleLowerCase().includes(filter.toLocaleLowerCase());

    return [...this.customers.values()]
      .filter(customer =>
        matches(customer.name, filters.name) && matches(customer.documentId, filters.documentId))
      .map(customer => ({ ...customer }));
  }
}
