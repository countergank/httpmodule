"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var ApiException = (function () {
    function ApiException() {
    }
    __decorate([
        (0, swagger_1.ApiPropertyOptional)({ default: common_1.HttpStatus.INTERNAL_SERVER_ERROR }),
        __metadata("design:type", Number)
    ], ApiException.prototype, "statusCode", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)({ default: 500 }),
        __metadata("design:type", Number)
    ], ApiException.prototype, "errorCode", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: "" }),
        __metadata("design:type", String)
    ], ApiException.prototype, "message", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], ApiException.prototype, "status", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], ApiException.prototype, "error", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", Object)
    ], ApiException.prototype, "errors", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], ApiException.prototype, "timestamp", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], ApiException.prototype, "path", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], ApiException.prototype, "method", void 0);
    return ApiException;
}());
exports.ApiException = ApiException;
//# sourceMappingURL=api-exception.model.js.map