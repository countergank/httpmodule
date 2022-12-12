"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPointResponse = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var api_exception_model_1 = require("../api-exception.model");
function EndPointResponse(options) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, type: api_exception_model_1.ApiException }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, type: api_exception_model_1.ApiException }), (0, swagger_1.ApiOperation)(options));
}
exports.EndPointResponse = EndPointResponse;
//# sourceMappingURL=endpoint.decorator.js.map