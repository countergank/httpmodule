"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var common_1 = require("@nestjs/common");
exports.User = (0, common_1.createParamDecorator)(function (data, ctx) {
    try {
        var request = ctx.switchToHttp().getRequest();
        var user = request.user;
        return data ? user === null || user === void 0 ? void 0 : user[data] : user;
    }
    catch (error) {
        return null;
    }
});
//# sourceMappingURL=user.decorator.js.map