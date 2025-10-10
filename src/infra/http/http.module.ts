import { Module } from '@nestjs/common';
import { FetchCheckInByUserController } from './controllers/fetch-checkin-controller';
import { CreateAccountController } from './controllers/create-account-controller';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateCheckInController } from './controllers/create-checkin-controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [
    FetchCheckInByUserController,
    CreateAccountController,
    AuthenticateController,
    CreateCheckInController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
