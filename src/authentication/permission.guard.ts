import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionInterface } from "./services/model/permission.model";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permisosContext = this.reflector.get<PermissionInterface>(
      "permissions",
      context.getHandler()
    );
    if (!permisosContext) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    const hasPermission = () => {
      const appRole = user.roles.find(
        (role: any) => role.appName === permisosContext.application
      );
      if (appRole) {
        return appRole.permissions.some(
          (perm: any) =>
            (perm.element.name === permisosContext.element ||
              perm.element.name.toLowerCase() === "todos los elementos") &&
            perm.permission &&
            (perm.componentName === permisosContext.component ||
              perm.componentName === "Todos los Componentes")
        );
      } else {
        return false;
      }
    };

    return user && user.roles && hasPermission();
  }
}
