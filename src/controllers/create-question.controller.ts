import { Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '../auth/current-user-decorator.js'
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js'
import type { UserPayload } from '../auth/jwt.strategy.js'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor() {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    return user.sub
  }
}
