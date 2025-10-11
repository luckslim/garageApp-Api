import { Module } from '@nestjs/common';
import { FetchCheckInByUserController } from './controllers/fetch-checkin-controller';
import { CreateAccountController } from './controllers/create-account-controller';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateCheckInController } from './controllers/create-checkin-controller';
import { DatabaseModule } from '@/database/database.module';
import { RegisterClientUseCase } from '@/domain/aplication/use-cases/register-client';

@Module({
  imports: [DatabaseModule],
  controllers: [
    FetchCheckInByUserController,
    CreateAccountController,
    AuthenticateController,
    CreateCheckInController,
  ],
  providers:[RegisterClientUseCase]
})
export class HttpModule {}
