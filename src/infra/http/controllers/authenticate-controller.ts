import {
  ConflictException,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { z } from 'zod';
import { AuthenticateClientUseCase } from '@/domain/aplication/use-cases/authenticate-client';
const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string(),
});
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;
@Controller('/session')
export class AuthenticateController {
  constructor(private authenticateClient: AuthenticateClientUseCase) {}
  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  @HttpCode(201)
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;
    const result = await this.authenticateClient.execute({
      email,
      password,
    });
    if (result.isLeft()) {
      throw new Error();
    }
    const { accessToken } = result.value;
    return {
      access_token: accessToken,
    };
  }
}
