import { Time } from "@angular/common";

export interface NotificationResponse {

    id: number;
    eventTitle: string;
    username: string;
    created: Time;
    wasRead: boolean;
    content: string;
}
