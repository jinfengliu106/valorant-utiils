"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeathmatchPosition = getDeathmatchPosition;

var _lodash = require("lodash");

function getDeathmatchPosition(_ref) {
  var teams = _ref.teams,
      playerID = _ref.playerID;
  // Falls back to last place in the case it cant find the player for some reason
  return (0, _lodash.orderBy)(teams, 'numPoints', 'desc').findIndex(function (p) {
    return p.teamId === playerID;
  }) + 1 || teams.length;
}