import { UseGuards, UsePipes } from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { z } from 'zod';
import { RegisterClientUseCase } from '@/domain/aplication/use-cases/register-client';
import { CheckOutUseCase } from '@/domain/aplication/use-cases/check-out';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
const checkOutBodySchema = z.object({
  id: z.string(),
  checkOut: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), 'Invalid date'),
});
type CheckOutBodySchema = z.infer<typeof checkOutBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(checkOutBodySchema);

@Controller('/checkout')
@UseGuards(AuthGuard('jwt'))
export class CheckOutController {
  constructor(private checkOutUseCase: CheckOutUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CheckOutBodySchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const { id, checkOut } = body;
    const { sub } = user;
    await this.checkOutUseCase.execute({
      id,
      clientId: sub,
      checkOut,
    });
  }
}
