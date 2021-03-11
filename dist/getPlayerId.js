"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getPlayerId;

var _getTypeFromMatch = _interopRequireDefault(require("./getTypeFromMatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getPlayerId(match, player) {
  var type = (0, _getTypeFromMatch["default"])(match);
  return player && player[type];
}