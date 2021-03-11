"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _WEAPONS_EXCLUDED_FROM_HS = _interopRequireDefault(require("./constants/WEAPONS_EXCLUDED_FROM_HS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var filterWeaponDamageStats = function filterWeaponDamageStats(weaponDamageStats) {
  var filteredWeapons = Object.keys(weaponDamageStats).filter(function (weaponId) {
    return !_WEAPONS_EXCLUDED_FROM_HS["default"].includes(weaponId);
  });
  return filteredWeapons.map(function (weaponId) {
    return weaponDamageStats[weaponId];
  });
};

var getFilteredHeadshotsCount = function getFilteredHeadshotsCount(weaponDamageShots) {
  return filterWeaponDamageStats(weaponDamageShots).reduce(function (acc, val) {
    return acc + (val.headshots || 0);
  }, 0);
};

var _default = getFilteredHeadshotsCount;
exports["default"] = _default;