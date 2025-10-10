import { ZodValidationPipe } from '@/pipes/zod-validation-pipes';
import {
  Body,
  HttpCode,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user-decorator';
import type { TokenPayloadSchema } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import z from 'zod';
const createCheckInBodySchema = z.object({
  vehicleId: z.string(),
});
type CreateCheckInBodySchema = z.infer<typeof createCheckInBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(createCheckInBodySchema)
@Controller('/checkin')
@UseGuards(AuthGuard('jwt'))
export class CreateCheckInController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateCheckInBodySchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    if (!user) {
      throw new UnauthorizedException("Unauthorized");
    }
    const {vehicleId} = body
    const checkin = await this.prisma.checkIn.create({
      data: {
        vehicleId,
        clientId: user.sub,
      },
    });
    return checkin;
  }
}
