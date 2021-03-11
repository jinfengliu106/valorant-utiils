"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function codenameToMap(codename) {
  switch (codename.toLowerCase()) {
    case '/game/maps/triad/bonsai':
    case '/game/maps/triad/split':
    case 'bonsai':
    case 'split':
      return 'split';

    case '/game/maps/triad/duality':
    case '/game/maps/triad/bind':
    case 'duality':
    case 'bind':
      return 'bind';

    case '/game/maps/triad/port':
    case '/game/maps/triad/icebox':
    case 'icebox':
    case 'port':
      return 'port';

    default:
      return codename.toLowerCase();
  }
}

function extractCodenameFromMapId(mapId) {
  var mapArray = mapId.split('/');
  return mapArray[mapArray.length - 1];
}

function extractGameMode(mode) {
  var modeArray = mode.split('/');
  return modeArray[modeArray.length - 2].toLowerCase();
}

function buildMatch(matchData) {
  var players = matchData.players,
      teams = matchData.teams,
      roundResults = matchData.roundResults,
      matchInfo = matchData.matchInfo;
  return {
    id: matchInfo.matchId,
    map: codenameToMap(extractCodenameFromMapId(matchInfo.mapId)),
    mode: extractGameMode(matchInfo.gameMode),
    ranked: matchInfo.isRanked,
    startedAt: matchInfo.gameStartMillis,
    length: matchInfo.gameLengthMillis,
    queue: matchInfo.queueID || matchInfo.queueId,
    season: matchInfo.seasonId,
    version: matchInfo.gameVersion,
    players: players,
    teams: teams,
    roundResults: roundResults
  };
}

var _default = buildMatch;
exports["default"] = _default;