import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';
import { GetCheckInByUserUseCase } from '@/domain/aplication/use-cases/get-checkIn-by-user';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy';
const pageQueryParamSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
});

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
const QueryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller('/get/:page/checkins')
@UseGuards(AuthGuard('jwt'))
export class GetcheckInByUserController {
  constructor(private getcheckInByUserUseCase: GetCheckInByUserUseCase) {}
  @Get()
  @HttpCode(200)
  async handle(
    @Param(QueryValidationPipe) {page}: PageQueryParamSchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const {sub} = user;
    const result = await this.getcheckInByUserUseCase.execute({
      clientId: sub,
      page,
    });
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    const checkIns = result.value.checkIn;
    return {
      checkIns,
    };
  }
}
