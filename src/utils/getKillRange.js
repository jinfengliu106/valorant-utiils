import calcDistance from './calcDistance';
import KILL_RANGES from '../constants/KILL_RANGES';

function getKillRange(kill, type = 'subject') {
  const player1pos = kill.victimLocation;
  const player2 = kill.playerLocations.find(
    (p) => p[type] === kill.killer,
  );
  const player2pos = player2 && player2.location;
  if (player1pos && player2pos) {
    const distance = calcDistance(player1pos, player2pos);

    if (distance > 4000) {
      return KILL_RANGES.LONG;
    }
    if (distance > 2000) {
      return KILL_RANGES.MEDIUM;
    }
    if (distance > 0) {
      return KILL_RANGES.SHORT;
    }
  }

  return KILL_RANGES.UNKNOWN;
}

export default getKillRange;
