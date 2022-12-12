"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterClass = void 0;
var FilterClass = (function () {
    function FilterClass() {
        this.complex = false;
    }
    FilterClass.prototype.isComplex = function () {
        return this.complex;
    };
    FilterClass.prototype.analizeComplexFilter = function (filter, item) {
        var resp = false;
        for (var _i = 0, _a = Object.entries(filter); _i < _a.length; _i++) {
            var key = _a[_i][0];
            var value = item ? item[key] : undefined;
            if (Array.isArray(filter[key])) {
                if (key === "$nin") {
                    resp = filter[key].indexOf(item) < 0;
                }
                else {
                    resp = filter[key].indexOf(key === "$in" ? item : value) >= 0;
                }
            }
            else if (key === "$exists") {
                resp = item ? filter[key] : !filter[key];
            }
            else if (key === "$gt") {
                resp = item > filter[key];
            }
            else if (key === "$lt") {
                resp = item < filter[key];
            }
            else if (key === "$gte") {
                resp = item >= filter[key];
            }
            else if (key === "$lte") {
                resp = item <= filter[key];
            }
            else if (key === "$eq") {
                resp = item === filter[key];
            }
            else if (key === "$ne") {
                resp = item !== filter[key];
            }
            else if (key.startsWith("$")) {
                this.complex = true;
                resp = false;
            }
            else if (filter[key] instanceof Object) {
                resp = this.analizeComplexFilter(filter[key], value);
            }
            else {
                resp = filter[key] === value;
            }
            if (!resp) {
                break;
            }
        }
        if (this.complex) {
            return true;
        }
        return resp;
    };
    FilterClass.prototype.applyFilterOr = function (filters, item) {
        if (!item || !Array.isArray(filters)) {
            return false;
        }
        var resp = false;
        for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
            var filter = filters_1[_i];
            resp = this.applyFilter(filter, item, false);
            if (resp) {
                break;
            }
        }
        return resp;
    };
    FilterClass.prototype.apply = function (ffilter, item) {
        if (this.complex) {
            return true;
        }
        return this.applyFilter(ffilter, item);
    };
    FilterClass.prototype.applyFilter = function (ffilter, item, checkOr) {
        if (checkOr === void 0) { checkOr = true; }
        if (!item) {
            return false;
        }
        var resp = false;
        if (checkOr &&
            Array.isArray(ffilter === null || ffilter === void 0 ? void 0 : ffilter.$or) &&
            Object.keys(ffilter).length === 1) {
            return this.applyFilterOr(ffilter.$or, item);
        }
        for (var _i = 0, _a = Object.entries(ffilter); _i < _a.length; _i++) {
            var key = _a[_i][0];
            if (key === "$or") {
                var array = Array.isArray(ffilter[key]) ? ffilter[key] : [];
                for (var _b = 0, array_1 = array; _b < array_1.length; _b++) {
                    var itema = array_1[_b];
                    resp = this.apply(itema, item);
                    if (resp) {
                        break;
                    }
                }
            }
            else if (key.startsWith("$")) {
                this.complex = true;
                resp = false;
            }
            else if (Array.isArray(ffilter[key])) {
                resp = ffilter[key].indexOf(item[key]) >= 0;
            }
            else if (ffilter[key] instanceof Object) {
                resp = this.analizeComplexFilter(ffilter[key], item[key]);
            }
            else {
                resp = ffilter[key] === item[key];
            }
            if (!resp) {
                break;
            }
        }
        return resp;
    };
    return FilterClass;
}());
exports.FilterClass = FilterClass;
//# sourceMappingURL=filter-class.js.map