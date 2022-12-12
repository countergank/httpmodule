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
exports.ConfigService = void 0;
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var flex_service_1 = require("../dbmanager/flex.service");
var functions_1 = require("../functions");
var config_module_1 = require("./config.module");
var ConfigService = (function (_super) {
    __extends(ConfigService, _super);
    function ConfigService(httpService) {
        var _this = _super.call(this, ConfigService_1.name, httpService) || this;
        _this.httpService = httpService;
        _this.items = [];
        if (!(0, functions_1.testIsRunning)()) {
            _this.run(0);
        }
        return _this;
    }
    ConfigService_1 = ConfigService;
    ConfigService.prototype.run = function (timeout) {
        var _this = this;
        setTimeout(function () {
            if (!config_module_1.DefaultDB) {
                _this.run(20000);
                return;
            }
            _this.config(config_module_1.DefaultDB)
                .then(function (resp) {
                var _a;
                _this.items.splice(0, _this.items.length);
                (_a = _this.items).push.apply(_a, resp);
                _this.run(config_module_1.DefaultInterval);
            })
                .catch(functions_1.errorFn);
        }, timeout);
    };
    ConfigService.prototype.get = function (name, def) {
        var _a;
        return ((_a = this.items.find(function (i) { return i.name === name; })) === null || _a === void 0 ? void 0 : _a.value) || def;
    };
    var ConfigService_1;
    ConfigService = ConfigService_1 = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [axios_1.HttpService])
    ], ConfigService);
    return ConfigService;
}(flex_service_1.FlexService));
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map