export default (
  damage,
  damageStats = {
    damage: 0,
    headshots: 0,
    bodyshots: 0,
    legshots: 0,
  },
) => damage.reduce((result, {
  headshots, bodyshots, legshots, damage,
}) => {
  result.damage += damage;
  result.headshots += headshots;
  result.bodyshots += bodyshots;
  result.legshots += legshots;
  return result;
}, damageStats);
