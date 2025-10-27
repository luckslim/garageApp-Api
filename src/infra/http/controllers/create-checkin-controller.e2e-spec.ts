import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { FilesFactory } from 'test/factories/make-files';

describe('Create Checkin (E2E)', () => {
  let app: INestApplication;
  let filesFactory: FilesFactory;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FilesFactory],
    }).compile();
    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    filesFactory = moduleRef.get(FilesFactory);
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
    const accessToken = jwt.sign({ sub: user.id });
    const file1 = await filesFactory.makePrismaFiles({});
    const file2 = await filesFactory.makePrismaFiles({});
    const response = await request(app.getHttpServer())
      .post('/checkin')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        vehicleId: 'rkl-9e96',
        typeVehicle: 'Moto',
        vehiclePhoto: 'photo.png',
        files: [file1.id.toString(), file2.id.toString()],
      });
    expect(response.statusCode).toBe(201);

    const checkInOnDatabase = await prisma.checkIn.findFirst({
      where: {
        vehicleId: 'rkl-9e96',
      },
    });
    
    expect(checkInOnDatabase).toBeTruthy();
    const fileOnDatabase = await prisma.files.findMany({
      where:{
        checkInId: checkInOnDatabase?.id
      }
    })

    expect(fileOnDatabase).toHaveLength(2)
  });
});
