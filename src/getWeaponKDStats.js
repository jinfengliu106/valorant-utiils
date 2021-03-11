import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import buildObj from './utils/buildObj';

const weaponKDStats = {
  kills: 0,
  deaths: 0,
};

const extractWeaponKDStats = (kdStats, weaponId) => {
  const stats = get(kdStats, [weaponId]);
  if (!stats) {
    buildObj(kdStats, [weaponId]);
    kdStats[weaponId] = cloneDeep(weaponKDStats);
  }
  return kdStats[weaponId];
};

/**
 *
 * @param roundResults
 * @param playerId
 * @returns {{}} Weapon kd stats object
 * @example Returns
 {
    kills: 0,
    deaths: 0,
  };
 */
const getWeaponKDStats = (roundResults, playerId) => {
  const kdStats = {};
  for (const { playerStats: roundPlayersStats } of roundResults) {
    for (const roundPlayerStats of roundPlayersStats) {
      const { kills = [], economy } = roundPlayerStats;

      const roundStartWeapon = economy && economy.weapon;

      for (const kill of kills) {
        if (kill.killer === playerId) {
          const weaponId = kill.finishingDamage.damageType === 'Weapon' ? kill.finishingDamage.damageItem : roundStartWeapon;
          const stats = extractWeaponKDStats(kdStats, weaponId);
          stats.kills += 1;
        }

        if (kill.victim === playerId) {
          const weaponId = roundStartWeapon;
          const stats = extractWeaponKDStats(kdStats, weaponId);
          stats.deaths += 1;
        }
      }
    }
  }

  return kdStats;
};

export default getWeaponKDStats;
