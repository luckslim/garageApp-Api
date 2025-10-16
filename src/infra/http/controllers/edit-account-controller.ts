import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { z } from 'zod';
import { EditClientUseCase } from '@/domain/aplication/use-cases/edit-client';
const editAccountBodySchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  password: z.string(),
});
type EditAccountBodySchema = z.infer<typeof editAccountBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema);
@Controller('/edit/accounts')
export class EditAccountController {
  constructor(private editClientUseCase: EditClientUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: EditAccountBodySchema) {
    const { id, email, name, password } = body;
    const result = await this.editClientUseCase.execute({
      id,
      email,
      name,
      password,
    });
    if(result.isLeft()){
      const error  = result.value
      throw new BadRequestException(error.message)
    }
  }
}
