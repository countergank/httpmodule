export * from "./configuration.service";
import { configurationGet, DBName } from "./configuration.service";

export * from "./http.creation";
import { MainModule } from "./http.creation";
export { default as ApiCreation } from "./http.creation";

export * from "./dbmanager/base.model";
export * from "./dbmanager/base.service";
export { default as BaseService } from "./dbmanager/base.service";

export * from "./dbmanager/basefull.service";
export { default as BaseFullService } from "./dbmanager/basefull.service";

export * from "./dbmanager/flex.service";
export { default as FlexService } from "./dbmanager/flex.service";

export * from "./dbmanager/flex.service";

export * from "./authentication/decorators/endpoint.decorator";
export * from "./authentication/decorators/user.decorator";
export * from "./authentication/services/http-error.filter";
export * from "./authentication/services/jwt.service";
export * from "./authentication/services/model/jwt.model";
export * from "./authentication/services/model/permission.model";
export * from "./authentication/services/permissions.decorator";
export * from "./authentication/api-exception.model";
export * from "./authentication/auth.module";
export * from "./authentication/permission.guard";
export * from "./testing";
export * from "./functions";
export * from "./filter-class";
export * from "./notifications/notification.functions";
export * from "./notifications/notification.interfaces";

import {HTTPModule} from "./http.module";
import {HTTPService} from "./http.service";

import {NotificationModule} from "./notifications/notification.module";
import {NotificationService} from "./notifications/notification.service";

import { ConfigModule } from "./config-module/config.module";
import { ConfigService } from "./config-module/config.service";

export { NotificationModule, NotificationService, ConfigModule, ConfigService, configurationGet, DBName, MainModule, HTTPModule, HTTPService };
