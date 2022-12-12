export declare class JwtPayload {
    userId: string;
    username: string;
    roles: UserRole[];
    iat?: Date;
}
export declare class UserRole {
    id?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    role: string;
    permissions: ElementPermission[];
    appId: string;
    appName?: string;
}
export declare class UserRoleVM extends UserRole {
    appName: string;
}
export declare class ElementPermission {
    element: ComponentElement;
    componentId: string;
    permission: boolean;
    componentName?: string;
}
export interface ComponentElement {
    name: string;
    description?: string;
}
