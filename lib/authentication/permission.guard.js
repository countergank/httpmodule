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
exports.PermissionsGuard = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var PermissionsGuard = (function () {
    function PermissionsGuard(reflector) {
        this.reflector = reflector;
    }
    PermissionsGuard.prototype.canActivate = function (context) {
        var permisosContext = this.reflector.get("permissions", context.getHandler());
        if (!permisosContext) {
            return true;
        }
        var request = context.switchToHttp().getRequest();
        var user = request === null || request === void 0 ? void 0 : request.user;
        var hasPermission = function () {
            var appRole = user.roles.find(function (role) { return role.appName === permisosContext.application; });
            if (appRole) {
                return appRole.permissions.some(function (perm) {
                    return (perm.element.name === permisosContext.element ||
                        perm.element.name.toLowerCase() === "todos los elementos") &&
                        perm.permission &&
                        (perm.componentName === permisosContext.component ||
                            perm.componentName === "Todos los Componentes");
                });
            }
            else {
                return false;
            }
        };
        return user && user.roles && hasPermission();
    };
    PermissionsGuard = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [core_1.Reflector])
    ], PermissionsGuard);
    return PermissionsGuard;
}());
exports.PermissionsGuard = PermissionsGuard;
//# sourceMappingURL=permission.guard.js.map