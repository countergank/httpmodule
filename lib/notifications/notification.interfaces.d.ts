export interface NotificationTarget {
    name?: string;
    email: string;
}
export interface BodyRequestNotificationHTML {
    key: string;
    info: NameValue[];
}
export interface BodyRequestNotification {
    key: string;
    target: NotificationTarget[];
    info: NameValue[];
    entity?: {
        type: string;
        id: string;
    };
    priority?: string;
    rawHTML?: string;
    includeLogoInFooter?: boolean;
}
export interface NameValue {
    name: string;
    value: any;
}
export interface BodyQueue {
    email: string;
    content: string;
    title?: string;
    channelId?: string;
}
