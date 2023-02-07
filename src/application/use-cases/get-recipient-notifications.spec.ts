import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";

describe('Get recipient notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const getRecipientNotifications = new GetRecipientNotifications(
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

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: 2
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientId: 2}),            
                expect.objectContaining({ recipientId: 2}),            
        ]))
    });
});