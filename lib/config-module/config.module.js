"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultInterval = exports.DefaultDB = exports.ConfigModule = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("@nestjs/axios");
var config_service_1 = require("./config.service");
var ConfigModule = (function () {
    function ConfigModule() {
    }
    ConfigModule_1 = ConfigModule;
    ConfigModule.setDatabase = function (name, interval) {
        exports.DefaultDB = name;
        exports.DefaultInterval = interval || 20000;
        return {
            module: ConfigModule_1,
            imports: [axios_1.HttpModule],
            providers: [config_service_1.ConfigService],
            exports: [config_service_1.ConfigService],
        };
    };
    var ConfigModule_1;
    ConfigModule = ConfigModule_1 = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({})
    ], ConfigModule);
    return ConfigModule;
}());
exports.ConfigModule = ConfigModule;
exports.DefaultDB = "";
exports.DefaultInterval = 0;
//# sourceMappingURL=config.module.js.map