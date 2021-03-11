"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMatchOutcomeForTeam;

var _getDeathmatchPosition = _interopRequireDefault(require("./getDeathmatchPosition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getMatchOutcomeForTeam(_ref) {
  var players = _ref.players,
      _ref$playerTeam = _ref.playerTeam,
      playerTeam = _ref$playerTeam === void 0 ? {} : _ref$playerTeam,
      _ref$teams = _ref.teams,
      teams = _ref$teams === void 0 ? [] : _ref$teams,
      _ref$queue = _ref.queue,
      queue = _ref$queue === void 0 ? '' : _ref$queue;

  if (queue === 'deathmatch') {
    var deathmatchPosition = (0, _getDeathmatchPosition["default"])({
      players: players,
      playerId: playerTeam.teamId
    });

    if (deathmatchPosition / teams.length <= 0.5) {
      return 'win';
    }

    return 'loss';
  }

  var playerTeamID = playerTeam.teamId;
  var enemyTeam = teams.find(function (t) {
    return t.teamId !== playerTeamID;
  });
  var playerWon = playerTeam && playerTeam.won;
  var enemyWon = enemyTeam && enemyTeam.won;

  if (playerWon) {
    return 'win';
  }

  if (enemyWon) {
    return 'loss';
  }

  return 'tie';
}