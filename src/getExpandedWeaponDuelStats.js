import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import getRoundAtkOrDef from './getRoundAtkOrDef';
import getKillRange from './utils/getKillRange';
import buildObj from './utils/buildObj';

const weaponDuelStats = {
  duelsWon: 0,
  duelsPlayed: 0,
  duelsLost: 0,
};

const DUEL_RESULT = {
  won: 'won',
  lost: 'lost',
};

const extractWeaponDuelStats = (duelStats, range, roundType, weaponId) => {
  const stats = get(duelStats, [range, roundType, weaponId]);
  if (!stats) {
    buildObj(duelStats, [range, roundType, weaponId]);
    duelStats[range][roundType][weaponId] = cloneDeep(weaponDuelStats);
  }
  return duelStats[range][roundType][weaponId];
};

const addDuelStats = (duelStats, range, roundType, weaponId, result) => {
  const killDuelStats = extractWeaponDuelStats(duelStats, range, roundType, weaponId);
  if (result === DUEL_RESULT.won) {
    killDuelStats.duelsWon += 1;
  } else {
    killDuelStats.duelsLost += 1;
  }
  killDuelStats.duelsPlayed += 1;
};

/**
 *
 * @param roundResults
 * @param mode
 * @param playerTeamId
 * @param playerId
 * @param type
 * @returns {{}} Weapon damage stats object
 * @example Returns
 {
    short: {
      attacking: {
        [weaponId]: {
          duelsWon: 0,
          duelsPlayed: 0,
          duelsLost: 0,
        },
      },
      defending: {},
    },
    medium: {
      attacking: {},
      defending: {},
    },
    long: {
      attacking: {},
      defending: {},
    },
  };
 */
const getExpandedWeaponDuelStats = (roundResults, mode, playerTeamId, playerId, type = 'subject') => {
  const duelStats = {};
  for (const { roundNum, playerStats: roundPlayersStats } of roundResults) {
    const roundType = getRoundAtkOrDef(mode, roundNum, playerTeamId);
    for (const roundPlayerStats of roundPlayersStats) {
      const { kills = [], economy } = roundPlayerStats;

      const roundStartWeapon = economy && economy.weapon;

      for (const kill of kills) {
        // not a duel
        if (kill.assistants && kill.assistants.length !== 0) continue;

        // Duel won
        if (kill.killer === playerId) {
          const weaponId = kill.finishingDamage.damageType === 'Weapon' ? kill.finishingDamage.damageItem : roundStartWeapon;
          const range = getKillRange(kill, type);
          addDuelStats(duelStats, range, roundType, weaponId, DUEL_RESULT.won);
        }

        // Duel lost
        if (kill.victim === playerId) {
          const weaponId = roundStartWeapon;
          const range = getKillRange(kill, type);
          addDuelStats(duelStats, range, roundType, weaponId, DUEL_RESULT.lost);
        }
      }
    }
  }

  return duelStats;
};

export default getExpandedWeaponDuelStats;
