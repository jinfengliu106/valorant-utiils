"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _calcDistance = _interopRequireDefault(require("./utils/calcDistance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(kills, damage, economy) {
  var weaponDamageStats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'subject';
  var roundStartWep = economy && economy.weapon;
  var wepStats;

  if (damage && damage.length) {
    var _iterator = _createForOfIteratorHelper(damage),
        _step;

    try {
      var _loop = function _loop() {
        var playerDamage = _step.value;
        // Find if any round kills contain the reciever of damage
        var damageWasKillingBlow = kills.find(function (k) {
          return k.finishingDamage.damageType === 'Weapon' && k.victim === playerDamage.receiver;
        }); // If the damage killed someone, use the the killing blow wep
        // If not, use the weapon purchased at round start

        var damageWep = damageWasKillingBlow ? damageWasKillingBlow.finishingDamage.damageItem : roundStartWep;

        if (weaponDamageStats && weaponDamageStats[damageWep]) {
          wepStats = weaponDamageStats[damageWep];
        } else {
          wepStats = {
            kills: 0,
            totalKillRange: 0,
            altFireKills: 0,
            headshots: 0,
            bodyshots: 0,
            legshots: 0,
            damage: 0,
            roundsUsed: 0
          };
        }

        var headshots = playerDamage.headshots,
            bodyshots = playerDamage.bodyshots,
            legshots = playerDamage.legshots; // Only add stats if hits occur

        if (headshots + bodyshots + legshots > 0) {
          if (damageWasKillingBlow) {
            wepStats.kills += 1; // Increment alt fire kills

            if (damageWasKillingBlow.finishingDamage.isSecondaryFireMode) {
              wepStats.altFireKills += 1;
            } // Increment kill range


            var player1pos = damageWasKillingBlow.victimLocation;
            var player2 = damageWasKillingBlow.playerLocations.find(function (p) {
              return p[type] === damageWasKillingBlow.killer;
            });
            var player2pos = player2 && player2.location;

            if (player1pos && player2pos) {
              wepStats.totalKillRange += (0, _calcDistance["default"])(player1pos, player2pos);
            }
          }

          wepStats.headshots += playerDamage.headshots;
          wepStats.bodyshots += playerDamage.bodyshots;
          wepStats.legshots += playerDamage.legshots;
          wepStats.damage += playerDamage.damage;
          wepStats.roundsUsed += 1;
          weaponDamageStats[damageWep] = wepStats;
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return weaponDamageStats;
};

exports["default"] = _default;