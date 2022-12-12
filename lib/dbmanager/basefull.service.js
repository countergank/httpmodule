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
exports.BaseFullService = void 0;
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var fs_1 = require("fs");
var configuration_service_1 = require("../configuration.service");
var functions_1 = require("../functions");
var flex_service_1 = require("./flex.service");
var BaseFullService = (function (_super) {
    __extends(BaseFullService, _super);
    function BaseFullService(model, httpService, mockArray) {
        var _a;
        if (mockArray === void 0) { mockArray = []; }
        var _this = _super.call(this, model.dbname + "_" + model.tablename, httpService) || this;
        _this.model = model;
        _this.httpService = httpService;
        _this.mockArray = mockArray;
        _this._mockItems = [];
        _this.cacheEnabled = false;
        _this.cacheItems = [];
        _this._mockItems = Array.isArray(_this.mockArray) ? _this.mockArray : [];
        if (_this._testing) {
            if (_this._mockItems.length === 0) {
                (_a = _this._mockItems).push.apply(_a, _this.getMockInfo(model.tablename));
            }
            _this.debugLog("TESTING IS RUNNING", JSON.stringify({
                model: _this.model,
                lenmock: _this._mockItems.length,
            }), "W");
        }
        if ((0, configuration_service_1.configurationGet)("MOCK_GENERATE") === "1") {
            _this.generateMock();
        }
        return _this;
    }
    BaseFullService.prototype.configValue = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findOneFlex({ dbname: this.model.dbname, tablename: "config" }, { name: name })];
                    case 1:
                        item = _a.sent();
                        return [2, item === null || item === void 0 ? void 0 : item.value];
                }
            });
        });
    };
    BaseFullService.prototype.generateMock = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fileName) {
                            fileName = this.getMockFileName(this.model.tablename);
                        }
                        if (!!(0, fs_1.existsSync)(fileName)) return [3, 2];
                        (0, fs_1.writeFileSync)(fileName, "[]", "utf-8");
                        return [4, this.findAll({})];
                    case 1:
                        items = (_a.sent()).filter(function (_i, index) { return index < 10; });
                        (0, fs_1.writeFileSync)(fileName, JSON.stringify(items), "utf-8");
                        return [2, items];
                    case 2: return [2];
                }
            });
        });
    };
    BaseFullService.prototype.runCache = function (timeout) {
        var _this = this;
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var newItems;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        timeout = (0, functions_1.parseNumber)((0, configuration_service_1.configurationGet)("cache.".concat(this.model.tablename.toLowerCase())));
                        if (!(timeout > 0)) return [3, 2];
                        return [4, this.findAll({})];
                    case 1:
                        newItems = _b.sent();
                        this.debugLog("CACHE ENABLED", "Model: ".concat(JSON.stringify(this.model), ". Timeout: ").concat(timeout, ". Items: ").concat((0, functions_1.toArray)(newItems).length), "W");
                        if (Array.isArray(newItems)) {
                            this.cacheItems.splice(0, this.cacheItems.length);
                            (_a = this.cacheItems).push.apply(_a, newItems);
                            this.cacheEnabled = true;
                        }
                        return [3, 3];
                    case 2:
                        timeout = 10000;
                        this.cacheEnabled = false;
                        _b.label = 3;
                    case 3:
                        this.runCache(timeout);
                        return [2];
                }
            });
        }); }, timeout);
    };
    BaseFullService.prototype.max = function (fieldName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.cacheEnabled && !this._testing) {
                    return [2, this.maxFlex(this.model, fieldName, this.cacheItems)];
                }
                return [2, this.maxFlex(this.model, fieldName, this._mockItems)];
            });
        });
    };
    BaseFullService.prototype.count = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.cacheEnabled && !this._testing) {
                    return [2, this.countFlex(this.model, filter, this.cacheItems)];
                }
                return [2, this.countFlex(this.model, filter, this._mockItems)];
            });
        });
    };
    BaseFullService.prototype.findAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.cacheEnabled && !this._testing) {
                    return [2, this.findAllFlex(this.model, filter, this.cacheItems)];
                }
                return [2, this.findAllFlex(this.model, filter, this._mockItems)];
            });
        });
    };
    BaseFullService.prototype.aggregate = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.cacheEnabled && !this._testing) {
                    return [2, this.aggregateFlex(this.model, conditions, this.cacheItems)];
                }
                return [2, this.aggregateFlex(this.model, conditions, this._mockItems)];
            });
        });
    };
    BaseFullService.prototype.findOne = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.cacheEnabled && !this._testing) {
                    return [2, this.findOneFlex(this.model, filter, this.cacheItems)];
                }
                return [2, this.findOneFlex(this.model, filter, this._mockItems)];
            });
        });
    };
    BaseFullService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.cacheEnabled && !this._testing) {
                    return [2, this.findByIdFlex(this.model, id, this.cacheItems)];
                }
                return [2, this.findByIdFlex(this.model, id, this._mockItems)];
            });
        });
    };
    BaseFullService.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createFlex(this.model, item, this._mockItems)];
                    case 1:
                        newItem = _a.sent();
                        if (newItem && this.cacheEnabled && !this._testing) {
                            this.cacheItems.push(newItem);
                        }
                        return [2, newItem];
                }
            });
        });
    };
    BaseFullService.prototype.createMany = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var newItems;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.createManyFlex(this.model, items, this._mockItems)];
                    case 1:
                        newItems = _b.sent();
                        if (newItems && this.cacheEnabled && !this._testing) {
                            (_a = this.cacheItems).push.apply(_a, newItems);
                        }
                        return [2, newItems];
                }
            });
        });
    };
    BaseFullService.prototype.bulk = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.bulkFlex(this.model, items, this._mockItems)];
                    case 1:
                        res = _a.sent();
                        if (res && this.cacheEnabled && !this._testing) {
                            this.runCache();
                        }
                        return [2, res];
                }
            });
        });
    };
    BaseFullService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.deleteFlex(this.model, id, this._mockItems)];
                    case 1:
                        item = _a.sent();
                        if (item && this.cacheEnabled && !this._testing) {
                            this.cacheItems = this.cacheItems.filter(function (i) { return i._id !== id; });
                        }
                        return [2, item];
                }
            });
        });
    };
    BaseFullService.prototype.deleteMany = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var item, items_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.deleteManyFlex(this.model, condition, this._mockItems)];
                    case 1:
                        item = _a.sent();
                        if (item && this.cacheEnabled && !this._testing) {
                            items_1 = this.filterForTest(this.cacheItems, condition);
                            this.cacheItems = this.cacheItems.filter(function (i) { return !items_1.some(function (j) { return j._id === i._id; }); });
                        }
                        return [2, item];
                }
            });
        });
    };
    BaseFullService.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var newItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.updateFlex(this.model, id, item, this._mockItems)];
                    case 1:
                        newItem = _a.sent();
                        if (newItem && this.cacheEnabled && !this._testing) {
                            this.cacheItems = this.cacheItems
                                .filter(function (i) { return i._id !== id; })
                                .concat([newItem]);
                        }
                        return [2, newItem];
                }
            });
        });
    };
    BaseFullService.prototype.updateMany = function (item, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var newItems, items_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.updateManyFlex(this.model, item, condition, this._mockItems)];
                    case 1:
                        newItems = _a.sent();
                        if (newItems && this.cacheEnabled && !this._testing) {
                            items_2 = this.filterForTest(this.cacheItems, condition);
                            this.cacheItems = this.cacheItems
                                .filter(function (i) { return !items_2.some(function (j) { return j._id === i._id; }); })
                                .concat(newItems);
                        }
                        return [2, newItems];
                }
            });
        });
    };
    BaseFullService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [Object, axios_1.HttpService, Array])
    ], BaseFullService);
    return BaseFullService;
}(flex_service_1.FlexService));
exports.BaseFullService = BaseFullService;
exports.default = BaseFullService;
//# sourceMappingURL=basefull.service.js.map