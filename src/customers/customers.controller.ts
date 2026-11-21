import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import type { Customer } from './customer.model.js';
import { CustomersService } from './customers.service.js';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto.js';
import { CustomerQueryDto } from './dto/customer-query.dto.js';
import { PositiveIdPipe } from './positive-id.pipe.js';

@Controller('customers')
export class CustomersController {
  constructor(@Inject(CustomersService) private readonly service: CustomersService) {}

  @Post()
  createCustomer(@Body() data: CreateCustomerDto): Customer {
    return this.service.createCustomer(data);
  }

  @Put(':id')
  updateCustomer(
    @Param('id', PositiveIdPipe) id: number,
    @Body() data: UpdateCustomerDto,
  ): Customer {
    return this.service.updateCustomer(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCustomer(@Param('id', PositiveIdPipe) id: number): void {
    this.service.deleteCustomer(id);
  }

  @Get()
  findCustomers(@Query() filters: CustomerQueryDto): Customer[] {
    return this.service.findCustomers(filters);
  }

  @Get(':id')
  getCustomerById(@Param('id', PositiveIdPipe) id: number): Customer {
    return this.service.getCustomerById(id);
  }
}
