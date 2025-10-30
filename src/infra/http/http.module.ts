import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account-controller';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateCheckInController } from './controllers/create-checkin-controller';
import { DatabaseModule } from '@/infra/database/database.module';
import { RegisterClientUseCase } from '@/domain/aplication/use-cases/register-client';
import { CheckInClientUseCase } from '@/domain/aplication/use-cases/check-in';
import { AuthenticateClientUseCase } from '@/domain/aplication/use-cases/authenticate-client';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DeleteClientUseCase } from '@/domain/aplication/use-cases/delete-client';
import { DeleteAccountController } from './controllers/delete-account-controller';
import { EditClientUseCase } from '@/domain/aplication/use-cases/edit-client';
import { EditAccountController } from './controllers/edit-account-controller';
import { DeleteCheckInController } from './controllers/delete-checkin-controller';
import { DeleteCheckInClientUseCase } from '@/domain/aplication/use-cases/delete-check-in';
import { UploadFileController } from './controllers/upload-files.controller';
import { StorageModule } from '../storage/storage.module';
import { UploadAndCreateUseCase } from '@/domain/aplication/use-cases/upload-and-create-files';
import { EditCheckInController } from './controllers/edit-checkIn-controller';
import { EditCheckInUseCase } from '@/domain/aplication/use-cases/edit-checkIn';
import { GetcheckInByUserController } from './controllers/get-checkIn-by-User-controller';
import { GetCheckInByUserUseCase } from '@/domain/aplication/use-cases/get-checkIn-by-user';
import { CheckOutController } from './controllers/check-out-controller';
import { CheckOutUseCase } from '@/domain/aplication/use-cases/check-out';

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    UploadFileController,
    CreateAccountController,
    AuthenticateController,
    CreateCheckInController,
    DeleteAccountController,
    EditAccountController,
    DeleteCheckInController,
    EditCheckInController,
    GetcheckInByUserController,
    CheckOutController
  ],
  providers: [
    RegisterClientUseCase,
    CheckInClientUseCase,
    AuthenticateClientUseCase,
    DeleteClientUseCase,
    EditClientUseCase,
    DeleteCheckInClientUseCase,
    UploadAndCreateUseCase,
    EditCheckInUseCase,
    GetCheckInByUserUseCase,
    CheckOutUseCase
  ],
})
export class HttpModule {}
