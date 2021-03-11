import calcDistance from './utils/calcDistance';
import getRoundAtkOrDef from './getRoundAtkOrDef';
import getKillsFromRoundResults from './getKillsFromRoundResults';

export default (match, playerId, type = 'subject') => {
  const {
    players,
    roundResults,
    teams,
    mode,
  } = match;

  const player = players.find((p) => p[type] === playerId);
  if (!player) return undefined;
  const { teamId } = player;
  if (teamId === 'neutral') return undefined;
  const playerTeam = teams.find((t) => t.teamId === teamId);

  const allDeaths = [];
  const kills = getKillsFromRoundResults(roundResults);
  if (kills && kills.length) {
    for (const {
      round, victim, victimLocation, killer, playerLocations,
    } of kills) {
      if (victim === playerId) {
        const playerDeathDetails = {
          round: null,
          deathLocation: null,
          killer: null,
          killerLocation: null,
          distanceFromKiller: null,
          roundAtkOrDef: null,
        };
        playerDeathDetails.round = round;
        playerDeathDetails.deathLocation = victimLocation;
        playerDeathDetails.killer = killer;
        const killerLocation = playerLocations.find((l) => l[type] === killer);
        if (killerLocation && killerLocation.location) {
          playerDeathDetails.killerLocation = killerLocation.location;
          playerDeathDetails.distanceFromKiller = calcDistance(
            victimLocation,
            killerLocation.location,
          );
        }
        playerDeathDetails.roundAtkOrDef = getRoundAtkOrDef(
          mode,
          round,
          playerTeam.teamId,
        );
        allDeaths.push(playerDeathDetails);
      }
    }
  }
  return allDeaths;
};
