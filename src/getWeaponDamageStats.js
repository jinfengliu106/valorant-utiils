import calcDistance from './utils/calcDistance';

export default (kills, damage, economy, weaponDamageStats = {}, type = 'subject') => {
  const roundStartWep = economy && economy.weapon;
  let wepStats;

  if (damage && damage.length) {
    for (const playerDamage of damage) {
      // Find if any round kills contain the reciever of damage
      const damageWasKillingBlow = kills.find(
        (k) => k.finishingDamage.damageType === 'Weapon'
          && k.victim === playerDamage.receiver,
      );

      // If the damage killed someone, use the the killing blow wep
      // If not, use the weapon purchased at round start
      const damageWep = damageWasKillingBlow
        ? damageWasKillingBlow.finishingDamage.damageItem
        : roundStartWep;

      if (weaponDamageStats && weaponDamageStats[damageWep]) {
        wepStats = weaponDamageStats[damageWep];
      } else {
        wepStats = {
          kills: 0,
          totalKillRange: 0,
          altFireKills: 0,
          headshots: 0,
          bodyshots: 0,
          legshots: 0,
          damage: 0,
          roundsUsed: 0,
        };
      }

      const { headshots, bodyshots, legshots } = playerDamage;

      // Only add stats if hits occur
      if (headshots + bodyshots + legshots > 0) {
        if (damageWasKillingBlow) {
          wepStats.kills += 1;

          // Increment alt fire kills
          if (damageWasKillingBlow.finishingDamage.isSecondaryFireMode) {
            wepStats.altFireKills += 1;
          }

          // Increment kill range
          const player1pos = damageWasKillingBlow.victimLocation;
          const player2 = damageWasKillingBlow.playerLocations.find(
            (p) => p[type] === damageWasKillingBlow.killer,
          );
          const player2pos = player2 && player2.location;

          if (player1pos && player2pos) {
            wepStats.totalKillRange += calcDistance(player1pos, player2pos);
          }
        }
        wepStats.headshots += playerDamage.headshots;
        wepStats.bodyshots += playerDamage.bodyshots;
        wepStats.legshots += playerDamage.legshots;
        wepStats.damage += playerDamage.damage;
        wepStats.roundsUsed += 1;

        weaponDamageStats[damageWep] = wepStats;
      }
    }
  }

  return weaponDamageStats;
};
