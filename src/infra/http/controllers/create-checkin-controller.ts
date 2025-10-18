import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import {
  Body,
  HttpCode,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import type { TokenPayloadSchema } from '@/infra/auth/jwt.strategy';
import z from 'zod';
import { CheckInClientUseCase } from '@/domain/aplication/use-cases/check-in';
const createCheckInBodySchema = z.object({
  vehicleId: z.string(),
  typeVehicle: z.string(),
  vehiclePhoto: z.string(),
});
type CreateCheckInBodySchema = z.infer<typeof createCheckInBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(createCheckInBodySchema);
@Controller('/checkin')
@UseGuards(AuthGuard('jwt'))
export class CreateCheckInController {
  constructor(private checkInClientUsecase: CheckInClientUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateCheckInBodySchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const clientId = user.sub;
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    const { vehicleId, typeVehicle, vehiclePhoto } = body;
    await this.checkInClientUsecase.execute({
      clientId,
      vehicleId,
      typeVehicle,
      vehiclePhoto,
    });
  }
}
