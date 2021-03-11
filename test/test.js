import { mkdirSync, writeFileSync } from 'fs';
import getPlayerStatsFromMatch from '../src/getPlayerStatsFromMatch';
import matchesData from './input/matches.json';

const matches = matchesData.data;

for (const match of matches) {
  const playerStats = getPlayerStatsFromMatch(match, '60857755-e4d2-520a-985c-17646022176d', null, 'subject');

  mkdirSync('./test/output', { recursive: true });
  writeFileSync(`./test/output/${match.id}.json`, JSON.stringify(playerStats));
}
