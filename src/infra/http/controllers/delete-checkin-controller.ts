import { Body, Controller, HttpCode, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { z } from 'zod';
import { DeleteCheckInClientUseCase } from '@/domain/aplication/use-cases/delete-check-in';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { retry } from 'rxjs';
const deleteCheckInBodySchema = z.object({
  id: z.string(),
});
type DeleteCheckInBodySchema = z.infer<typeof deleteCheckInBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(deleteCheckInBodySchema);
@Controller('/delete/checkin')
@UseGuards(AuthGuard('jwt'))
export class DeleteCheckInController {
  constructor(private deleteCheckIn: DeleteCheckInClientUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: DeleteCheckInBodySchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    const { id } = body;
    await this.deleteCheckIn.execute({
      id,
      clientId: user.sub,
    });
    return "Deletado com Sucesso"
  }
}
