import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { QuestionAttachment } from '../../../../domain/forum/enterprise/entities/question-attachment.js'
import type { Attachment as PrismaAttachment } from '../../../../generated/prisma/client.js'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type.')
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
