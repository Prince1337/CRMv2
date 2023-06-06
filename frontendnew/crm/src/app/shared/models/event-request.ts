import { Time } from "@angular/common";

export interface EventRequest {

    type: string;

    title: string;

    clientId: number;

    time: Time;
}
