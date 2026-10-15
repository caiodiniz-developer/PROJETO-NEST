import type { Notification } from '../../enterprise/entities/notification.js'

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>
  abstract findById(id: string): Promise<Notification | null>
  abstract save(notification: Notification): Promise<void>
}
