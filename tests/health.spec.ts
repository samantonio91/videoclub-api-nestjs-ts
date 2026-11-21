import 'reflect-metadata';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/app.config.js';
import { HealthService } from '../src/health/health.service.js';

describe('HealthService', () => {
  it('returns an explicit health response', () => {
    expect(new HealthService().getHealth()).toEqual({
      status: 'ok',
      service: 'videoclub-api-nestjs-ts',
    });
  });
});

describe('HTTP health route', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('returns GET /api/health', async () => {
    const response = await request(app.getHttpServer()).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', service: 'videoclub-api-nestjs-ts' });
  });

  it('returns 404 for games, which are not implemented yet', async () => {
    const response = await request(app.getHttpServer()).get('/api/games');
    expect(response.status).toBe(404);
  });
});
