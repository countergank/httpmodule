"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBName = exports.configurationGet = void 0;
var config = require("config");
function configurationGet(name, def) {
    try {
        return (process.env[name] || config.get(name) || def || "").toString();
    }
    catch (error) {
        return def || "";
    }
}
exports.configurationGet = configurationGet;
var DBName;
(function (DBName) {
    DBName["UserManager"] = "UserManager";
})(DBName = exports.DBName || (exports.DBName = {}));
//# sourceMappingURL=configuration.service.js.map