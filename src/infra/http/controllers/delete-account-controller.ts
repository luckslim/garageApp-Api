import { ConflictException, UnauthorizedException, UsePipes } from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { PrismaService } from '@/database/prisma/prisma.service';
import { z } from 'zod';
import { RegisterClientUseCase } from '@/domain/aplication/use-cases/register-client';
import { DeleteClientUseCase } from '@/domain/aplication/use-cases/delete-client';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy';
const deleteAccountBodySchema = z.object({
  clientId: z.string(),
  email: z.email(),
});
type DeleteAccountBodySchema = z.infer<typeof deleteAccountBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(deleteAccountBodySchema);
@Controller('/delete/accounts')
export class DeleteAccountController {
  constructor(private deleteAccount: DeleteClientUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: DeleteAccountBodySchema,
  ) {
    const { clientId, email } = body;
    await this.deleteAccount.execute({
      clientId,
      email,
    });
  }
}
