import { ConflictException, UsePipes } from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { PrismaService } from '@/database/prisma/prisma.service';
import { z } from 'zod';
import { RegisterClientUseCase } from '@/domain/aplication/use-cases/register-client';
const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: RegisterClientUseCase) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;
    await this.createAccount.execute({
      name,
      email,
      password
    })
    // const userWithSameEmail = await this.prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    // });
    // if (userWithSameEmail) {
    //   throw new ConflictException(
    //     'user with same email address already exists',
    //   );
    // }
    // const hashedPassord = await hash(password, 8);
    // await this.prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassord,
    //   },
    // });
  }
}
