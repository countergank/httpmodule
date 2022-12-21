"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testIsRunning = exports.toString = exports.errorFn = exports.arraySorted = exports.completeText = exports.getValue = exports.emailIsValid = exports.parseNumber = exports.padLeadingZeros = exports.replaceAll = exports.formatDate = exports.ArrayComplexList = exports.ArrayList = exports.toArray = void 0;
function toArray(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    return array;
}
exports.toArray = toArray;
var ArrayList = (function () {
    function ArrayList(_excluded) {
        if (_excluded === void 0) { _excluded = ""; }
        this._excluded = _excluded;
        this._items = [];
    }
    ArrayList.prototype.concat = function (value) {
        return this._items.concat(value._items);
    };
    ArrayList.prototype.push = function (value) {
        if (value && value !== this._excluded && this._items.indexOf(value) < 0) {
            this._items.push(value);
        }
    };
    ArrayList.prototype.get = function () {
        return this._items;
    };
    ArrayList.prototype.count = function () {
        return this._items.length;
    };
    return ArrayList;
}());
exports.ArrayList = ArrayList;
var ArrayComplexList = (function () {
    function ArrayComplexList(_items) {
        if (_items === void 0) { _items = []; }
        this._items = _items;
    }
    ArrayComplexList.prototype.push = function (value, item) {
        var index = this._items.findIndex(function (i) { return i.id === value; });
        if (index < 0) {
            index = this._items.length;
            this._items.push({
                id: value,
                items: [],
            });
        }
        this._items[index].items.push(item);
    };
    ArrayComplexList.prototype.get = function () {
        return this._items;
    };
    ArrayComplexList.prototype.getItems = function (id) {
        var _a;
        return toArray((_a = this._items.find(function (i) { return i.id === id; })) === null || _a === void 0 ? void 0 : _a.items);
    };
    ArrayComplexList.prototype.count = function () {
        return this._items.length;
    };
    ArrayComplexList.prototype.countItems = function (id) {
        return this.getItems(id).length;
    };
    return ArrayComplexList;
}());
exports.ArrayComplexList = ArrayComplexList;
var formatDate = function (fecha, days, utc, separator) {
    if (days === void 0) { days = 0; }
    if (utc === void 0) { utc = false; }
    if (separator === void 0) { separator = "-"; }
    if (!fecha) {
        fecha = new Date();
    }
    if (days) {
        fecha.setDate(fecha.getDate() + days);
    }
    var m = (0, exports.completeText)(fecha.getMonth() + 1);
    var d = (0, exports.completeText)(fecha.getDate());
    var h = (0, exports.completeText)(fecha.getHours());
    var M = (0, exports.completeText)(fecha.getMinutes());
    var y = fecha.getFullYear().toString();
    var s = (0, exports.completeText)(fecha.getSeconds());
    var ml = (0, exports.completeText)(fecha.getMilliseconds(), 3);
    if (separator === "/") {
        return "".concat(d, "/").concat(m, "/").concat(y, " ").concat(h, ":").concat(M);
    }
    var res = "".concat(y, "-").concat(m, "-").concat(d);
    if (utc) {
        return "".concat(res, "T").concat(h, ":").concat(M, ":").concat(s, ".").concat(ml, "+0300");
    }
    return "".concat(res, " ").concat(h, ":").concat(M, ":").concat(s, ".").concat(ml);
};
exports.formatDate = formatDate;
var replaceAll = function (text, older, newer, replaceSpecialChars) {
    if (!text || !older || !newer || older.length !== newer.length) {
        return text;
    }
    for (var index = 0; index < older.length; index++) {
        var item = older[index];
        var control = 100;
        while (control > 0 && text.includes(item)) {
            text = text.replace(item, newer[index]);
            control--;
        }
    }
    var replaceChars = function () {
        if (!replaceSpecialChars) {
            return text;
        }
        return text
            .replace(/á/g, "&aacute;")
            .replace(/é/g, "&eacute;")
            .replace(/í/g, "&iacute;")
            .replace(/ó/g, "&oacute;")
            .replace(/ú/g, "&uacute;")
            .replace(/ñ/g, "&ntilde;")
            .replace(/Á/g, "A")
            .replace(/É/g, "E")
            .replace(/Í/g, "I")
            .replace(/Ó/g, "O")
            .replace(/Ú/g, "U")
            .replace(/Ñ/g, "&Ntilde;");
    };
    return replaceChars();
};
exports.replaceAll = replaceAll;
var padLeadingZeros = function (num, size) {
    if (size === void 0) { size = 8; }
    var str = (0, exports.toString)(num) + "";
    while (str.length < size) {
        str = "0" + str;
    }
    return str;
};
exports.padLeadingZeros = padLeadingZeros;
var parseNumber = function (value, def) {
    if (def === void 0) { def = 0; }
    try {
        var fvalue = value.toString();
        var neg = fvalue.startsWith("-") ? -1 : 1;
        if (fvalue.includes(",") && fvalue.includes(".")) {
            if (fvalue.lastIndexOf(",") > fvalue.lastIndexOf(".")) {
                fvalue = (0, exports.replaceAll)(fvalue, ["."], ["|"]);
                fvalue = (0, exports.replaceAll)(fvalue, [","], ["."]);
                fvalue = (0, exports.replaceAll)(fvalue, ["|"], [""]);
            }
            else {
                fvalue = (0, exports.replaceAll)(fvalue, [","], [""]);
            }
        }
        var parts = (0, exports.replaceAll)((0, exports.replaceAll)(fvalue, ["-"], [""]), [","], ["."]).split(".");
        if (parts.length > 2 || parts.length === 0) {
            return def;
        }
        var resp = [];
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            if (parseInt(part, 0) >= 0) {
                resp.push(parseInt(part, 0));
            }
            else {
                return def;
            }
        }
        var fnumber = parseFloat(resp.join("."));
        if (fnumber === 0) {
            return fnumber;
        }
        return fnumber * neg;
    }
    catch (error) {
        return def;
    }
};
exports.parseNumber = parseNumber;
var emailIsValid = function (value) {
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(value)) {
        return false;
    }
    return true;
};
exports.emailIsValid = emailIsValid;
var getValue = function (item, names, def) {
    if (def === void 0) { def = ""; }
    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
        var name_1 = names_1[_i];
        var resp = item[name_1];
        if (resp) {
            return resp;
        }
    }
    return def;
};
exports.getValue = getValue;
var completeText = function (value, size) {
    if (size === void 0) { size = 2; }
    var resp = value.toString();
    while (resp.length < size) {
        resp = "0".concat(resp);
    }
    return resp;
};
exports.completeText = completeText;
var arraySorted = function (array, fieldName, desc) {
    var _a;
    var newArray = __spreadArray([], array, true);
    var OK = -1;
    var notOK = 1;
    if (desc) {
        _a = [notOK, OK], OK = _a[0], notOK = _a[1];
    }
    return newArray.sort(function (a, b) { return (a[fieldName] < b[fieldName] ? OK : notOK); });
};
exports.arraySorted = arraySorted;
var errorFn = function (_error) {
    return;
};
exports.errorFn = errorFn;
var toString = function (value, def) {
    if (def === void 0) { def = ""; }
    try {
        return (value || def || "").toString();
    }
    catch (error) {
        return "";
    }
};
exports.toString = toString;
var testIsRunning = function () {
    return process.env.NODE_ENV === "development";
};
exports.testIsRunning = testIsRunning;
//# sourceMappingURL=functions.js.map