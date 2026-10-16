import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { PrismaQuestionCommentMapper } from '../../src/infra/database/prisma/mappers/prisma-question-comment-mapper.js'
import { PrismaService } from '../../src/infra/database/prisma/prisma.service.js'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  QuestionComment,
  type QuestionCommentProps,
} from '../../src/domain/forum/enterprise/entities/question-comment.js'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionComment(data: Partial<QuestionCommentProps> = {}): Promise<QuestionComment> {
    const questionComment = makeQuestionComment(data)

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questionComment),
    })

    return questionComment
  }
}
