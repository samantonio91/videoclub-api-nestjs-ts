import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { CustomersService } from '../src/customers/customers.service.js';
import { InMemoryCustomersRepository } from '../src/customers/customers.repository.js';

describe('CustomersService', () => {
  function setup() {
    const repository = new InMemoryCustomersRepository();
    const service = new CustomersService(repository);
    return { repository, service };
  }

  it('creates and retrieves a customer', () => {
    const { service } = setup();
    const customer = service.createCustomer({ name: 'Ana', documentId: 'ABC-123' });
    expect(customer).toEqual({ id: 1, name: 'Ana', documentId: 'ABC-123' });
    expect(service.getCustomerById(1)).toEqual(customer);
  });

  it('updates customer fields using full replacement', () => {
    const { service } = setup();
    service.createCustomer({ name: 'Ana', phone: '555-111' });
    expect(service.updateCustomer(1, { name: 'Ana Lopez' })).toEqual({
      id: 1, name: 'Ana Lopez',
    });
  });

  it('filters by name and document ID without case sensitivity', () => {
    const { service } = setup();
    service.createCustomer({ name: 'Ana Garcia', documentId: 'ABC-123' });
    service.createCustomer({ name: 'Bruno', documentId: 'XYZ-999' });
    expect(service.findCustomers({ name: 'ana', documentId: 'abc' })).toHaveLength(1);
    expect(service.findCustomers({})).toHaveLength(2);
  });

  it('deletes customers and returns 404 for missing records', () => {
    const { service } = setup();
    service.createCustomer({ name: 'Ana' });
    service.deleteCustomer(1);
    expect(() => service.getCustomerById(1)).toThrow(NotFoundException);
    expect(() => service.deleteCustomer(1)).toThrow(NotFoundException);
    expect(() => service.updateCustomer(1, { name: 'Bruno' })).toThrow(NotFoundException);
  });

  it('does not expose the stored record to external mutations', () => {
    const { service } = setup();
    const created = service.createCustomer({ name: 'Ana' });
    created.name = 'Modified from outside';
    expect(service.getCustomerById(1).name).toBe('Ana');
  });
});
