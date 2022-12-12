"use strict";
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
exports.addfeatures = exports.MainModule = void 0;
var core_1 = require("@nestjs/core");
var swagger_1 = require("@nestjs/swagger");
var boolParser = require("express-query-boolean");
var helmet_1 = require("helmet");
var path = require("path");
var fs_1 = require("fs");
var configuration_service_1 = require("./configuration.service");
var MainModule = (function () {
    function MainModule() {
        MainModule.port = MainModule.normalizePort((0, configuration_service_1.configurationGet)("PORT"));
        MainModule.host = (0, configuration_service_1.configurationGet)("HOST");
        try {
            MainModule.isDev =
                (process.env.NODE_ENV || "development") === "development";
        }
        catch (error) {
            MainModule.isDev = true;
        }
        MainModule.URL = MainModule.host;
        if (MainModule.port !== 80 &&
            MainModule.port !== 443 &&
            !MainModule.URL.startsWith("https")) {
            MainModule.URL = MainModule.URL + ":" + MainModule.port;
        }
    }
    MainModule.normalizePort = function (param, defPort) {
        var portNumber = typeof param === "string" ? parseInt(param, 10) : param;
        if (!isNaN(portNumber) && portNumber >= 0) {
            return portNumber;
        }
        return defPort || 3000;
    };
    return MainModule;
}());
exports.MainModule = MainModule;
function create(appModule, appPath, config) {
    return __awaiter(this, void 0, void 0, function () {
        var app, hostDomain, pathPackageJson, info, options, swaggerDoc, testingPath, bodyParser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, core_1.NestFactory.create(appModule)];
                case 1:
                    app = _a.sent();
                    hostDomain = MainModule.URL;
                    pathPackageJson = appPath ? path.join(appPath, "../package.json") : "";
                    info = function () {
                        var resp;
                        try {
                            if (pathPackageJson) {
                                resp = JSON.parse((0, fs_1.readFileSync)(pathPackageJson, "utf-8"));
                            }
                        }
                        catch (error) {
                            resp = null;
                        }
                        return resp || {};
                    };
                    options = new swagger_1.DocumentBuilder()
                        .setTitle(info().name || "")
                        .setDescription(info().description || "")
                        .setVersion(info().version || "")
                        .setContact(info().author || "", info().homepage || "", info().email || "");
                    if (!(config === null || config === void 0 ? void 0 : config.excludeBearerToken)) {
                        options.addBearerAuth();
                    }
                    app.use((0, helmet_1.default)({
                        crossOriginEmbedderPolicy: false,
                    }));
                    app.use(helmet_1.default.referrerPolicy({ policy: "same-origin" }));
                    swaggerDoc = swagger_1.SwaggerModule.createDocument(app, options.build());
                    app.use("/api/docs/swagger.json", function (req, res) {
                        res.send(swaggerDoc);
                    });
                    swagger_1.SwaggerModule.setup("api/docs", app, swaggerDoc, {
                        swaggerUrl: "".concat(hostDomain, "/api/docs/swagger.json"),
                        explorer: true,
                        swaggerOptions: {
                            docExpansion: "list",
                            filter: true,
                            showRequestDuration: true,
                        },
                    });
                    testingPath = appPath ? path.join(appPath, "../test") : "";
                    if (!(config === null || config === void 0 ? void 0 : config.excludeTestFeatures) && testingPath) {
                        (0, exports.addfeatures)(swaggerDoc.paths, testingPath, config === null || config === void 0 ? void 0 : config.debug);
                    }
                    app.use(boolParser());
                    bodyParser = require("body-parser");
                    app.use(bodyParser.json({ limit: "100mb" }));
                    app.use(bodyParser.urlencoded({
                        limit: "100mb",
                        extended: true,
                        parameterLimit: 50000,
                    }));
                    app.enableCors();
                    return [4, app.listen(MainModule.port)];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
var addfeatures = function (paths, testingPath, debug) {
    var resp = [];
    resp.push("\nimport {[IMPORTS], FunctionTestApp}  from \"@countergank/http-module\";\n\nexport interface TestEndpoint {\n  name: string,\n  function: (done: any) => void,\n}\n\nexport const features = (onApp: FunctionTestApp): TestEndpoint[] => {\n  return [\n");
    var getParameters = function (key, _value) {
        var info = [];
        var getData = function (fkey, parameters) {
            var body = [];
            var queries = [];
            var variables = [];
            parameters
                .filter(function (i) { return ["path", "query"].indexOf(i.in) >= 0; })
                .forEach(function (item) {
                var type = item.type;
                var fvalue = "\"+_f".concat(item.name, "+\"");
                if (item.in === "path") {
                    fkey = fkey.replace("{".concat(item.name, "}"), fvalue);
                }
                else if (item.in === "query") {
                    queries.push("".concat(item.name, "=").concat(fvalue));
                }
                var value = type === "array"
                    ? "[]"
                    : type === "number"
                        ? "0"
                        : type === "boolean"
                            ? "false"
                            : "\"none\"";
                variables.push("const _f".concat(item.name, ": ").concat(type, " = ").concat(value, ";\n      "));
            });
            return {
                queries: queries,
                variables: variables,
                body: body,
                fkey: fkey,
            };
        };
        if (_value.post) {
            var data = getData(key, (_value.post.parameters || [])
                .filter(function (item) { return item.name; })
                .map(function (item) {
                var _a;
                return ({
                    type: ((_a = item.schema) === null || _a === void 0 ? void 0 : _a.type) || "any",
                    name: item.name,
                    in: item.in,
                });
            }));
            info.push({
                name: "/POST",
                url: data.fkey +
                    (data.queries.length > 0 ? "?" + data.queries.join("&") : ""),
                variables: data.variables.join(""),
                body: "{" + data.body.join("\r\n") + "}",
                method: "post",
            });
        }
        if (_value.put) {
            var data = getData(key, (_value.put.parameters || [])
                .filter(function (item) { return item.name; })
                .map(function (item) {
                var _a;
                return ({
                    type: ((_a = item.schema) === null || _a === void 0 ? void 0 : _a.type) || "any",
                    name: item.name,
                    in: item.in,
                });
            }));
            info.push({
                name: "/PUT",
                url: data.fkey +
                    (data.queries.length > 0 ? "?" + data.queries.join("&") : ""),
                variables: data.variables.join(""),
                body: "{" + data.body.join("\r\n") + "}",
                method: "put",
            });
        }
        if (_value.delete) {
            var data = getData(key, (_value.delete.parameters || [])
                .filter(function (item) { return item.name; })
                .map(function (item) {
                var _a;
                return ({
                    type: ((_a = item.schema) === null || _a === void 0 ? void 0 : _a.type) || "any",
                    name: item.name,
                    in: item.in,
                });
            }));
            info.push({
                name: "/DELETE",
                url: data.fkey +
                    (data.queries.length > 0 ? "?" + data.queries.join("&") : ""),
                variables: data.variables.join(""),
                body: "{" + data.body.join("\r\n") + "}",
                method: "delete",
            });
        }
        if (_value.get) {
            var data = getData(key, (_value.get.parameters || [])
                .filter(function (item) { return item.name; })
                .map(function (item) {
                var _a;
                return ({
                    type: ((_a = item.schema) === null || _a === void 0 ? void 0 : _a.type) || "any",
                    name: item.name,
                    in: item.in,
                });
            }));
            info.push({
                name: "/GET",
                url: data.fkey +
                    (data.queries.length > 0 ? "?" + data.queries.join("&") : ""),
                variables: data.variables.join(""),
                body: "{" + data.body.join("\r\n") + "}",
                method: "get",
            });
        }
        return info;
    };
    var functions = [];
    var _loop_1 = function (key, value) {
        var params = getParameters(key, value);
        params.forEach(function (item) {
            var funcName = "basic".concat(item.method);
            if (functions.indexOf(funcName) < 0) {
                functions.push(funcName);
            }
            resp.push("    {\n        name: \"".concat(item.name, " ").concat(key, "\",\n        function: (done) => {\n          ").concat(item.variables, "\n          ").concat(funcName, "(onApp, done, \"").concat(item.url, "\", ").concat(item.body, ");\n        }\n      },"));
        });
    };
    for (var _i = 0, _a = Object.entries(paths); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        _loop_1(key, value);
    }
    resp.push("\n  ];\n}\n  ");
    var dir = testingPath || path.join(__dirname, "../test");
    if (!(0, fs_1.existsSync)(dir)) {
        (0, fs_1.mkdirSync)(dir);
    }
    (0, fs_1.writeFileSync)(path.join(dir, "/features.ts"), resp.join("\r\n").replace("[IMPORTS]", functions.join(",")), "utf-8");
    if (debug) {
        (0, fs_1.writeFileSync)(path.join(dir, "/features.json"), JSON.stringify(paths), "utf-8");
    }
};
exports.addfeatures = addfeatures;
exports.default = create;
//# sourceMappingURL=http.creation.js.map