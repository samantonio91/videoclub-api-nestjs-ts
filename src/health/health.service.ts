import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth(): { status: 'ok'; service: string } {
    return { status: 'ok', service: 'videoclub-api-nestjs-ts' };
  }
}
