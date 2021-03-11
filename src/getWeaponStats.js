import calcDistance from './utils/calcDistance';

export default (kills, weaponStats = {}, type = 'subject') => kills.reduce(
  (
    weaponStats,
    {
      finishingDamage, victimLocation, playerLocations, killer,
    },
  ) => {
    if (finishingDamage.damageType !== 'Weapon') return weaponStats;

    const isAltFire = finishingDamage.isSecondaryFireMode;
    const weapon = isAltFire
      ? `${finishingDamage.damageItem}_alt`
      : finishingDamage.damageItem;
    const player1pos = victimLocation;
    const player2 = playerLocations.find((p) => p[type] === killer);
    let player2pos;
    if (player2) {
      player2pos = player2.location;
    }
    const killRange = player1pos && player2pos ? calcDistance(player1pos, player2pos) : 0;

    if (!(weapon in weaponStats)) {
      weaponStats[weapon] = {
        kills: 1,
        totalRange: killRange,
      };
    } else {
      weaponStats[weapon].kills += 1;
      weaponStats[weapon].totalRange += killRange;
    }
    return weaponStats;
  },
  weaponStats,
);
