import { Replace } from "src/helpers/Replace";
import { Content } from "./content";

export interface NotificationProps {
    recipientId: number;
    content: Content;
    category: string;
    readAt?: Date | null;
    canceledAt?: Date | null;
    createdAt: Date;
}

export class Notification {
    private _id?: number | null;
    private props: NotificationProps;

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: number) {
        //using auto-increment by DB
        this._id = id ?? null;
        
        //using universal ID by aplication and then save/create in DB
        //this._id = id ?? ramdomUUID();
        
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }
    }

    public get id(): number | null | undefined {
        return this._id;
    }

    public set recipientId(recipientId: number) {
        this.props.recipientId = recipientId;
    }

    public get recipientId(): number {
        return this.props.recipientId;
    }

    public set content(content: Content) {
        this.props.content = content;
    }

    public get content(): Content {
        return this.props.content;
    }

    public set category(category: string) {
        this.props.category = category;
    }

    public get category(): string {
        return this.props.category;
    }

    public set readAt(readAt:  Date | null | undefined ) {
        this.props.readAt = readAt;
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }

    public read() {
        this.props.readAt = new Date();
    }

    public unread() {
        this.props.readAt = null;
    }

    public cancel() {
        this.props.canceledAt = new Date();
    }
    
    public get canceledAt(): Date | null | undefined {
        return this.props.canceledAt;
    }

    public get createdAt(): Date | null | undefined {
        return this.props.createdAt;
    }

}