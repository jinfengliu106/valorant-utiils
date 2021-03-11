"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// object must contain either numeric values or other objects
// multiplies all numeric values by -1
// mutates the input object
var negateValues = function negateValues(object) {
  Object.keys(object).forEach(function (key) {
    if (_typeof(object[key]) === 'object') {
      negateValues(object[key]);
    } else {
      // eslint-disable-next-line no-param-reassign
      object[key] *= -1;
    }
  });
};

var _default = negateValues;
exports["default"] = _default;