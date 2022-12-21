import { HttpService } from "@nestjs/axios";
import { BodyQueue, BodyRequestNotification, BodyRequestNotificationHTML } from "./notification.interfaces";
export declare class NotificationService {
    protected httpService: HttpService;
    private logger;
    private url;
    private token;
    private timeout;
    parseNumber(value: any, def?: number): number;
    protected getConfig(name: string): string;
    protected errorLog(name: string, data?: any): void;
    protected debugLog(name: string, data?: any, type?: "W" | "L" | "D"): void;
    constructor(httpService: HttpService);
    private request;
    send(body: BodyRequestNotification): Promise<{
        message: any;
    }>;
    insertQueue(body: BodyQueue): Promise<{
        message: any;
    }>;
    getHTML(body: BodyRequestNotificationHTML): Promise<string>;
}
