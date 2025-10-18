import { AppModule } from '@/infra/app.module';

import { PrismaService } from '@/database/prisma/prisma.service';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';

describe('Delete Account (E2E)', () => {
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

  test('[POST] /checkin', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    });

    const checkIn = await prisma.checkIn.create({
      data: {
        vehicleId: 'rkl-9e96',
        typeVehicle: 'Moto',
        photoVehicle:'foto.png',
        clientId: user.id,
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .post('/delete/checkin')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ id: checkIn.id });

    expect(response.statusCode).toBe(201);

    const checkInOnDatabase = await prisma.checkIn.findUnique({
      where: { id: checkIn.id },
    });

    expect(checkInOnDatabase).toBeNull();
  });
});
