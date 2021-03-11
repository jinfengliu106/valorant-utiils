"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(damage) {
  var damageStats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    damage: 0,
    headshots: 0,
    bodyshots: 0,
    legshots: 0
  };
  return damage.reduce(function (result, _ref) {
    var headshots = _ref.headshots,
        bodyshots = _ref.bodyshots,
        legshots = _ref.legshots,
        damage = _ref.damage;
    result.damage += damage;
    result.headshots += headshots;
    result.bodyshots += bodyshots;
    result.legshots += legshots;
    return result;
  }, damageStats);
};

exports["default"] = _default;