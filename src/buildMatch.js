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
  const mapArray = mapId.split('/');
  return mapArray[mapArray.length - 1];
}

function extractGameMode(mode) {
  const modeArray = mode.split('/');
  return modeArray[modeArray.length - 2].toLowerCase();
}

function buildMatch(matchData) {
  const {
    players, teams, roundResults, matchInfo,
  } = matchData;
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
    players,
    teams,
    roundResults,
  };
}

export default buildMatch;
