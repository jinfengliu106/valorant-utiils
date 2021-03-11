import getMatchOutcomeForTeam from './getMatchOutcomeForTeam';

export default function getMatchOutcomeForPlayerId(match, playerId, type = 'subject') {
  const { players, teams, queue } = match;
  const matchPlayers = players?.filter((p) => p.teamId !== 'Neutral');

  const matchPlayer = matchPlayers.find((p) => p[type] === playerId);
  if (!matchPlayer) return null;

  const playerTeam = teams?.find((t) => t.teamId === matchPlayer.teamId);
  if (!playerTeam) return null;

  return getMatchOutcomeForTeam({
    players: match.players, playerTeam, teams, queue,
  });
}
