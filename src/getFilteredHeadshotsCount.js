import WEAPONS_EXCLUDED_FROM_HS from './constants/WEAPONS_EXCLUDED_FROM_HS';

const filterWeaponDamageStats = (weaponDamageStats) => {
  const filteredWeapons = Object.keys(weaponDamageStats).filter(
    (weaponId) => !WEAPONS_EXCLUDED_FROM_HS.includes(weaponId),
  );

  return filteredWeapons.map((weaponId) => weaponDamageStats[weaponId]);
};

const getFilteredHeadshotsCount = (weaponDamageShots) => filterWeaponDamageStats(weaponDamageShots)
  .reduce(
    (acc, val) => acc + (val.headshots || 0),
    0,
  );

export default getFilteredHeadshotsCount;
