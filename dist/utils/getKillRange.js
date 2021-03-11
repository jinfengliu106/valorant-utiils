"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _calcDistance = _interopRequireDefault(require("./calcDistance"));

var _KILL_RANGES = _interopRequireDefault(require("../constants/KILL_RANGES"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getKillRange(kill) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'subject';
  var player1pos = kill.victimLocation;
  var player2 = kill.playerLocations.find(function (p) {
    return p[type] === kill.killer;
  });
  var player2pos = player2 && player2.location;

  if (player1pos && player2pos) {
    var distance = (0, _calcDistance["default"])(player1pos, player2pos);

    if (distance > 4000) {
      return _KILL_RANGES["default"].LONG;
    }

    if (distance > 2000) {
      return _KILL_RANGES["default"].MEDIUM;
    }

    if (distance > 0) {
      return _KILL_RANGES["default"].SHORT;
    }
  }

  return _KILL_RANGES["default"].UNKNOWN;
}

var _default = getKillRange;
exports["default"] = _default;