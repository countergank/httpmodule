"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.key = exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var http_error_filter_1 = require("./services/http-error.filter");
var jwt_service_1 = require("./services/jwt.service");
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule_1 = AuthModule;
    AuthModule.setKey = function (fieldName) {
        exports.key = fieldName;
        return {
            module: AuthModule_1,
            providers: [http_error_filter_1.HttpErrorFilter, jwt_service_1.JwtService],
            exports: [http_error_filter_1.HttpErrorFilter],
        };
    };
    var AuthModule_1;
    AuthModule = AuthModule_1 = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({})
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
exports.key = "";
//# sourceMappingURL=auth.module.js.map