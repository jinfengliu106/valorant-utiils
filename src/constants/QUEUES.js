const QUEUES = {
  competitive: {
    key: 'competitive',
    name: 'Competitive',
    queue: 'competitive',
    modes: ['bomb'],
  },
  deathmatch: {
    key: 'deathmatch',
    name: 'Deathmatch',
    queue: 'deathmatch',
    modes: ['deathmatch'],
  },
  unrated: {
    key: 'unrated',
    name: 'Unrated',
    queue: 'unrated',
    modes: ['bomb'],
  },
  snowball: {
    key: 'snowball',
    name: 'Snowball Fight',
    queue: 'snowball',
    modes: ['snowballfight'],
  },
  spikerush: {
    key: 'spikerush',
    name: 'Spike Rush',
    queue: 'spikerush',
    modes: ['quickbomb'],
  },
  custom: {
    key: 'custom',
    name: 'Custom',
    queue: '',
    modes: ['bomb', 'quickbomb', 'deathmatch'],
  },
  escalation: {
    key: 'ggteam',
    name: 'Escalation',
    queue: 'ggteam',
    modes: ['gungame'],
  },
};

const QUEUES_FOR_ALL_STATS = [
  QUEUES.competitive.queue,
  QUEUES.unrated.queue,
  QUEUES.spikerush.queue,
  QUEUES.custom.key, // TODO: change this queue later
];
const OTHER_QUEUES = [QUEUES.deathmatch.queue, QUEUES.snowball.queue, QUEUES.escalation.queue];
const ALL_QUEUES = [...QUEUES_FOR_ALL_STATS, ...OTHER_QUEUES];
const ALL_QUEUES_ALLOW_EMPTY = [...ALL_QUEUES, ''];

export {
  QUEUES,
  QUEUES_FOR_ALL_STATS,
  OTHER_QUEUES,
  ALL_QUEUES,
  ALL_QUEUES_ALLOW_EMPTY,
};
