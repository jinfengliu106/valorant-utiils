import NON_HEADSHOT_WEPS from './constants/NON_HEADSHOT_WEPS';

const getWeaponDamageHits = (weaponDamageStats) => {
  const hits = {
    headshots: 0,
    bodyshots: 0,
    legshots: 0,
  };

  if (!weaponDamageStats) return hits;

  const weapons = Object.entries(weaponDamageStats);

  for (const weapon of weapons) {
    const [wedId, wepStats] = weapon;

    if (!NON_HEADSHOT_WEPS[wedId]) {
      hits.headshots += wepStats.headshots || 0;
      hits.bodyshots += wepStats.bodyshots || 0;
      hits.legshots += wepStats.legshots || 0;
    }
  }

  return hits;
};

export default getWeaponDamageHits;
