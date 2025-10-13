import { Module } from '@nestjs/common';
import { FetchCheckInByUserController } from './controllers/fetch-checkin-controller';
import { CreateAccountController } from './controllers/create-account-controller';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateCheckInController } from './controllers/create-checkin-controller';
import { DatabaseModule } from '@/database/database.module';
import { RegisterClientUseCase } from '@/domain/aplication/use-cases/register-client';
import { CheckInClientUseCase } from '@/domain/aplication/use-cases/check-in';
import { AuthenticateClientUseCase } from '@/domain/aplication/use-cases/authenticate-client';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    FetchCheckInByUserController,
    CreateAccountController,
    AuthenticateController,
    CreateCheckInController,
  ],
  providers: [
    RegisterClientUseCase,
    CheckInClientUseCase,
    AuthenticateClientUseCase,
  ],
})
export class HttpModule {}
