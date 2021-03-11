import getWeaponDamageStats from './getWeaponDamageStats';
import getWeaponDamageHits from './getWeaponDamageHits';

export default function getShotsFromMatch(
  match,
  playerId,
  type = 'subject',
) {
  let result = {};
  const { roundResults = [] } = match;
  for (const round of roundResults) {
    const playerRoundStats = round.playerStats?.find((x) => x[type] === playerId);
    if (playerRoundStats?.damage) {
      const { kills = [], damage = [], economy = [] } = playerRoundStats;
      result = getWeaponDamageStats(kills, damage, economy, result, type);
    }
  }

  return getWeaponDamageHits(result);
}
