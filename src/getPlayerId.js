import getTypeFromMatch from './getTypeFromMatch';

export default function getPlayerId(match, player) {
  const type = getTypeFromMatch(match);
  return player && player[type];
}
