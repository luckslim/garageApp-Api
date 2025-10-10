import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '@/infra/prisma/prisma.service';
import z from 'zod';
const pageQueryParamSchema = z.object({
  pageParam: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
});
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
@Controller('/checkins')
@UseGuards(AuthGuard('jwt'))
export class FetchCheckInByUserController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async handle(@Query(queryValidationPipe) page: PageQueryParamSchema) {
    const { pageParam } = page;
    const perPage = 2;
    const checkIns = await this.prisma.checkIn.findMany({
      take: perPage,
      skip: (pageParam - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { checkIns };
  }
}
