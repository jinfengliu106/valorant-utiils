"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _get = _interopRequireDefault(require("lodash/get"));

var _getRoundAtkOrDef = _interopRequireDefault(require("./getRoundAtkOrDef"));

var _getKillRange = _interopRequireDefault(require("./utils/getKillRange"));

var _buildObj = _interopRequireDefault(require("./utils/buildObj"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var weaponDuelStats = {
  duelsWon: 0,
  duelsPlayed: 0,
  duelsLost: 0
};
var DUEL_RESULT = {
  won: 'won',
  lost: 'lost'
};

var extractWeaponDuelStats = function extractWeaponDuelStats(duelStats, range, roundType, weaponId) {
  var stats = (0, _get["default"])(duelStats, [range, roundType, weaponId]);

  if (!stats) {
    (0, _buildObj["default"])(duelStats, [range, roundType, weaponId]);
    duelStats[range][roundType][weaponId] = (0, _cloneDeep["default"])(weaponDuelStats);
  }

  return duelStats[range][roundType][weaponId];
};

var addDuelStats = function addDuelStats(duelStats, range, roundType, weaponId, result) {
  var killDuelStats = extractWeaponDuelStats(duelStats, range, roundType, weaponId);

  if (result === DUEL_RESULT.won) {
    killDuelStats.duelsWon += 1;
  } else {
    killDuelStats.duelsLost += 1;
  }

  killDuelStats.duelsPlayed += 1;
};
/**
 *
 * @param roundResults
 * @param mode
 * @param playerTeamId
 * @param playerId
 * @param type
 * @returns {{}} Weapon damage stats object
 * @example Returns
 {
    short: {
      attacking: {
        [weaponId]: {
          duelsWon: 0,
          duelsPlayed: 0,
          duelsLost: 0,
        },
      },
      defending: {},
    },
    medium: {
      attacking: {},
      defending: {},
    },
    long: {
      attacking: {},
      defending: {},
    },
  };
 */


var getExpandedWeaponDuelStats = function getExpandedWeaponDuelStats(roundResults, mode, playerTeamId, playerId) {
  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'subject';
  var duelStats = {};

  var _iterator = _createForOfIteratorHelper(roundResults),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
          roundNum = _step$value.roundNum,
          roundPlayersStats = _step$value.playerStats;
      var roundType = (0, _getRoundAtkOrDef["default"])(mode, roundNum, playerTeamId);

      var _iterator2 = _createForOfIteratorHelper(roundPlayersStats),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var roundPlayerStats = _step2.value;
          var _roundPlayerStats$kil = roundPlayerStats.kills,
              kills = _roundPlayerStats$kil === void 0 ? [] : _roundPlayerStats$kil,
              economy = roundPlayerStats.economy;
          var roundStartWeapon = economy && economy.weapon;

          var _iterator3 = _createForOfIteratorHelper(kills),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var kill = _step3.value;
              // not a duel
              if (kill.assistants && kill.assistants.length !== 0) continue; // Duel won

              if (kill.killer === playerId) {
                var weaponId = kill.finishingDamage.damageType === 'Weapon' ? kill.finishingDamage.damageItem : roundStartWeapon;
                var range = (0, _getKillRange["default"])(kill, type);
                addDuelStats(duelStats, range, roundType, weaponId, DUEL_RESULT.won);
              } // Duel lost


              if (kill.victim === playerId) {
                var _weaponId = roundStartWeapon;

                var _range = (0, _getKillRange["default"])(kill, type);

                addDuelStats(duelStats, _range, roundType, _weaponId, DUEL_RESULT.lost);
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return duelStats;
};

var _default = getExpandedWeaponDuelStats;
exports["default"] = _default;