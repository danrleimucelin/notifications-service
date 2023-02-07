import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface CountRecipientNotificationsRequest {
    recipientId: number;
}

interface CountRecipientNotificationsResponse {
    count: number;
};

@Injectable()
export class CountRecipientNotifications {

    constructor(private notificationRepository: NotificationsRepository){}

    async execute(
        request: CountRecipientNotificationsRequest,
    ): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = request;

        const count = await this.notificationRepository.countManyByRecipientId(recipientId);

        return {
            count,
        }
    }
}
