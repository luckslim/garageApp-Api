import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { CheckInFactory } from 'test/factories/make-checkIn';
import { ClientFactory } from 'test/factories/make-client';
import { FilesFactory } from 'test/factories/make-files';

describe('Create Checkin (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let clientFactory: ClientFactory;
  let checkInFactory: CheckInFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ClientFactory, CheckInFactory],
    }).compile();
    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    clientFactory = moduleRef.get(ClientFactory);
    checkInFactory = moduleRef.get(CheckInFactory);
    jwt = moduleRef.get(JwtService);
    await app.init();
  });

  test('[POST] /checkin', async () => {
    const user = await clientFactory.makePrismaCheckIn({});
    const accessToken = jwt.sign({sub: user.id.toString()})
    const checkIn = await checkInFactory.makePrismaCheckIn({
      clientId: user.id.toString(),
      typeVehicle: 'Moto'
    });
    const result = await request(app.getHttpServer())
      .post('/checkout')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: checkIn.id.toString(),
        checkOut: new Date().toISOString()
    });
    expect(result.statusCode).toBe(201)
    const checkOutOnDatabase =  await prisma.checkIn.findFirst({
      where:{
        clientId: user.id.toString()
      }
    })
    expect(checkOutOnDatabase).toBeTruthy()
  });
});
