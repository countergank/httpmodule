import { BodyQueue, BodyRequestNotification, NameValue } from "./notification.interfaces";
export declare const convertInterfaceToArrayNameValue: (data: any) => NameValue[];
export declare const bodyIsOk: (body: BodyRequestNotification) => boolean;
export declare const bodyQueueIsOk: (body: BodyQueue) => boolean;
export declare const buildTemplate: (contentHTML: string, title: string, info: NameValue[]) => {
    content: string;
    title: string;
};
export declare const removeUnknownFileds: (content: string) => string;
