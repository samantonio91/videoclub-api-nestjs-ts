import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller.js';
import { CUSTOMERS_REPOSITORY, InMemoryCustomersRepository } from './customers.repository.js';
import { CustomersService } from './customers.service.js';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    { provide: CUSTOMERS_REPOSITORY, useClass: InMemoryCustomersRepository },
  ],
})
export class CustomersModule {}
