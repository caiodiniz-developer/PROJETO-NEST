import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { PrismaAnswerCommentMapper } from '../../src/infra/database/prisma/mappers/prisma-answer-comment-mapper.js'
import { PrismaService } from '../../src/infra/database/prisma/prisma.service.js'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  AnswerComment,
  type AnswerCommentProps,
} from '../../src/domain/forum/enterprise/entities/answer-comment.js'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerComment(data: Partial<AnswerCommentProps> = {}): Promise<AnswerComment> {
    const answerComment = makeAnswerComment(data)

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answerComment),
    })

    return answerComment
  }
}
