import { cloneDeep } from 'lodash';
import VALORANT_STATS from './VALORANT_STATS';

const VALORANT_STATS_WITH_AGENTS = {
  ...cloneDeep(VALORANT_STATS),
  agentsStats: {},
  mapStats: {},
};

export default VALORANT_STATS_WITH_AGENTS;
