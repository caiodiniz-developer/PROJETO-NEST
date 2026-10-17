import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { QuestionDetails } from '../../../../domain/forum/enterprise/entities/value-objects/question-details.js'
import { Slug } from '../../../../domain/forum/enterprise/entities/value-objects/slug.js'
import type {
  Attachment as PrismaAttachment,
  Question as PrismaQuestion,
  User as PrismaUser,
} from '../../../../generated/prisma/client.js'
import { PrismaAttachmentMapper } from './prisma-attachment-mapper.js'

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser
  attachments: PrismaAttachment[]
}

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
    return QuestionDetails.create({
      questionId: new UniqueEntityId(raw.id),
      authorId: new UniqueEntityId(raw.authorId),
      author: raw.author.name,
      title: raw.title,
      slug: Slug.create(raw.slug),
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityId(raw.bestAnswerId)
        : null,
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
