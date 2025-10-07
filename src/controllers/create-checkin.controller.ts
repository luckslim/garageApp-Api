import { UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user-decorator';
import type { TokenPayloadSchema } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
// const createCheckInBodySchema = z.object({
//     name: z.string(),
//     email: z.email(),
//     password: z.string()
// })
// type CreateCheckInBodySchema = z.infer<typeof createCheckInBodySchema>
@Controller('/checkin')
@UseGuards(AuthGuard('jwt'))
export class CreateCheckInController {
  constructor(private prisma: PrismaService) {}
  @Post()
//   @UsePipes(new ZodValidationPipe(createCheckInBodySchema))
//   @HttpCode(201)
  async handle(@CurrentUser() user: TokenPayloadSchema) {
    console.log(user.sub)
    return 'ok'
  }
}
