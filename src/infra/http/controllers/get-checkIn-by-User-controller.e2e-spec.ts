import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CheckInFactory } from 'test/factories/make-checkIn';
import { ClientFactory } from 'test/factories/make-client';

describe('Fetch Checkins by user', () => {
  let app: INestApplication;
  let checkInFactory: CheckInFactory;
  let clientFactory: ClientFactory;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CheckInFactory, ClientFactory],
    }).compile();
    app = moduleRef.createNestApplication();
    checkInFactory = moduleRef.get(CheckInFactory);
    clientFactory = moduleRef.get(ClientFactory);
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /get/:page/checkins', async () => {
    const user = await clientFactory.makePrismaCheckIn({});
    const accessToken = jwt.sign({ sub: user.id.toString() });
    const checkIn = await checkInFactory.makePrismaCheckIn({
      clientId: user.id.toString(),
      typeVehicle: 'Moto',
      vehicleId: 'rkl-0000',
    });
    const checkIn2 = await checkInFactory.makePrismaCheckIn({
      clientId: user.id.toString(),
      typeVehicle: 'Moto',
      vehicleId: 'rkl-8902',
    });
    const checkInOnDatabase = await prisma.checkIn.findMany({
      where: {
        clientId: user.id.toString(),
      },
    });
    expect(checkInOnDatabase).toBeTruthy();
    const page = 1;
    const result = await request(app.getHttpServer())
      .get(`/get/${page}/checkins`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();
    expect(result.statusCode).toBe(200);
    expect(result.body.checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: { value: checkIn.id.toString() },
        }),
      ]),
    );
  });
    test('[GET] /get/:page/checkins', async () => {
    const user = await clientFactory.makePrismaCheckIn({});
    const accessToken = jwt.sign({ sub: user.id.toString() });
    const checkIn = await checkInFactory.makePrismaCheckIn({
      clientId: user.id.toString(),
      typeVehicle: 'Moto',
      vehicleId: 'rkl-0000',
    });
    const checkIn2 = await checkInFactory.makePrismaCheckIn({
      clientId: user.id.toString(),
      typeVehicle: 'Moto',
      vehicleId: 'rkl-8902',
    });
    const checkInOnDatabase = await prisma.checkIn.findMany({
      where: {
        clientId: user.id.toString(),
      },
    });
    expect(checkInOnDatabase).toBeTruthy();
    const page = 2;
    const result = await request(app.getHttpServer())
      .get(`/get/${page}/checkins`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();
    expect(result.statusCode).toBe(200);
    expect(result.body.checkIns).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: { value: checkIn.id.toString() },
        }),
      ]),
    );
  });
});
