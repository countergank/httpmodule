"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPService = exports.HTTPModule = exports.MainModule = exports.DBName = exports.configurationGet = exports.ConfigService = exports.ConfigModule = exports.NotificationService = exports.NotificationModule = exports.FlexService = exports.BaseFullService = exports.BaseService = exports.ApiCreation = void 0;
__exportStar(require("./configuration.service"), exports);
var configuration_service_1 = require("./configuration.service");
Object.defineProperty(exports, "configurationGet", { enumerable: true, get: function () { return configuration_service_1.configurationGet; } });
Object.defineProperty(exports, "DBName", { enumerable: true, get: function () { return configuration_service_1.DBName; } });
__exportStar(require("./http.creation"), exports);
var http_creation_1 = require("./http.creation");
Object.defineProperty(exports, "MainModule", { enumerable: true, get: function () { return http_creation_1.MainModule; } });
var http_creation_2 = require("./http.creation");
Object.defineProperty(exports, "ApiCreation", { enumerable: true, get: function () { return http_creation_2.default; } });
__exportStar(require("./dbmanager/base.model"), exports);
__exportStar(require("./dbmanager/base.service"), exports);
var base_service_1 = require("./dbmanager/base.service");
Object.defineProperty(exports, "BaseService", { enumerable: true, get: function () { return base_service_1.default; } });
__exportStar(require("./dbmanager/basefull.service"), exports);
var basefull_service_1 = require("./dbmanager/basefull.service");
Object.defineProperty(exports, "BaseFullService", { enumerable: true, get: function () { return basefull_service_1.default; } });
__exportStar(require("./dbmanager/flex.service"), exports);
var flex_service_1 = require("./dbmanager/flex.service");
Object.defineProperty(exports, "FlexService", { enumerable: true, get: function () { return flex_service_1.default; } });
__exportStar(require("./dbmanager/flex.service"), exports);
__exportStar(require("./authentication/decorators/endpoint.decorator"), exports);
__exportStar(require("./authentication/decorators/user.decorator"), exports);
__exportStar(require("./authentication/services/http-error.filter"), exports);
__exportStar(require("./authentication/services/jwt.service"), exports);
__exportStar(require("./authentication/services/model/jwt.model"), exports);
__exportStar(require("./authentication/services/model/permission.model"), exports);
__exportStar(require("./authentication/services/permissions.decorator"), exports);
__exportStar(require("./authentication/api-exception.model"), exports);
__exportStar(require("./authentication/auth.module"), exports);
__exportStar(require("./authentication/permission.guard"), exports);
__exportStar(require("./testing"), exports);
__exportStar(require("./functions"), exports);
__exportStar(require("./filter-class"), exports);
__exportStar(require("./notifications/notification.functions"), exports);
__exportStar(require("./notifications/notification.interfaces"), exports);
var http_module_1 = require("./http.module");
Object.defineProperty(exports, "HTTPModule", { enumerable: true, get: function () { return http_module_1.HTTPModule; } });
var http_service_1 = require("./http.service");
Object.defineProperty(exports, "HTTPService", { enumerable: true, get: function () { return http_service_1.HTTPService; } });
var notification_module_1 = require("./notifications/notification.module");
Object.defineProperty(exports, "NotificationModule", { enumerable: true, get: function () { return notification_module_1.NotificationModule; } });
var notification_service_1 = require("./notifications/notification.service");
Object.defineProperty(exports, "NotificationService", { enumerable: true, get: function () { return notification_service_1.NotificationService; } });
var config_module_1 = require("./config-module/config.module");
Object.defineProperty(exports, "ConfigModule", { enumerable: true, get: function () { return config_module_1.ConfigModule; } });
var config_service_1 = require("./config-module/config.service");
Object.defineProperty(exports, "ConfigService", { enumerable: true, get: function () { return config_service_1.ConfigService; } });
//# sourceMappingURL=core.js.map