"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getPlayerRankFromMatch(match, playerId, type) {
  var players = match.players;
  var player = players.find(function (p) {
    return p[type] === playerId;
  });
  return player === null || player === void 0 ? void 0 : player.competitiveTier;
}

var _default = getPlayerRankFromMatch;
exports["default"] = _default;