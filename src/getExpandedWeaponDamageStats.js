import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import buildObj from './utils/buildObj';
import getKillRange from './utils/getKillRange';
import KILL_RANGES from './constants/KILL_RANGES';

const weaponStats = {
  kills: 0,
  altFireKills: 0,
  headshots: 0,
  bodyshots: 0,
  legshots: 0,
  damage: 0,
  roundsUsed: 0,
};

function extractWepStats(wepStats, range, roundType, weaponId) {
  const stats = get(wepStats, [range, roundType, weaponId]);
  if (!stats) {
    buildObj(wepStats, [range, roundType, weaponId]);
    wepStats[range][roundType][weaponId] = cloneDeep(weaponStats);
  }
  return wepStats[range][roundType][weaponId];
}

/**
 *
 * @param kills
 * @param damage
 * @param economy
 * @param roundType
 * @param playerId
 * @param type
 * @returns {{}} Weapon damage stats object
 * @example Returns
  {
    short: {
      attacking: {
        [weaponId]: {
          kills: 0,
          altFireKills: 0,
          headshots: 0,
          bodyshots: 0,
          legshots: 0,
          damage: 0,
          roundsUsed: 0,
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
function getExpandedWeaponDamageStats(kills, damage, economy, roundType, playerId, type = 'subject') {
  const weaponDamageStats = {};
  if (!(damage && damage.length)) return weaponDamageStats;

  const roundStartWep = economy && economy.weapon;

  for (const playerDamage of damage) {
    const { headshots, bodyshots, legshots } = playerDamage;
    const totalShots = headshots + bodyshots + legshots;
    if (totalShots === 0) continue;

    const damageWasKillingBlow = kills.find(
      (k) => k.finishingDamage.damageType === 'Weapon'
        && k.victim === playerDamage.receiver,
    );
    const damageWep = damageWasKillingBlow
      ? damageWasKillingBlow.finishingDamage.damageItem
      : roundStartWep;

    let killRange = KILL_RANGES.UNKNOWN;
    if (damageWasKillingBlow) {
      killRange = getKillRange(damageWasKillingBlow, type);
    }
    const wepStats = extractWepStats(weaponDamageStats, killRange, roundType, damageWep);

    wepStats.headshots += playerDamage.headshots;
    wepStats.bodyshots += playerDamage.bodyshots;
    wepStats.legshots += playerDamage.legshots;
    wepStats.damage += playerDamage.damage;
    wepStats.roundsUsed += 1;

    if (damageWasKillingBlow) {
      wepStats.kills += 1;

      if (damageWasKillingBlow.finishingDamage.isSecondaryFireMode) {
        wepStats.altFireKills += 1;
      }
    }
  }

  return weaponDamageStats;
}

export default getExpandedWeaponDamageStats;
