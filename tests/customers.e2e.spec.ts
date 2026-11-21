import 'reflect-metadata';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/app.config.js';

describe('Customers HTTP API', () => {
  let app: INestApplication;

  const customer = {
    name: 'Ana Garcia',
    documentId: 'ABC-123',
    phone: '5551234',
    email: 'ana@example.com',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
  });

  it('POST /api/customers creates a customer (201)', async () => {
    const response = await request(app.getHttpServer()).post('/api/customers').send(customer);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, ...customer });
  });

  it('GET /api/customers starts empty', async () => {
    const response = await request(app.getHttpServer()).get('/api/customers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('GET /api/customers/:id finds a customer', async () => {
    await request(app.getHttpServer()).post('/api/customers').send(customer);
    const response = await request(app.getHttpServer()).get('/api/customers/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, ...customer });
  });

  it('PUT /api/customers/:id replaces customer data', async () => {
    await request(app.getHttpServer()).post('/api/customers').send(customer);
    const response = await request(app.getHttpServer())
      .put('/api/customers/1').send({ name: 'Ana Lopez' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Ana Lopez' });
  });

  it('DELETE /api/customers/:id responds 204 and removes the customer', async () => {
    await request(app.getHttpServer()).post('/api/customers').send(customer);
    const response = await request(app.getHttpServer()).delete('/api/customers/1');
    expect(response.status).toBe(204);
    expect(response.text).toBe('');
    expect((await request(app.getHttpServer()).get('/api/customers/1')).status).toBe(404);
  });

  it('GET /api/customers filters by documentId and name', async () => {
    await request(app.getHttpServer()).post('/api/customers').send(customer);
    await request(app.getHttpServer()).post('/api/customers')
      .send({ name: 'Bruno', documentId: 'XYZ-999' });
    const response = await request(app.getHttpServer())
      .get('/api/customers?name=ana&documentId=abc');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('Ana Garcia');
  });

  it('returns 400 when required or optional fields are invalid', async () => {
    const missing = await request(app.getHttpServer()).post('/api/customers').send({});
    expect(missing.status).toBe(400);
    const email = await request(app.getHttpServer()).post('/api/customers')
      .send({ name: 'Ana', email: 'invalid-email' });
    expect(email.status).toBe(400);
    const extra = await request(app.getHttpServer()).post('/api/customers')
      .send({ name: 'Ana', admin: true });
    expect(extra.status).toBe(400);
  });

  it('trims fields before persisting', async () => {
    const response = await request(app.getHttpServer()).post('/api/customers')
      .send({ name: '  Ana  ', documentId: '  ABC-123  ' });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Ana');
    expect(response.body.documentId).toBe('ABC-123');
  });

  it('rejects invalid and unsafe customer IDs with 400', async () => {
    for (const id of ['abc', '0', '-1', '1.2', '9007199254740993']) {
      const response = await request(app.getHttpServer()).get('/api/customers/' + id);
      expect(response.status).toBe(400);
    }
  });

  it('returns 404 for nonexistent customers', async () => {
    expect((await request(app.getHttpServer()).get('/api/customers/99')).status).toBe(404);
    expect((await request(app.getHttpServer()).put('/api/customers/99')
      .send({ name: 'Unknown' })).status).toBe(404);
    expect((await request(app.getHttpServer()).delete('/api/customers/99')).status).toBe(404);
  });

  it('validates listing filters with 400', async () => {
    const unknown = await request(app.getHttpServer()).get('/api/customers?unexpected=yes');
    expect(unknown.status).toBe(400);
  });

  it('does not share repository state between application instances', async () => {
    await request(app.getHttpServer()).post('/api/customers').send(customer);
    const secondModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const secondApp = secondModule.createNestApplication();
    configureApp(secondApp);
    try {
      await secondApp.init();
      const response = await request(secondApp.getHttpServer()).get('/api/customers');
      expect(response.body).toEqual([]);
    } finally {
      await secondApp.close();
    }
  });
});
