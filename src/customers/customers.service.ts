import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Customer, CustomerData, CustomerFilters } from './customer.model.js';
import { CUSTOMERS_REPOSITORY } from './customers.repository.js';
import type { CustomersRepository } from './customers.repository.js';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY) private readonly repository: CustomersRepository,
  ) {}

  createCustomer(data: CustomerData): Customer {
    return this.repository.create(data);
  }

  updateCustomer(id: number, data: CustomerData): Customer {
    const customer = this.repository.update(id, data);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  deleteCustomer(id: number): void {
    if (!this.repository.delete(id)) throw new NotFoundException('Customer not found');
  }

  findCustomers(filters: CustomerFilters = {}): Customer[] {
    return this.repository.findAll(filters);
  }

  getCustomerById(id: number): Customer {
    const customer = this.repository.findById(id);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }
}
