import type { AttachmentsRepository } from '../../src/domain/forum/application/repositories/attachments-repository.js'
import type { Attachment } from '../../src/domain/forum/enterprise/entities/attachment.js'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
