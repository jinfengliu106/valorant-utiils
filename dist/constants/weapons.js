"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEAPON_IDs = exports.ALL_WEAPONS = exports.heavy = exports.snipers = exports.rifles = exports.shotguns = exports.smgs = exports.sideArms = void 0;
var sideArms = [{
  key: 'classic',
  name: 'Classic',
  type: 'Sidearm',
  cost: 0,
  primary: {
    kind: 'Semi-Automatic',
    rate: '6.75 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/classic/spray_footage/classic_primary2.mp4'
  },
  alt: {
    kind: '3-Round Burst, spread increase',
    rate: '2.22 rounds/sec',
    video: null
  },
  magazine: 12,
  damage: [{
    range: '0-30m',
    body: 26,
    head: 78,
    leg: 22
  }, {
    range: '30-50m',
    body: 22,
    head: 66,
    leg: 18
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Low',
  images: {
    model: 'classic/classic-model.png'
  }
}, {
  key: 'shorty',
  name: 'Shorty',
  type: 'Sidearm',
  cost: 200,
  primary: {
    kind: 'Semi-Automatic',
    rate: '3.3 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/shorty/spray_footage/shorty_primary2.mp4'
  },
  alt: null,
  magazine: 2,
  damage: [{
    range: '0-9m',
    body: 12,
    head: 36,
    leg: 10
  }, {
    range: '9-15m',
    body: 8,
    head: 24,
    leg: 6
  }, {
    range: '15-50m',
    body: 3,
    head: 9,
    leg: 2
  }],
  damageCaveat: 'Per Pellet',
  pelletCount: '15 pellets',
  penetration: 'Low',
  images: {
    model: 'shorty/shorty-model.png'
  }
}, {
  key: 'frenzy',
  name: 'Frenzy',
  type: 'Sidearm',
  cost: 400,
  primary: {
    kind: 'Full-Automatic',
    rate: '10 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/frenzy/spray_footage/frenzy_primary2.mp4'
  },
  alt: null,
  magazine: 13,
  damage: [{
    range: '0-20m',
    body: 26,
    head: 78,
    leg: 22
  }, {
    range: '20-50m',
    body: 21,
    head: 63,
    leg: 17
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Low',
  images: {
    model: 'frenzy/frenzy-model.png'
  }
}, {
  key: 'ghost',
  name: 'Ghost',
  type: 'Sidearm',
  cost: 500,
  primary: {
    kind: 'Semi-Automatic',
    rate: '6.75 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/ghost/spray_footage/ghost_primary2.mp4'
  },
  alt: null,
  magazine: 15,
  damage: [{
    range: '0-30m',
    body: 30,
    head: 105,
    leg: 26
  }, {
    range: '30-50m',
    body: 25,
    head: 88,
    leg: 21
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Medium',
  images: {
    model: 'ghost/ghost-model.png'
  }
}, {
  key: 'sheriff',
  name: 'Sheriff',
  type: 'Sidearm',
  cost: 800,
  primary: {
    kind: 'Semi-Automatic',
    rate: '4 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/sheriff/spray_footage/sheriff_primary2.mp4'
  },
  alt: null,
  magazine: 6,
  damage: [{
    range: '0-30m',
    body: 55,
    head: 160,
    leg: 47
  }, {
    range: '30-50m',
    body: 50,
    head: 145,
    leg: 43
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'High',
  images: {
    model: 'sheriff/sheriff-model.png'
  }
}];
exports.sideArms = sideArms;
var smgs = [{
  key: 'stinger',
  name: 'Stinger',
  type: 'SMG',
  cost: 1000,
  primary: {
    kind: 'Full-Automatic',
    rate: '18 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/stinger/spray_footage/stinger_primary3.mp4'
  },
  alt: {
    kind: 'Zoom mode (1.15x), 4-Round Burst, spread reduction',
    rate: '4 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/stinger/spray_footage/stinger_alt3.mp4'
  },
  magazine: 20,
  damage: [{
    range: '0-20m',
    body: 27,
    head: 67,
    leg: 23
  }, {
    range: '20-50m',
    body: 25,
    head: 62,
    leg: 21
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Low',
  images: {
    model: 'stinger/stinger-model.png'
  }
}, {
  key: 'spectre',
  name: 'Spectre',
  type: 'SMG',
  cost: 1600,
  primary: {
    kind: 'Full-Automatic',
    rate: '13.33 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/spectre/spray_footage/spectre_primary3.mp4'
  },
  alt: {
    kind: 'Zoom mode (1.15x), slight spread reduction',
    rate: '12 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/spectre/spray_footage/spectre_alt3.mp4'
  },
  magazine: 30,
  damage: [{
    range: '0-20m',
    body: 26,
    head: 78,
    leg: 22
  }, {
    range: '20-50m',
    body: 22,
    head: 66,
    leg: 18
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Medium',
  images: {
    model: 'spectre/spectre-model.png'
  }
}];
exports.smgs = smgs;
var shotguns = [{
  key: 'bucky',
  name: 'Bucky',
  type: 'Shotgun',
  cost: 900,
  primary: {
    kind: 'Semi-Automatic',
    rate: '1.1 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/bucky/spray_footage/bucky_primary3.mp4'
  },
  alt: {
    kind: 'Semi-Automatic Air Burst (Extended primary fire shot)',
    rate: '1.1 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/bucky/spray_footage/bucky_alt2.mp4'
  },
  magazine: 5,
  damage: [{
    range: '0-8m',
    body: 22,
    head: 44,
    leg: 19
  }, {
    range: '8-12m',
    body: 17,
    head: 34,
    leg: 14
  }, {
    range: '12-50m',
    body: 9,
    head: 18,
    leg: 8
  }],
  damageCaveat: 'Per Pellet',
  pelletCount: '15 pellets',
  penetration: 'Low',
  images: {
    model: 'bucky/bucky-model.png'
  }
}, {
  key: 'judge',
  name: 'Judge',
  type: 'Shotgun',
  cost: 1500,
  primary: {
    kind: 'Full-Automatic',
    rate: '3.5 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/judge/spray_footage/judge_primary3.mp4'
  },
  alt: null,
  magazine: 7,
  damage: [{
    range: '0-10m',
    body: 17,
    head: 34,
    leg: 14
  }, {
    range: '10-15m',
    body: 13,
    head: 26,
    leg: 11
  }, {
    range: '15-50m',
    body: 10,
    head: 20,
    leg: 9
  }],
  damageCaveat: 'Per Pellet',
  pelletCount: '12 pellets',
  penetration: 'Medium',
  images: {
    model: 'judge/judge-model.png'
  }
}];
exports.shotguns = shotguns;
var rifles = [{
  key: 'bulldog',
  name: 'Bulldog',
  type: 'Rifle',
  cost: 2100,
  primary: {
    kind: 'Full-Automatic',
    rate: '9.15 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/bulldog/spray_footage/bulldog_primary3.mp4'
  },
  alt: {
    kind: 'Zoom (1.25x), 3-Round Burst',
    rate: '3 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/bulldog/spray_footage/bulldog_alt3.mp4'
  },
  magazine: 24,
  damage: [{
    range: '0-50m',
    body: 35,
    head: 116,
    leg: 30
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Medium',
  images: {
    model: 'bulldog/bulldog-model.png'
  }
}, {
  key: 'guardian',
  name: 'Guardian',
  type: 'Rifle',
  cost: 2700,
  primary: {
    kind: 'Semi-Automatic',
    rate: '6.5 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/guardian/spray_footage/guardian_primary2.mp4'
  },
  alt: {
    kind: 'Zoom (1.5x), slight spread reduction',
    rate: '6.5 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/guardian/spray_footage/guardian_alt2.mp4'
  },
  magazine: 12,
  damage: [{
    range: '0-50m',
    body: 65,
    head: 195,
    leg: 49
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Medium',
  images: {
    model: 'guardian/guardian-model.png'
  }
}, {
  key: 'phantom',
  name: 'Phantom',
  type: 'Rifle',
  cost: 2900,
  primary: {
    kind: 'Full-Automatic',
    rate: '11 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/phantom/spray_footage/phantom_primary2.mp4'
  },
  alt: {
    kind: 'Zoom (1.25x). Slight spread reduction',
    rate: '9.9 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/phantom/spray_footage/phantom_alt2.mp4'
  },
  magazine: 30,
  damage: [{
    range: '0-15m',
    body: 39,
    head: 156,
    leg: 33
  }, {
    range: '15-30m',
    body: 35,
    head: 140,
    leg: 30
  }, {
    range: '30-50m',
    body: 31,
    head: 124,
    leg: 26
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Medium',
  images: {
    model: 'phantom/phantom-model.png'
  }
}, {
  key: 'vandal',
  name: 'Vandal',
  type: 'Rifle',
  cost: 2900,
  primary: {
    kind: 'Full-Automatic',
    rate: '9.25 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/vandal/spray_footage/vandal_primary3.mp4'
  },
  alt: {
    kind: 'Zoom mode (1.25x), slight spread reduction',
    rate: '8.32 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/vandal/spray_footage/vandal_alt3.mp4'
  },
  magazine: 25,
  damage: [{
    range: '0-50m',
    body: 39,
    head: 156,
    leg: 33
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Medium',
  images: {
    model: 'vandal/vandal-model.png'
  }
}];
exports.rifles = rifles;
var snipers = [{
  key: 'marshal',
  name: 'Marshal',
  type: 'Sniper',
  cost: 1100,
  primary: {
    kind: 'Semi-Automatic',
    rate: '1.5 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/marshal/spray_footage/marshal_primary2.mp4'
  },
  alt: {
    kind: 'Dual-Zoom Mode (2.5x), significant spread reduction',
    rate: '1.2 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/marshal/spray_footage/marshal_alt2.mp4'
  },
  magazine: 5,
  damage: [{
    range: '0-50m',
    body: 101,
    head: 202,
    leg: 85
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'Medium',
  images: {
    model: 'marshal/marshal-model.png'
  }
}, {
  key: 'operator',
  name: 'Operator',
  type: 'Sniper',
  cost: 4500,
  primary: {
    kind: 'Semi-Automatic',
    rate: '0.75 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/operator/spray_footage/operator_primary2.mp4'
  },
  alt: {
    kind: 'Dual-Zoom Mode (2.5x, 5x), significant spread reduction',
    rate: '0.75 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/operator/spray_footage/operator_alt2.mp4'
  },
  magazine: 5,
  damage: [{
    range: '0-50m',
    body: 150,
    head: 255,
    leg: 127
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'High',
  images: {
    model: 'operator/operator-model.png'
  }
}];
exports.snipers = snipers;
var heavy = [{
  key: 'ares',
  name: 'Ares',
  type: 'Heavy',
  cost: 1600,
  primary: {
    kind: 'Full-Automatic',
    rate: '10 -> 13 rounds/sec (increasing during fire)',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/ares/spray_footage/ares_primary2.mp4'
  },
  alt: {
    kind: 'Zoom mode (1.25x), slight spread reduction',
    rate: '10 -> 13 rounds/sec (increasing during fire)',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/ares/spray_footage/ares_alt2.mp4'
  },
  magazine: 50,
  damage: [{
    range: '0-30m',
    body: 30,
    head: 72,
    leg: 25
  }, {
    range: '30-50m',
    body: 28,
    head: 67,
    leg: 23
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'High',
  images: {
    model: 'ares/ares-model.png'
  }
}, {
  key: 'odin',
  name: 'Odin',
  type: 'Heavy',
  cost: 3200,
  primary: {
    kind: 'Full-Automatic',
    rate: '12 -> 15.6 rounds/sec (increasing during fire)',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/odin/spray_footage/odin_primary2.mp4'
  },
  alt: {
    kind: 'Zoom mode (1.25x), slight spread reduction',
    rate: '15.6 rounds/sec',
    video: 'https://blitz-cdn-videos.blitz.gg/valorant/weapons/odin/spray_footage/odin_alt2.mp4'
  },
  magazine: 100,
  damage: [{
    range: '0-30m',
    body: 38,
    head: 95,
    leg: 32
  }, {
    range: '30-50m',
    body: 31,
    head: 77,
    leg: 26
  }],
  damageCaveat: 'Per Bullet',
  penetration: 'High',
  images: {
    model: 'odin/odin-model.png'
  }
}];
exports.heavy = heavy;
var ALL_WEAPONS = [].concat(sideArms, smgs, shotguns, rifles, snipers, heavy);
exports.ALL_WEAPONS = ALL_WEAPONS;
var WEAPON_IDs = {
  '29A0CFAB-485B-F5D5-779A-B59F85E204A8': 'classic',
  '42DA8CCC-40D5-AFFC-BEEC-15AA47B42EDA': 'shorty',
  '44D4E95C-4157-0037-81B2-17841BF2E8E3': 'frenzy',
  '1BAA85B4-4C70-1284-64BB-6481DFC3BB4E': 'ghost',
  'E336C6B8-418D-9340-D77F-7A9E4CFE0702': 'sheriff',
  'F7E1B454-4AD4-1063-EC0A-159E56B58941': 'stinger',
  '462080D1-4035-2937-7C09-27AA2A5C27A7': 'spectre',
  '910BE174-449B-C412-AB22-D0873436B21B': 'bucky',
  'EC845BF4-4F79-DDDA-A3DA-0DB3774B2794': 'judge',
  'AE3DE142-4D85-2547-DD26-4E90BED35CF7': 'bulldog',
  '4ADE7FAA-4CF1-8376-95EF-39884480959B': 'guardian',
  'EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A': 'phantom',
  '9C82E19D-4575-0200-1A81-3EACF00CF872': 'vandal',
  'C4883E50-4494-202C-3EC3-6B8A9284F00B': 'marshal',
  'A03B24D3-4319-996D-0F8C-94BBFBA1DFC7': 'operator',
  '55D8A0F4-4274-CA67-FE2C-06AB45EFDF58': 'ares',
  '63E6C2B6-4A8E-869C-3D4C-E38355226584': 'odin',
  '3DE32920-4A8F-0499-7740-648A5BF95470': 'golden'
};
exports.WEAPON_IDs = WEAPON_IDs;