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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var config = require("config");
var notification_functions_1 = require("./notification.functions");
var flex_service_1 = require("../dbmanager/flex.service");
var NotificationService = (function () {
    function NotificationService(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(NotificationService_1.name);
        this.token = (0, flex_service_1.defaultToken)();
        this.url = this.getConfig("NOTIFICATIONURL");
        var token = this.getConfig("DBTOKEN");
        if (token && token !== "") {
            this.token = token;
        }
        this.timeout = this.parseNumber(this.getConfig("NOTIFICATIONTIMEOUT"), 20000);
        if (!this.url || this.url.length < 5) {
            this.errorLog("NotificationModule", "No esta configurada la URL de conexion a la API de Notificaciones. Env: [NOTIFICATIONURL]");
            return;
        }
        this.url = this.url + "/notification";
        if (!this.token || this.token.length < 5) {
            this.errorLog("NotificationModule", "No esta configurado el token de acceso a " + this.url);
        }
    }
    NotificationService_1 = NotificationService;
    NotificationService.prototype.parseNumber = function (value, def) {
        if (def === void 0) { def = 0; }
        try {
            var i = parseFloat(value);
            if (!i || isNaN(i)) {
                return def;
            }
            return i;
        }
        catch (error) {
            return def;
        }
    };
    NotificationService.prototype.getConfig = function (name) {
        try {
            return process.env[name] || config.get(name);
        }
        catch (error) {
            return "";
        }
    };
    NotificationService.prototype.errorLog = function (name, data) {
        if (!this.logger) {
            return;
        }
        try {
            var first = data ? JSON.stringify(data) : undefined;
            var second = JSON.stringify(name);
            if (first) {
                this.logger.error(first, second);
            }
            else {
                this.logger.error(second);
            }
        }
        catch (error) {
            return;
        }
    };
    NotificationService.prototype.debugLog = function (name, data, type) {
        if (type === void 0) { type = "L"; }
        if (!this.logger) {
            return;
        }
        try {
            var first = data ? JSON.stringify(data) : undefined;
            var second = JSON.stringify(name);
            if (first) {
                switch (type) {
                    case "W":
                        this.logger.warn(first, second);
                        break;
                    case "D":
                        this.logger.debug(first, second);
                        break;
                    default:
                        this.logger.log(first, second);
                        break;
                }
            }
            else {
                switch (type) {
                    case "W":
                        this.logger.warn(second);
                        break;
                    case "D":
                        this.logger.debug(second);
                        break;
                    default:
                        this.logger.log(second);
                        break;
                }
            }
        }
        catch (error) {
            return;
        }
    };
    NotificationService.prototype.request = function (endpoint, method, body) {
        if (method === void 0) { method = "GET"; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, token, options, resp, query;
                        var _this = this;
                        return __generator(this, function (_a) {
                            url = this.url && this.url.length > 5 ? this.url + endpoint : "";
                            if (url === "") {
                                return [2, resolve(undefined)];
                            }
                            token = this.token && this.token.length > 5 ? this.token : "";
                            if (token === "") {
                                this.errorLog("request." + url, "No esta configurado el token de acceso");
                                return [2, resolve(undefined)];
                            }
                            options = {
                                headers: {
                                    "Content-Type": "application/json",
                                    authorization: "bearer ".concat(token),
                                },
                                timeout: this.timeout,
                            };
                            resp = null;
                            query = "".concat(this.url, ".").concat(body ? "Body: " + JSON.stringify(body) : "");
                            switch (method) {
                                case "GET":
                                    resp = this.httpService.get(url, options).toPromise();
                                    break;
                                case "POST":
                                    resp = this.httpService.post(url, body, options).toPromise();
                                    break;
                                case "PUT":
                                    resp = this.httpService.put(url, body, options).toPromise();
                                    break;
                                default:
                                    resp = this.httpService.delete(url, options).toPromise();
                                    break;
                            }
                            if (!resp) {
                                this.errorLog("request", {
                                    message: "No se pudo ejecutar la consulta ".concat(query),
                                });
                                return [2, resolve(undefined)];
                            }
                            resp
                                .then(function (response) {
                                if (response && ((response === null || response === void 0 ? void 0 : response.data) || (response === null || response === void 0 ? void 0 : response.status) < 300)) {
                                    return resolve(response.data);
                                }
                                _this.errorLog("request", {
                                    message: "La consulta ".concat(query, " no devolvio informacion"),
                                });
                                return resolve(undefined);
                            })
                                .catch(function (error) {
                                _this.errorLog("request." + query, error);
                                return resolve(undefined);
                            });
                            return [2];
                        });
                    }); })];
            });
        });
    };
    NotificationService.prototype.send = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var message, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, notification_functions_1.bodyIsOk)(body)) {
                            return [2, { message: "Invalid Body Request" }];
                        }
                        message = null;
                        return [4, this.request("/send", "POST", body).catch(function (error) { return (message = error); })];
                    case 1:
                        resp = _a.sent();
                        if (message) {
                            return [2, { message: message }];
                        }
                        return [2, { message: null }];
                }
            });
        });
    };
    NotificationService.prototype.insertQueue = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var message, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, notification_functions_1.bodyQueueIsOk)(body)) {
                            return [2, {
                                    message: "Invalid Request",
                                }];
                        }
                        message = null;
                        return [4, this.request("/queue", "POST", body).catch(function (error) { return (message = error); })];
                    case 1:
                        resp = _a.sent();
                        if (message) {
                            return [2, { message: message }];
                        }
                        return [2, { message: null }];
                }
            });
        });
    };
    NotificationService.prototype.getHTML = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var message, resp;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(body === null || body === void 0 ? void 0 : body.key) || !Array.isArray(body === null || body === void 0 ? void 0 : body.info) || body.info.length === 0) {
                                        return [2, reject({ message: "Invalid Body Request" })];
                                    }
                                    message = null;
                                    return [4, this.request("/html-get", "POST", body).catch(function (error) { return (message = error); })];
                                case 1:
                                    resp = _a.sent();
                                    if (message || !resp) {
                                        return [2, reject({ message: message || "No se pudo generar el html" })];
                                    }
                                    return [2, resolve(resp)];
                            }
                        });
                    }); })];
            });
        });
    };
    var NotificationService_1;
    NotificationService = NotificationService_1 = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [axios_1.HttpService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map