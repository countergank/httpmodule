"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = exports.Permissions = void 0;
var common_1 = require("@nestjs/common");
var Permissions = function (permissions) {
    return (0, common_1.SetMetadata)("permissions", permissions);
};
exports.Permissions = Permissions;
var hasPermission = function (user, appName, componentName, elementName, strictCheck) {
    var _a;
    if (!(user === null || user === void 0 ? void 0 : user.roles) || !appName || !componentName) {
        return false;
    }
    var roles = (Array.isArray(user === null || user === void 0 ? void 0 : user.roles) ? user === null || user === void 0 ? void 0 : user.roles : []).filter(function (role) { return ((role === null || role === void 0 ? void 0 : role.appName) || "").toLowerCase() === appName.toLowerCase(); });
    var permission1 = null;
    var permission2 = false;
    var fcomponentName = componentName.toLowerCase();
    var felementName = (elementName || "todos los elementos").toLowerCase();
    for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
        var role = roles_1[_i];
        if (!Array.isArray(role === null || role === void 0 ? void 0 : role.permissions)) {
            continue;
        }
        for (var _b = 0, _c = role.permissions; _b < _c.length; _b++) {
            var permission = _c[_b];
            var ename = (((_a = permission === null || permission === void 0 ? void 0 : permission.element) === null || _a === void 0 ? void 0 : _a.name) || "").toLowerCase();
            var cname = ((permission === null || permission === void 0 ? void 0 : permission.componentName) || "").toLowerCase();
            var all = !(permission === null || permission === void 0 ? void 0 : permission.componentName) || cname === "todos los componentes";
            var enabled = permission.permission === true;
            if (ename === felementName) {
                if (cname === fcomponentName) {
                    return enabled;
                }
                if (strictCheck !== true && all) {
                    permission1 = enabled;
                }
            }
            else if (strictCheck !== true &&
                all &&
                ename === "todos los elementos") {
                permission2 = enabled;
            }
        }
    }
    if (permission1 !== null) {
        return permission1;
    }
    return permission2;
};
exports.hasPermission = hasPermission;
//# sourceMappingURL=permissions.decorator.js.map