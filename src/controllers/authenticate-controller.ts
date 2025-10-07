import {
  ConflictException,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipes';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';
const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string(),
});
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;
@Controller('/session')
export class AuthenticateController {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}
  @Post()
  //   @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  @HttpCode(201)
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User Credentials do not match!');
    }
    const isPassowordValid = await compare(password, user.password);
    if (!isPassowordValid) {
      throw new UnauthorizedException('User Credentials do not match!');
    }
    const token = this.jwt.sign({ sub: user.id });
    return{
      access_token: token
    }
  }
}
