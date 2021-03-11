"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(mode, roundNum) {
  switch (mode) {
    case 'bomb':
      return roundNum === 0 || roundNum === 12;

    default:
      return false;
  }
};

exports["default"] = _default;