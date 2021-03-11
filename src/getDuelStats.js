function getDuelStats(roundResults, playerId) {
  const duelStats = {
    duelsPlayed: 0,
    duelsWon: 0,
    duelsLost: 0,
  };
  for (const { playerStats: roundPlayersStats } of roundResults) {
    for (const roundPlayerStats of roundPlayersStats) {
      const { kills = [] } = roundPlayerStats;
      const duelsWon = kills.filter((kill) => kill.killer === playerId
        && (!kill.assistants || kill.assistants.length === 0));
      const duelsLost = kills.filter((kill) => kill.victim === playerId
        && (!kill.assistants || kill.assistants.length === 0));
      duelStats.duelsWon += duelsWon.length;
      duelStats.duelsLost += duelsLost.length;
      duelStats.duelsPlayed += (duelsWon.length + duelsLost.length);
    }
  }

  return duelStats;
}

export default getDuelStats;
