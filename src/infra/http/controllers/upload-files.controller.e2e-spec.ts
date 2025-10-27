import { AppModule } from '@/infra/app.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { makeClient } from 'test/factories/make-client';

describe('Upload File (E2E)', () => {
  let app: INestApplication;

  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    await app.init();
  });

  test('[POST] /upload', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    });
    expect(user).toBeTruthy();
    const accessToken = jwt.sign({ sub: user.id });
    const response = await request(app.getHttpServer())
      .post('/upload')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/google.png');
    expect(response.statusCode).toBe(201);
  });
});
