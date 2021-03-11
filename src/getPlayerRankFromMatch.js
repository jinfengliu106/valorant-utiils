function getPlayerRankFromMatch(match, playerId, type) {
  const { players } = match;
  const player = players.find((p) => p[type] === playerId);
  return player?.competitiveTier;
}

export default getPlayerRankFromMatch;
