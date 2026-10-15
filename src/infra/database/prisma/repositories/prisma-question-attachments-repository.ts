import { Injectable } from '@nestjs/common'
import { QuestionAttachmentsRepository } from '../../../../domain/forum/application/repositories/question-attachments-repository.js'
import type { QuestionAttachment } from '../../../../domain/forum/enterprise/entities/question-attachment.js'
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper.js'
import { PrismaService } from '../prisma.service.js'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    })

    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    })
  }
}
