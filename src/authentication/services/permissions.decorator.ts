import { SetMetadata } from "@nestjs/common";
import { JwtPayload } from "./model/jwt.model";
import { PermissionInterface } from "./model/permission.model";

export const Permissions = (permissions: PermissionInterface) =>
  SetMetadata("permissions", permissions);

export const hasPermission = (
  user: JwtPayload,
  appName: string,
  componentName: string,
  elementName?: string,
  strictCheck?: boolean
): boolean => {
  if (!user?.roles || !appName || !componentName) {
    return false;
  }

  const roles = (Array.isArray(user?.roles) ? user?.roles : []).filter(
    (role) => (role?.appName || "").toLowerCase() === appName.toLowerCase()
  );
  let permission1: boolean | null = null;
  let permission2 = false;

  const fcomponentName = componentName.toLowerCase();
  const felementName = (elementName || "todos los elementos").toLowerCase();

  for (const role of roles) {
    if (!Array.isArray(role?.permissions)) {
      continue;
    }
    for (const permission of role.permissions) {
      const ename = (permission?.element?.name || "").toLowerCase();
      const cname = (permission?.componentName || "").toLowerCase();
      const all =
        !permission?.componentName || cname === "todos los componentes";
      const enabled = permission.permission === true;
      if (ename === felementName) {
        if (cname === fcomponentName) {
          return enabled;
        }
        if (strictCheck !== true && all) {
          permission1 = enabled;
        }
      } else if (
        strictCheck !== true &&
        all &&
        ename === "todos los elementos"
      ) {
        permission2 = enabled;
      }
    }
  }

  if (permission1 !== null) {
    return permission1;
  }

  return permission2;
};
