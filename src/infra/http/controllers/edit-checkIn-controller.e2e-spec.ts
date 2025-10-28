import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Test } from '@nestjs/testing';

import request from 'supertest';
import { CheckInFactory } from 'test/factories/make-checkIn';
import { CheckInFilesFactory } from 'test/factories/make-checkIn-files';
import { FilesFactory } from 'test/factories/make-files';

describe('Edit Checkin (E2E)', () => {
  let app: INestApplication;
  let filesFactory: FilesFactory;
  let checkInFactory: CheckInFactory;
  let checkInFilesFactory: CheckInFilesFactory;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FilesFactory, CheckInFilesFactory, CheckInFactory],
    }).compile();
    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    filesFactory = moduleRef.get(FilesFactory);
    checkInFilesFactory = moduleRef.get(CheckInFilesFactory);
    checkInFactory = moduleRef.get(CheckInFactory);
    await app.init();
  });

  test('[POST] /edit/checkin', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',

        email: 'johndoe@example.com',

        password: '123456',
      },
    });
    const accessToken = jwt.sign({ sub: user.id });

    //criar checkIn
    const checkIn1 = await checkInFactory.makePrismaCheckIn({
      clientId: user.id,
      typeVehicle: 'Moto',
    });

    //criar arquivo
    const file1 = await filesFactory.makePrismaFiles({
      fileName: 'filePrimary',
    });
    const file2 = await filesFactory.makePrismaFiles({
      fileName: 'fileSecondary',
    });
    const fileNew = await filesFactory.makePrismaFiles({});

    //criar checkInFile Pivô vinculando ao arquivo
    
    const checkInFilePrimary = await checkInFilesFactory.makePrismaCheckInFiles(
      {
        checkInId: checkIn1.id,
        fileId: file1.id,
      },
    );

    //criar checkInFile Pivô vinculando ao arquivo
    const checkInFileSecondary =
      await checkInFilesFactory.makePrismaCheckInFiles({
        checkInId: checkIn1.id,
        fileId: file2.id,
      });

    //criar checkInFile Pivô vinculando ao arquivo
    const checkInNew = await checkInFilesFactory.makePrismaCheckInFiles({
      checkInId: checkIn1.id,
      fileId: fileNew.id,
    });

    const data = await prisma.files.findMany({
      where: {
        checkInId: checkIn1.id.toString(),
      },
      orderBy: {
        id: 'desc',
      },
    });

    const response = await request(app.getHttpServer())
      .post('/edit/checkin')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: checkIn1.id.toString(),
        vehicleId: 'rkl-3e96',
        typeVehicle: 'Car',
        files: [file1.id.toString(), fileNew.id.toString()],
      });
    expect(response.statusCode).toBe(201);

    const checkInOnDatabase = await prisma.checkIn.findFirst({
      where: {
        vehicleId: 'rkl-3e96',
      },
    });

    expect(checkInOnDatabase).toBeTruthy();

    const fileOnDatabase = await prisma.files.findMany({
      where: {
        checkInId: checkInOnDatabase?.id,
      },
    });

    expect(fileOnDatabase).toHaveLength(2);
    expect(fileOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: file1.id.toString(),
        }),
        expect.objectContaining({
          id: fileNew.id.toString(),
        }),
      ]),
    );
  });
});
