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

  test('[POST] /edit/accounts', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    });
    const response = await request(app.getHttpServer())
      .post('/edit/accounts')
      .send({
        id : user.id,
        email:"teste@example.com",
        name:"teste de nome",
        password:"123123"        
    });
    console.log(response.body)
    const newUser = await prisma.user.findUnique({
        where:{
            id: user.id
        }
    })
    console.log(newUser)
    //expect(newUser?.email).toBe("teste@example.com")
    expect(response.statusCode).toBe(201);
  });
});
