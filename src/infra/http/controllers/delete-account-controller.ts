import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { z } from 'zod';
import { DeleteClientUseCase } from '@/domain/aplication/use-cases/delete-client';
const deleteAccountBodySchema = z.object({
  id: z.string()
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
    const { id } = body;
    await this.deleteAccount.execute({
      id
    });
  }
}
