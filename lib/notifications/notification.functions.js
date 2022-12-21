"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUnknownFileds = exports.buildTemplate = exports.bodyQueueIsOk = exports.bodyIsOk = exports.convertInterfaceToArrayNameValue = void 0;
var functions_1 = require("../functions");
var convertInterfaceToArrayNameValue = function (data) {
    if (!data) {
        return [];
    }
    try {
        var resp = [];
        for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
            var key = _a[_i][0];
            resp.push({
                name: key,
                value: data[key],
            });
        }
        return resp;
    }
    catch (error) {
        return [];
    }
};
exports.convertInterfaceToArrayNameValue = convertInterfaceToArrayNameValue;
var bodyIsOk = function (body) {
    var infoOk = (body === null || body === void 0 ? void 0 : body.rawHTML) || (Array.isArray(body.info) && body.info.length > 0);
    if (!(body === null || body === void 0 ? void 0 : body.key) ||
        !infoOk ||
        !Array.isArray(body.target) ||
        body.target.length === 0) {
        return false;
    }
    return true;
};
exports.bodyIsOk = bodyIsOk;
var bodyQueueIsOk = function (body) {
    if (!body || !body.email || !body.content) {
        return false;
    }
    return true;
};
exports.bodyQueueIsOk = bodyQueueIsOk;
var buildTemplate = function (contentHTML, title, info) {
    var content = contentHTML;
    if (!content || content === "") {
        return {
            content: "",
            title: title,
        };
    }
    var trashComments = [];
    var getTemplateTable = function (prefix, text) {
        var beginStr = "<!-- BEGIN " + prefix.toUpperCase() + " -->";
        var endStr = "<!-- END " + prefix.toUpperCase() + " -->";
        var indexBegin = text.indexOf(beginStr, 0);
        var indexEnd = text.indexOf(endStr, 0);
        trashComments.push(beginStr);
        trashComments.push(endStr);
        var aux = (0, functions_1.replaceAll)(text, [beginStr, endStr], ["", ""], true);
        if (indexBegin && indexEnd && indexBegin > 0 && indexBegin < indexEnd) {
            return {
                content: aux,
                subcontent: text.substr(indexBegin + beginStr.length, indexEnd - indexBegin),
            };
        }
        return {
            content: aux,
            subcontent: "",
        };
    };
    var simpleFileNames = [];
    for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
        var item = info_1[_i];
        if (!(item === null || item === void 0 ? void 0 : item.name)) {
            continue;
        }
        if (Array.isArray(item.value)) {
            var subItem = getTemplateTable(item.name, content);
            if (subItem.subcontent !== "") {
                var fullTemplate = "";
                for (var _a = 0, _b = item.value; _a < _b.length; _a++) {
                    var subitem = _b[_a];
                    var bufferText = subItem.subcontent;
                    for (var _c = 0, _d = Object.entries(subitem); _c < _d.length; _c++) {
                        var key = _d[_c][0];
                        bufferText = (0, functions_1.replaceAll)(bufferText, ["{{".concat(key.toUpperCase(), "}}")], [subitem[key] || ""], true);
                    }
                    fullTemplate += bufferText;
                }
                content = (0, functions_1.replaceAll)(content, [subItem.subcontent], [fullTemplate], true);
            }
            else {
                content = subItem.content;
            }
        }
        else {
            simpleFileNames.push(item);
        }
    }
    for (var _e = 0, simpleFileNames_1 = simpleFileNames; _e < simpleFileNames_1.length; _e++) {
        var item = simpleFileNames_1[_e];
        title = (0, functions_1.replaceAll)(title, ["{{".concat(item.name.toUpperCase(), "}}")], [item.value || ""], true);
        content = (0, functions_1.replaceAll)(content, ["{{".concat(item.name.toUpperCase(), "}}")], [item.value || ""], true);
    }
    for (var _f = 0, trashComments_1 = trashComments; _f < trashComments_1.length; _f++) {
        var comment = trashComments_1[_f];
        title = (0, functions_1.replaceAll)(title, [comment], [""], true);
        content = (0, functions_1.replaceAll)(content, [comment], [""], true);
    }
    return {
        content: (0, exports.removeUnknownFileds)(content),
        title: (0, exports.removeUnknownFileds)(title),
    };
};
exports.buildTemplate = buildTemplate;
var removeUnknownFileds = function (content) {
    var beginStr = "{{";
    var endStr = "}}";
    var indexBegin = content.indexOf(beginStr, 0);
    var indexEnd = content.indexOf(endStr, 0);
    var control = 1000;
    while (control > 0 &&
        indexBegin &&
        indexEnd &&
        indexBegin > 0 &&
        indexBegin < indexEnd) {
        var aux = content.substr(indexBegin, indexEnd - indexBegin + beginStr.length);
        content = content.replace(aux, "");
        indexBegin = content.indexOf(beginStr, 0);
        indexEnd = content.indexOf(endStr, 0);
        control--;
    }
    return content;
};
exports.removeUnknownFileds = removeUnknownFileds;
//# sourceMappingURL=notification.functions.js.map