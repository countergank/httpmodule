"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.FlexService = exports.defaultToken = void 0;
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var testing_1 = require("../testing");
var configuration_service_1 = require("../configuration.service");
var functions_1 = require("../functions");
var filter_class_1 = require("../filter-class");
var path = require("path");
var fs_1 = require("fs");
var defaultToken = function () {
    return (0, testing_1.getToken)();
};
exports.defaultToken = defaultToken;
var FlexService = (function () {
    function FlexService(name, httpService) {
        this.name = name;
        this.httpService = httpService;
        this.token = (0, exports.defaultToken)();
        this._testing = false;
        this.logger = new common_1.Logger(name);
        this.url = this.getConfig("DBURL");
        this.enableLog =
            ["1", "t", "true"].indexOf(this.getConfig("DBURL_LOG").toLowerCase()) >=
                0;
        var token = this.getConfig("DBTOKEN");
        if (token && token !== "") {
            this.token = token;
        }
        this.timeout = this.parseNumber(this.getConfig("DBTIMEOUT"), 20000);
        if (!this.url || this.url.length < 5) {
            this.errorLog("DBModule", "No esta configurada la URL de conexion a la DB. Env: [DBURL]");
        }
        if (!this.token || this.token.length < 5) {
            this.errorLog("DBModule", "No esta configurado el token de acceso a " + this.url);
        }
        this._testing = (0, functions_1.testIsRunning)();
    }
    FlexService.prototype.parseNumber = function (value, def) {
        if (def === void 0) { def = 0; }
        return (0, functions_1.parseNumber)(value, def);
    };
    FlexService.prototype.getMockFileName = function (tablename) {
        var dir = path.join(__dirname, "../../../../../resources/mocks");
        if (!(0, fs_1.existsSync)(dir)) {
            (0, fs_1.mkdirSync)(dir);
        }
        return path.join(dir, "/" + tablename + ".json");
    };
    FlexService.prototype.getMockInfo = function (tablename) {
        var fileName = this.getMockFileName(tablename);
        if ((0, fs_1.existsSync)(fileName)) {
            try {
                var content = JSON.parse((0, fs_1.readFileSync)(fileName, "utf-8"));
                if (Array.isArray(content)) {
                    return content.map(function (item, index) {
                        if (!item.id) {
                            item.id = item._id || (index + 1).toString();
                        }
                        return item;
                    });
                }
            }
            catch (error) {
                errorFn(null);
            }
        }
        return [];
    };
    FlexService.prototype.maxInArray = function (items, fieldName, isNumber) {
        if (isNumber) {
            var max_1 = 0;
            items.forEach(function (item) {
                max_1 = Math.max(max_1, (0, functions_1.parseNumber)(item[fieldName]));
            });
            return max_1;
        }
        else {
            var smax_1 = "";
            items.forEach(function (item) {
                if ((0, functions_1.toString)(item[fieldName]) > smax_1) {
                    smax_1 = (0, functions_1.toString)(item[fieldName]);
                }
            });
            return smax_1;
        }
    };
    FlexService.prototype.getConfig = function (name) {
        return (0, configuration_service_1.configurationGet)(name);
    };
    FlexService.prototype.errorLog = function (name, data, locale) {
        if (!this.logger || (!this.enableLog && locale)) {
            return;
        }
        try {
            var first = data ? JSON.stringify(data) : undefined;
            var second = JSON.stringify(name);
            if (first) {
                this.logger.error({ data: first, name: second });
            }
            else {
                this.logger.error(second);
            }
        }
        catch (error) {
            return;
        }
    };
    FlexService.prototype.debugLog = function (name, data, type, forcedLog) {
        if (type === void 0) { type = "L"; }
        if (!this.logger || (!this.enableLog && !forcedLog)) {
            return;
        }
        try {
            var first = data ? JSON.stringify(data) : undefined;
            var second = JSON.stringify(name);
            if (first) {
                switch (type) {
                    case "W":
                        this.logger.warn({ data: first, name: second });
                        break;
                    case "D":
                        this.logger.debug({ data: first, name: second });
                        break;
                    default:
                        this.logger.log({ data: first, name: second });
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
    FlexService.prototype.request = function (model, endpoint, method, body, def) {
        if (method === void 0) { method = "GET"; }
        return __awaiter(this, void 0, void 0, function () {
            var url, token, options;
            return __generator(this, function (_a) {
                try {
                    if (!model) {
                        this.errorLog("request." + this.url, "Invalid Model");
                        return [2, def];
                    }
                    endpoint = endpoint.replace("[MODEL]", "".concat(model.dbname, "/").concat(model.tablename));
                    url = this.url && this.url.length > 5 ? this.url + endpoint : "";
                    if (url === "") {
                        return [2, def];
                    }
                    token = this.token && this.token.length > 5 ? this.token : "";
                    if (token === "") {
                        this.errorLog("request." + url, "No esta configurado el token de acceso");
                        return [2, def];
                    }
                    options = {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: "bearer ".concat(token),
                        },
                        timeout: this.timeout,
                    };
                    return [2, this.execute(url, method, body, options, def)];
                }
                catch (error) {
                    return [2, undefined];
                }
                return [2];
            });
        });
    };
    FlexService.prototype.execute = function (url, method, body, options, def) {
        var _this = this;
        if (method === void 0) { method = "GET"; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var observable, query;
            var _this = this;
            return __generator(this, function (_a) {
                if (!options) {
                    options = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
                }
                query = "".concat(url, ".").concat(body ? "Body: " + JSON.stringify(body) : "");
                switch (method) {
                    case "DELETE":
                        observable = this.httpService.delete(url, options);
                        break;
                    case "POST":
                        observable = this.httpService.post(url, body, options);
                        break;
                    case "PUT":
                        observable = this.httpService.put(url, body, options);
                        break;
                    default:
                        observable = this.httpService.get(url, options);
                        break;
                }
                if (!observable) {
                    return [2, reject({ message: "Invalid request" })];
                }
                observable.subscribe({
                    next: function (data) {
                        var _a;
                        if ((data === null || data === void 0 ? void 0 : data.data) || (data === null || data === void 0 ? void 0 : data.status) < 300) {
                            return resolve(data.data);
                        }
                        _this.errorLog("request", {
                            message: "La consulta ".concat(query, " no devolvio informacion"),
                        });
                        if (def) {
                            return resolve(def);
                        }
                        return reject({
                            status: (data === null || data === void 0 ? void 0 : data.status) || 500,
                            message: ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.message) || (data === null || data === void 0 ? void 0 : data.statusText) || "",
                        });
                    },
                    error: function (error) {
                        var _a, _b, _c, _d;
                        _this.errorLog("request." + query, error, true);
                        if (def) {
                            return resolve(def);
                        }
                        return reject({
                            status: ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) || 500,
                            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) ||
                                ((_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.statusText) ||
                                "",
                        });
                    },
                });
                return [2];
            });
        }); });
    };
    FlexService.prototype.httppost = function (url, body, options) {
        return this.execute(url, "POST", body, options);
    };
    FlexService.prototype.httpget = function (url, options) {
        return this.execute(url, "GET", undefined, options);
    };
    FlexService.prototype.httpput = function (url, body, options) {
        return this.execute(url, "PUT", body, options);
    };
    FlexService.prototype.httpdelete = function (url, options) {
        return this.execute(url, "DELETE", undefined, options);
    };
    FlexService.prototype.maxFlex = function (model, fieldName, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var items, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fieldName) {
                            return [2, undefined];
                        }
                        if (this._testing) {
                            if (!mockItems) {
                                mockItems = this.getMockInfo(model.tablename);
                            }
                            items = (0, functions_1.arraySorted)(mockItems, fieldName, true);
                            if (items.length > 0) {
                                return [2, ((0, functions_1.parseNumber)(items[0][fieldName]) + 1).toString()];
                            }
                            return [2, "1"];
                        }
                        return [4, this.request(model, "/max/[MODEL]/".concat(fieldName)).catch(errorFn)];
                    case 1:
                        resp = _a.sent();
                        return [2, resp || ""];
                }
            });
        });
    };
    FlexService.prototype.config = function (dbname) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, array;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findAllFlex({ dbname: dbname, tablename: "config" }, { name: { $regex: "env." } }).catch(errorFn)];
                    case 1:
                        resp = _a.sent();
                        if (Array.isArray(resp)) {
                            array = resp
                                .filter(function (i) { return i.name; })
                                .map(function (i) {
                                var _a;
                                return {
                                    name: i.name,
                                    value: ((_a = i.value) === null || _a === void 0 ? void 0 : _a.toString) ? i.value.toString() : "",
                                };
                            });
                            try {
                                array.forEach(function (i) {
                                    process.env[i.name.replace("env.", "")] = i.value;
                                });
                            }
                            catch (error) {
                                this.errorLog("config", error);
                            }
                            return [2, array];
                        }
                        return [2, []];
                }
            });
        });
    };
    FlexService.prototype.aggregateFlex = function (model, conditions, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var items, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(conditions === null || conditions === void 0 ? void 0 : conditions.$match) ||
                            !(conditions === null || conditions === void 0 ? void 0 : conditions.$project) ||
                            Object.keys(conditions.$match).length === 0 ||
                            Object.keys(conditions.$project).length === 0) {
                            return [2, []];
                        }
                        if (this._testing) {
                            if (!mockItems) {
                                mockItems = this.getMockInfo(model.tablename);
                            }
                            items = this.filterForTest(mockItems, conditions.$match);
                            if (conditions.$limit) {
                                return [2, items.filter(function (_, index) { return index < (0, functions_1.parseNumber)(conditions.$limit); })];
                            }
                            return [2, items];
                        }
                        return [4, this.request(model, "/aggregate/[MODEL]", "POST", conditions).catch(errorFn)];
                    case 1:
                        resp = _a.sent();
                        if (Array.isArray(resp)) {
                            return [2, resp];
                        }
                        return [2, []];
                }
            });
        });
    };
    FlexService.prototype.findAllFlex = function (model, filter, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!filter) {
                            return [2, []];
                        }
                        if (this._testing) {
                            if (!mockItems) {
                                mockItems = this.getMockInfo(model.tablename);
                            }
                            return [2, this.filterForTest(mockItems, filter)];
                        }
                        return [4, this.request(model, "/findAll/[MODEL]", "POST", {
                                filter: filter,
                            }).catch(errorFn)];
                    case 1:
                        resp = _a.sent();
                        if (Array.isArray(resp)) {
                            return [2, resp];
                        }
                        return [2, []];
                }
            });
        });
    };
    FlexService.prototype.filterForTest = function (_mockItems, _filter) {
        if (!_filter || Object.keys(_filter).length === 0) {
            return _mockItems;
        }
        var filter = new filter_class_1.FilterClass();
        return _mockItems.filter(function (item) { return filter.apply(_filter, item); });
    };
    FlexService.prototype.countFlex = function (model, filter, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!filter) {
                            return [2, -1];
                        }
                        if (this._testing) {
                            if (!mockItems) {
                                mockItems = this.getMockInfo(model.tablename);
                            }
                            return [2, this.filterForTest(mockItems, filter).length];
                        }
                        return [4, this.request(model, "/count/[MODEL]", "POST", { filter: filter }, -1).catch(errorFn)];
                    case 1:
                        resp = _a.sent();
                        return [2, (resp === null || resp === void 0 ? void 0 : resp.count) || 0];
                }
            });
        });
    };
    FlexService.prototype.findOneFlex = function (model, filter, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findAllFlex(model, filter, mockItems).catch(errorFn)];
                    case 1:
                        resp = _a.sent();
                        if (Array.isArray(resp) && resp.length > 0) {
                            return [2, resp[0]];
                        }
                        return [2, undefined];
                }
            });
        });
    };
    FlexService.prototype.findByIdFlex = function (model, id, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var items, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            return [2, undefined];
                        }
                        if (this._testing) {
                            if (!mockItems) {
                                mockItems = this.getMockInfo(model.tablename);
                            }
                            items = this.filterForTest(mockItems, { _id: id });
                            if (items.length > 0) {
                                return [2, items[0]];
                            }
                            return [2, undefined];
                        }
                        return [4, this.request(model, "/findOne/[MODEL]/".concat(id)).catch(errorFn)];
                    case 1:
                        resp = _a.sent();
                        return [2, resp];
                }
            });
        });
    };
    FlexService.prototype.createFlex = function (model, item, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, newItem, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!item) {
                            return [2, undefined];
                        }
                        if (!this._testing) return [3, 2];
                        if (!mockItems) {
                            mockItems = this.getMockInfo(model.tablename);
                        }
                        _id = new Date().getTime().toString();
                        _a = [__assign({}, item)];
                        _b = { _id: _id, id: _id, createdAt: (0, functions_1.formatDate)(undefined, 0, false, "-"), updatedAt: (0, functions_1.formatDate)(undefined, 0, false, "-") };
                        return [4, this.maxFlex(model, "numberid", mockItems)];
                    case 1:
                        newItem = __assign.apply(void 0, _a.concat([(_b.numberid = _c.sent(), _b)]));
                        mockItems.push(newItem);
                        return [2, newItem];
                    case 2: return [2, this.request(model, "/insert/[MODEL]", "POST", { item: item }).catch(errorFn)];
                }
            });
        });
    };
    FlexService.prototype.createManyFlex = function (model, items, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var _id_1, numberid_1, _a, newItems;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!Array.isArray(items)) {
                            return [2, undefined];
                        }
                        if (!this._testing) return [3, 2];
                        if (!mockItems) {
                            mockItems = this.getMockInfo(model.tablename);
                        }
                        _id_1 = new Date().getTime();
                        _a = functions_1.parseNumber;
                        return [4, this.maxFlex(model, "numberid", mockItems)];
                    case 1:
                        numberid_1 = _a.apply(void 0, [_b.sent()]);
                        newItems = items.map(function (item) {
                            _id_1++;
                            numberid_1++;
                            return __assign(__assign({}, item), { _id: _id_1.toString(), id: _id_1.toString(), createdAt: (0, functions_1.formatDate)(undefined, 0, false, "-"), updatedAt: (0, functions_1.formatDate)(undefined, 0, false, "-"), numberid: numberid_1.toString() });
                        });
                        mockItems.push.apply(mockItems, newItems);
                        return [2, newItems];
                    case 2: return [2, this.request(model, "/insert/[MODEL]", "POST", { items: items }).catch(errorFn)];
                }
            });
        });
    };
    FlexService.prototype.bulkFlex = function (model, items, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if ((0, functions_1.toArray)(items).length === 0) {
                    return [2, undefined];
                }
                if (this._testing) {
                    return [2, undefined];
                }
                return [2, this.request(model, "/bulk/[MODEL]", "POST", { items: items }).catch(errorFn)];
            });
        });
    };
    FlexService.prototype.deleteFlex = function (model, id, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                if (!id) {
                    return [2, undefined];
                }
                if (this._testing) {
                    if (!mockItems) {
                        mockItems = this.getMockInfo(model.tablename);
                    }
                    item = mockItems.find(function (i) { return i._id === id; });
                    if (!item) {
                        return [2, false];
                    }
                    mockItems = mockItems.filter(function (i) { return i._id !== id; });
                    return [2, true];
                }
                return [2, this.request(model, "/deleteOne/[MODEL]/".concat(id), "DELETE").catch(errorFn)];
            });
        });
    };
    FlexService.prototype.deleteManyFlex = function (model, condition, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                if (!condition) {
                    return [2, undefined];
                }
                if (this._testing) {
                    if (!mockItems) {
                        mockItems = this.getMockInfo(model.tablename);
                    }
                    items = this.filterForTest(mockItems, condition);
                    if (items.length === 0) {
                        return [2, false];
                    }
                    mockItems = items;
                    return [2, true];
                }
                return [2, this.request(model, "/delete/[MODEL]", "POST", { condition: condition }).catch(errorFn)];
            });
        });
    };
    FlexService.prototype.updateFlex = function (model, id, item, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var item2, resp_1;
            return __generator(this, function (_a) {
                if (!item || !id) {
                    return [2, undefined];
                }
                if (this._testing) {
                    if (!mockItems) {
                        mockItems = this.getMockInfo(model.tablename);
                    }
                    item2 = mockItems.find(function (item1) { return item1._id === id; });
                    if (!item2) {
                        return [2, undefined];
                    }
                    resp_1 = item2;
                    mockItems.forEach(function (item1) {
                        if (item1._id === id) {
                            resp_1 = __assign(__assign({}, resp_1), item);
                            item1 = resp_1;
                            return;
                        }
                    });
                    return [2, resp_1];
                }
                return [2, this.request(model, "/updateOne/[MODEL]/".concat(id), "PUT", {
                        item: item,
                    }).catch(errorFn)];
            });
        });
    };
    FlexService.prototype.updateManyFlex = function (model, item, condition, mockItems) {
        return __awaiter(this, void 0, void 0, function () {
            var items, resp_2, _loop_1, _i, items_1, itemp;
            return __generator(this, function (_a) {
                if (!item || !condition) {
                    return [2, []];
                }
                if (this._testing) {
                    if (!mockItems) {
                        mockItems = this.getMockInfo(model.tablename);
                    }
                    items = this.filterForTest(mockItems, condition);
                    if (items.length === 0) {
                        return [2, []];
                    }
                    resp_2 = [];
                    _loop_1 = function (itemp) {
                        mockItems.forEach(function (item1) {
                            if (item1._id === itemp.id) {
                                item1 = __assign(__assign({}, item1), item);
                                resp_2.push(item1);
                                return;
                            }
                        });
                    };
                    for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                        itemp = items_1[_i];
                        _loop_1(itemp);
                    }
                    return [2, resp_2];
                }
                return [2, this.request(model, "/update/[MODEL]", "PUT", {
                        item: item,
                        condition: condition,
                    }).catch(errorFn)];
            });
        });
    };
    FlexService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [String, axios_1.HttpService])
    ], FlexService);
    return FlexService;
}());
exports.FlexService = FlexService;
exports.default = FlexService;
var errorFn = function (_error) {
    return;
};
//# sourceMappingURL=flex.service.js.map