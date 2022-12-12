import { JwtPayload } from "./model/jwt.model";
import { PermissionInterface } from "./model/permission.model";
export declare const Permissions: (permissions: PermissionInterface) => import("@nestjs/common").CustomDecorator<string>;
export declare const hasPermission: (user: JwtPayload, appName: string, componentName: string, elementName?: string, strictCheck?: boolean) => boolean;
