import orderBy from 'lodash/orderBy';

const getKillsFromRoundResults = (roundResults = []) => {
  let kills = [];
  for (const { roundNum, playerStats } of roundResults) {
    const roundKills = playerStats.map(({ kills }) => kills).flat();
    kills = kills.concat(roundKills.map((kill) => ({
      round: roundNum,
      ...kill,
    })));
  }

  return orderBy(kills, 'gameTime', 'asc');
};

export default getKillsFromRoundResults;
