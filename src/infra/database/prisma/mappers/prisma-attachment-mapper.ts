import type { Attachment } from '../../../../domain/forum/enterprise/entities/attachment.js'
import type { Prisma } from '../../../../generated/prisma/client.js'

export class PrismaAttachmentMapper {
  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
