import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { z } from 'zod';
import { EditCheckInUseCase } from '@/domain/aplication/use-cases/edit-checkIn';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy';
const editCheckInBodySchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  typeVehicle: z.string(),
  files: z.array(z.string()),
});
type EditCheckInBodySchema = z.infer<typeof editCheckInBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(editCheckInBodySchema);
@Controller('/edit/checkin')
@UseGuards(AuthGuard('jwt'))
export class EditCheckInController {
  constructor(private editCheckInUseCase: EditCheckInUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: EditCheckInBodySchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const { vehicleId, typeVehicle, files, id } = body;
    const result = await this.editCheckInUseCase.execute({
      id,
      clientId: user.sub,
      typeVehicle,
      vehicleId,
      fileId: files,
    });
    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }
  }
}
