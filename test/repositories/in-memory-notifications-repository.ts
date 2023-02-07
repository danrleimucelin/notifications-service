import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { Notification } from "@application/entities/notification";

export class InMemoryNotificationRepository implements NotificationsRepository {
    
    public notifications: Notification[] = [];
    
    async findManyByRecipientId(recipientId: number): Promise<Notification[]> {
        return this.notifications.filter(
          (notification) => notification.recipientId === recipientId  
        );
    }

    async findById(notificationId: number): Promise<Notification | null> {
        const notification = this.notifications.find(
            (item) => item.id === notificationId
        );

        if (!notification) {
            return null;
        }

        return notification;
    }

    async countManyByRecipientId(recipientId: number): Promise<number> {
        return this.notifications.filter(
            (notification) => notification.recipientId === recipientId
        ).length;
    }

    async create(notification: Notification) {
        this.notifications.push(notification);
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(
            (item) => item.id === notification.id,
        );

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification;
        }
    }
}