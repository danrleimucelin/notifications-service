import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";

describe('Count recipient notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const countRecipientNotifications = new CountRecipientNotifications(
            notificationRepository
        );

        await notificationRepository.create(
            makeNotification({recipientId: 2}),
        );

        await notificationRepository.create(
            makeNotification({recipientId: 2}),
        );

        await notificationRepository.create(
            makeNotification({recipientId: 3}),
        );

        const { count } = await countRecipientNotifications.execute({
            recipientId: 2
        });

        expect(count).toEqual(2);
    });
});