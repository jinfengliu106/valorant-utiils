"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getShotsFromMatch;

var _getWeaponDamageStats = _interopRequireDefault(require("./getWeaponDamageStats"));

var _getWeaponDamageHits = _interopRequireDefault(require("./getWeaponDamageHits"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getShotsFromMatch(match, playerId) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'subject';
  var result = {};
  var _match$roundResults = match.roundResults,
      roundResults = _match$roundResults === void 0 ? [] : _match$roundResults;

  var _iterator = _createForOfIteratorHelper(roundResults),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _round$playerStats;

      var round = _step.value;
      var playerRoundStats = (_round$playerStats = round.playerStats) === null || _round$playerStats === void 0 ? void 0 : _round$playerStats.find(function (x) {
        return x[type] === playerId;
      });

      if (playerRoundStats === null || playerRoundStats === void 0 ? void 0 : playerRoundStats.damage) {
        var _playerRoundStats$kil = playerRoundStats.kills,
            kills = _playerRoundStats$kil === void 0 ? [] : _playerRoundStats$kil,
            _playerRoundStats$dam = playerRoundStats.damage,
            damage = _playerRoundStats$dam === void 0 ? [] : _playerRoundStats$dam,
            _playerRoundStats$eco = playerRoundStats.economy,
            economy = _playerRoundStats$eco === void 0 ? [] : _playerRoundStats$eco;
        result = (0, _getWeaponDamageStats["default"])(kills, damage, economy, result, type);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return (0, _getWeaponDamageHits["default"])(result);
}