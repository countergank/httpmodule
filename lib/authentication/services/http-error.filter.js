"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorFilter = void 0;
var common_1 = require("@nestjs/common");
var HttpErrorFilter = (function () {
    function HttpErrorFilter() {
    }
    HttpErrorFilter.prototype.catch = function (error, host) {
        var _a, _b, _c;
        var ctx = host === null || host === void 0 ? void 0 : host.switchToHttp();
        var request = ctx === null || ctx === void 0 ? void 0 : ctx.getRequest();
        var response = ctx === null || ctx === void 0 ? void 0 : ctx.getResponse();
        if (!response) {
            return;
        }
        var status = (error === null || error === void 0 ? void 0 : error.getStatus()) || 0;
        if (error && status >= common_1.HttpStatus.AMBIGUOUS) {
            if (typeof error.response !== "string") {
                error.response["message"] =
                    error.response.message ||
                        "You do not have permissions to access this resource";
            }
        }
        var errorResponse = {
            statusCode: status,
            error: ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.name) || (error === null || error === void 0 ? void 0 : error.name) || "unknown",
            message: ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.message) || (error === null || error === void 0 ? void 0 : error.message) || null,
            errors: ((_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.errors) || null,
            timestamp: new Date().toLocaleDateString(),
            path: request ? request.url : null,
            method: request ? request.method : null,
        };
        common_1.Logger.error("".concat((request === null || request === void 0 ? void 0 : request.method) || "", " ").concat((request === null || request === void 0 ? void 0 : request.url) || ""), JSON.stringify(errorResponse), "ExceptionFilter", false);
        response.status(status).json(errorResponse);
    };
    HttpErrorFilter = __decorate([
        (0, common_1.Catch)(common_1.HttpException)
    ], HttpErrorFilter);
    return HttpErrorFilter;
}());
exports.HttpErrorFilter = HttpErrorFilter;
//# sourceMappingURL=http-error.filter.js.map