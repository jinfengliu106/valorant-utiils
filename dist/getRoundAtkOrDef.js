"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(mode, roundNum, playerTeamColor) {
  var roundType = 'attacking';

  switch (mode) {
    case 'bomb':
      if (roundNum > 11 && playerTeamColor === 'Red' || roundNum <= 11 && playerTeamColor === 'Blue') {
        roundType = 'defending';
      }

      break;

    case 'quickbomb':
      if (roundNum > 2 && playerTeamColor === 'Red' || roundNum <= 2 && playerTeamColor === 'Blue') {
        roundType = 'defending';
      }

      break;

    default:
      break;
  }

  return roundType;
};

exports["default"] = _default;