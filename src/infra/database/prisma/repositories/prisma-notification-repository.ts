import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prisma: PrismaService) {}

    async findById(notificationId: number): Promise<Notification | null> {
        
        const parsedValue: number = parseInt(''+notificationId); //It's because Prisma rules.
        
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: parsedValue
            }
        });

        if (!notification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification);
    }

    async findManyByRecipientId(recipientId: number): Promise<Notification[]> {
        
        const parsedValue: number = parseInt(''+recipientId); //It's because Prisma rules.

        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId: parsedValue,
            }
        });

        /* return notifications.map((notification) => {
            return PrismaNotificationMapper.toDomain(notification);
        }); */   
        
        return notifications.map(PrismaNotificationMapper.toDomain);
    }

    async countManyByRecipientId(recipientId: number): Promise<number> {
        
        const parsedValue: number = parseInt(''+recipientId); //It's because Prisma rules.
        
        const count = await this.prisma.notification.count({
            where: {
                recipientId: parsedValue,
            }
        });

        return count;
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.create({
            data: raw,
        });
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        });
    }
}