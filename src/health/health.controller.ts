import { Controller, Get, Inject } from '@nestjs/common';
import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(@Inject(HealthService) private readonly service: HealthService) {}

  @Get()
  getHealth(): { status: 'ok'; service: string } {
    return this.service.getHealth();
  }
}
