import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteAnswerUseCase } from '../../../domain/forum/application/use-cases/delete-answer.js'
import { CurrentUser } from '../../auth/current-user-decorator.js'
import type { UserPayload } from '../../auth/jwt.strategy.js'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') answerId: string) {
    const userId = user.sub

    const result = await this.deleteAnswer.execute({
      answerId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
