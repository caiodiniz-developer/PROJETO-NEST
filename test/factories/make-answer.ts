import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { PrismaAnswerMapper } from '../../src/infra/database/prisma/mappers/prisma-answer-mapper.js'
import { PrismaService } from '../../src/infra/database/prisma/prisma.service.js'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  Answer,
  type AnswerProps,
} from '../../src/domain/forum/enterprise/entities/answer.js'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })

    return answer
  }
}
