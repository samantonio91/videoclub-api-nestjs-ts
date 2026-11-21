import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module.js';
import { CustomersModule } from './customers/customers.module.js';

@Module({
  imports: [HealthModule, CustomersModule],
})
export class AppModule {}
