"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ElementPermission = exports.UserRoleVM = exports.UserRole = exports.JwtPayload = void 0;
var swagger_1 = require("@nestjs/swagger");
var JwtPayload = (function () {
    function JwtPayload() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ default: "" }),
        __metadata("design:type", String)
    ], JwtPayload.prototype, "userId", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: "" }),
        __metadata("design:type", String)
    ], JwtPayload.prototype, "username", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: [], isArray: true }),
        __metadata("design:type", Array)
    ], JwtPayload.prototype, "roles", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", Date)
    ], JwtPayload.prototype, "iat", void 0);
    return JwtPayload;
}());
exports.JwtPayload = JwtPayload;
var UserRole = (function () {
    function UserRole() {
    }
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], UserRole.prototype, "id", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], UserRole.prototype, "_id", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], UserRole.prototype, "createdAt", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], UserRole.prototype, "updatedAt", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: "" }),
        __metadata("design:type", String)
    ], UserRole.prototype, "role", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: [], isArray: true }),
        __metadata("design:type", Array)
    ], UserRole.prototype, "permissions", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: "" }),
        __metadata("design:type", String)
    ], UserRole.prototype, "appId", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        __metadata("design:type", String)
    ], UserRole.prototype, "appName", void 0);
    return UserRole;
}());
exports.UserRole = UserRole;
var UserRoleVM = (function (_super) {
    __extends(UserRoleVM, _super);
    function UserRoleVM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", String)
    ], UserRoleVM.prototype, "appName", void 0);
    return UserRoleVM;
}(UserRole));
exports.UserRoleVM = UserRoleVM;
var ElementPermission = (function () {
    function ElementPermission() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        __metadata("design:type", Object)
    ], ElementPermission.prototype, "element", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: "" }),
        __metadata("design:type", String)
    ], ElementPermission.prototype, "componentId", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: false }),
        __metadata("design:type", Boolean)
    ], ElementPermission.prototype, "permission", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ default: "" }),
        __metadata("design:type", String)
    ], ElementPermission.prototype, "componentName", void 0);
    return ElementPermission;
}());
exports.ElementPermission = ElementPermission;
//# sourceMappingURL=jwt.model.js.map