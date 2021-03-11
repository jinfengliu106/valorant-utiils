import { orderBy } from 'lodash';

export default function getDeathmatchPosition({ players, playerId }) {
  const playerStats = players.map((p) => ({
    kills: (p.stats && p.stats.kills) || 0,
    score: (p.stats && p.stats.score) || 0,
    id: p.subject || p.puuid,
  }));
  return (
    orderBy(playerStats, ['kills', 'score'], ['desc', 'desc']).findIndex(
      (p) => p.id === playerId,
    ) + 1 || players.length
  );
}
