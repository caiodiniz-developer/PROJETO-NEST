import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js'
import { PrismaService } from '../prisma/prisma.service.js'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { questions }
  }
}
