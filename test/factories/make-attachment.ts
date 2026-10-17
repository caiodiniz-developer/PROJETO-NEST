import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import type { UniqueEntityId } from '../../src/core/entities/unique-entity-id.js'
import {
  Attachment,
  type AttachmentProps,
} from '../../src/domain/forum/enterprise/entities/attachment.js'
import { PrismaAttachmentMapper } from '../../src/infra/database/prisma/mappers/prisma-attachment-mapper.js'
import { PrismaService } from '../../src/infra/database/prisma/prisma.service.js'

export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return attachment
}

@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(
    data: Partial<AttachmentProps> = {},
  ): Promise<Attachment> {
    const attachment = makeAttachment(data)

    await this.prisma.attachment.create({
      data: PrismaAttachmentMapper.toPrisma(attachment),
    })

    return attachment
  }
}
