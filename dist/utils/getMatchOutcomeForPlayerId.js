"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMatchOutcomeForPlayerId;

var _getMatchOutcomeForTeam = _interopRequireDefault(require("./getMatchOutcomeForTeam"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getMatchOutcomeForPlayerId(match, playerId) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'subject';
  var players = match.players,
      teams = match.teams,
      queue = match.queue;
  var matchPlayers = players === null || players === void 0 ? void 0 : players.filter(function (p) {
    return p.teamId !== 'Neutral';
  });
  var matchPlayer = matchPlayers.find(function (p) {
    return p[type] === playerId;
  });
  if (!matchPlayer) return null;
  var playerTeam = teams === null || teams === void 0 ? void 0 : teams.find(function (t) {
    return t.teamId === matchPlayer.teamId;
  });
  if (!playerTeam) return null;
  return (0, _getMatchOutcomeForTeam["default"])({
    players: match.players,
    playerTeam: playerTeam,
    teams: teams,
    queue: queue
  });
}