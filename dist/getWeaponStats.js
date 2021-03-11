"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _calcDistance = _interopRequireDefault(require("./utils/calcDistance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(kills) {
  var weaponStats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'subject';
  return kills.reduce(function (weaponStats, _ref) {
    var finishingDamage = _ref.finishingDamage,
        victimLocation = _ref.victimLocation,
        playerLocations = _ref.playerLocations,
        killer = _ref.killer;
    if (finishingDamage.damageType !== 'Weapon') return weaponStats;
    var isAltFire = finishingDamage.isSecondaryFireMode;
    var weapon = isAltFire ? "".concat(finishingDamage.damageItem, "_alt") : finishingDamage.damageItem;
    var player1pos = victimLocation;
    var player2 = playerLocations.find(function (p) {
      return p[type] === killer;
    });
    var player2pos;

    if (player2) {
      player2pos = player2.location;
    }

    var killRange = player1pos && player2pos ? (0, _calcDistance["default"])(player1pos, player2pos) : 0;

    if (!(weapon in weaponStats)) {
      weaponStats[weapon] = {
        kills: 1,
        totalRange: killRange
      };
    } else {
      weaponStats[weapon].kills += 1;
      weaponStats[weapon].totalRange += killRange;
    }

    return weaponStats;
  }, weaponStats);
};

exports["default"] = _default;