import getDeathmatchPosition from './getDeathmatchPosition';

export default function getMatchOutcomeForTeam({
  players,
  playerTeam = {},
  teams = [],
  queue = '',
}) {
  if (queue === 'deathmatch') {
    const deathmatchPosition = getDeathmatchPosition({
      players,
      playerId: playerTeam.teamId,
    });

    if (deathmatchPosition / teams.length <= 0.5) {
      return 'win';
    }
    return 'loss';
  }
  const playerTeamID = playerTeam.teamId;
  const enemyTeam = teams.find((t) => t.teamId !== playerTeamID);

  const playerWon = playerTeam && playerTeam.won;
  const enemyWon = enemyTeam && enemyTeam.won;

  if (playerWon) {
    return 'win';
  } if (enemyWon) {
    return 'loss';
  }

  return 'tie';
}
