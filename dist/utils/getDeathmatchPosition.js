"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getDeathmatchPosition;

var _lodash = require("lodash");

function getDeathmatchPosition(_ref) {
  var players = _ref.players,
      playerId = _ref.playerId;
  var playerStats = players.map(function (p) {
    return {
      kills: p.stats && p.stats.kills || 0,
      score: p.stats && p.stats.score || 0,
      id: p.subject || p.puuid
    };
  });
  return (0, _lodash.orderBy)(playerStats, ['kills', 'score'], ['desc', 'desc']).findIndex(function (p) {
    return p.id === playerId;
  }) + 1 || players.length;
}