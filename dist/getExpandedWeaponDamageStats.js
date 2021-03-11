"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _get = _interopRequireDefault(require("lodash/get"));

var _buildObj = _interopRequireDefault(require("./utils/buildObj"));

var _getKillRange = _interopRequireDefault(require("./utils/getKillRange"));

var _KILL_RANGES = _interopRequireDefault(require("./constants/KILL_RANGES"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var weaponStats = {
  kills: 0,
  altFireKills: 0,
  headshots: 0,
  bodyshots: 0,
  legshots: 0,
  damage: 0,
  roundsUsed: 0
};

function extractWepStats(wepStats, range, roundType, weaponId) {
  var stats = (0, _get["default"])(wepStats, [range, roundType, weaponId]);

  if (!stats) {
    (0, _buildObj["default"])(wepStats, [range, roundType, weaponId]);
    wepStats[range][roundType][weaponId] = (0, _cloneDeep["default"])(weaponStats);
  }

  return wepStats[range][roundType][weaponId];
}
/**
 *
 * @param kills
 * @param damage
 * @param economy
 * @param roundType
 * @param playerId
 * @param type
 * @returns {{}} Weapon damage stats object
 * @example Returns
  {
    short: {
      attacking: {
        [weaponId]: {
          kills: 0,
          altFireKills: 0,
          headshots: 0,
          bodyshots: 0,
          legshots: 0,
          damage: 0,
          roundsUsed: 0,
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


function getExpandedWeaponDamageStats(kills, damage, economy, roundType, playerId) {
  var type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'subject';
  var weaponDamageStats = {};
  if (!(damage && damage.length)) return weaponDamageStats;
  var roundStartWep = economy && economy.weapon;

  var _iterator = _createForOfIteratorHelper(damage),
      _step;

  try {
    var _loop = function _loop() {
      var playerDamage = _step.value;
      var headshots = playerDamage.headshots,
          bodyshots = playerDamage.bodyshots,
          legshots = playerDamage.legshots;
      var totalShots = headshots + bodyshots + legshots;
      if (totalShots === 0) return "continue";
      var damageWasKillingBlow = kills.find(function (k) {
        return k.finishingDamage.damageType === 'Weapon' && k.victim === playerDamage.receiver;
      });
      var damageWep = damageWasKillingBlow ? damageWasKillingBlow.finishingDamage.damageItem : roundStartWep;
      var killRange = _KILL_RANGES["default"].UNKNOWN;

      if (damageWasKillingBlow) {
        killRange = (0, _getKillRange["default"])(damageWasKillingBlow, type);
      }

      var wepStats = extractWepStats(weaponDamageStats, killRange, roundType, damageWep);
      wepStats.headshots += playerDamage.headshots;
      wepStats.bodyshots += playerDamage.bodyshots;
      wepStats.legshots += playerDamage.legshots;
      wepStats.damage += playerDamage.damage;
      wepStats.roundsUsed += 1;

      if (damageWasKillingBlow) {
        wepStats.kills += 1;

        if (damageWasKillingBlow.finishingDamage.isSecondaryFireMode) {
          wepStats.altFireKills += 1;
        }
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return weaponDamageStats;
}

var _default = getExpandedWeaponDamageStats;
exports["default"] = _default;