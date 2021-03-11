"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALL_QUEUES_ALLOW_EMPTY = exports.ALL_QUEUES = exports.OTHER_QUEUES = exports.QUEUES_FOR_ALL_STATS = exports.QUEUES = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var QUEUES = {
  competitive: {
    key: 'competitive',
    name: 'Competitive',
    queue: 'competitive',
    modes: ['bomb']
  },
  deathmatch: {
    key: 'deathmatch',
    name: 'Deathmatch',
    queue: 'deathmatch',
    modes: ['deathmatch']
  },
  unrated: {
    key: 'unrated',
    name: 'Unrated',
    queue: 'unrated',
    modes: ['bomb']
  },
  snowball: {
    key: 'snowball',
    name: 'Snowball Fight',
    queue: 'snowball',
    modes: ['snowballfight']
  },
  spikerush: {
    key: 'spikerush',
    name: 'Spike Rush',
    queue: 'spikerush',
    modes: ['quickbomb']
  },
  custom: {
    key: 'custom',
    name: 'Custom',
    queue: '',
    modes: ['bomb', 'quickbomb', 'deathmatch']
  },
  escalation: {
    key: 'ggteam',
    name: 'Escalation',
    queue: 'ggteam',
    modes: ['gungame']
  }
};
exports.QUEUES = QUEUES;
var QUEUES_FOR_ALL_STATS = [QUEUES.competitive.queue, QUEUES.unrated.queue, QUEUES.spikerush.queue, QUEUES.custom.key // TODO: change this queue later
];
exports.QUEUES_FOR_ALL_STATS = QUEUES_FOR_ALL_STATS;
var OTHER_QUEUES = [QUEUES.deathmatch.queue, QUEUES.snowball.queue, QUEUES.escalation.queue];
exports.OTHER_QUEUES = OTHER_QUEUES;
var ALL_QUEUES = [].concat(QUEUES_FOR_ALL_STATS, OTHER_QUEUES);
exports.ALL_QUEUES = ALL_QUEUES;
var ALL_QUEUES_ALLOW_EMPTY = [].concat(_toConsumableArray(ALL_QUEUES), ['']);
exports.ALL_QUEUES_ALLOW_EMPTY = ALL_QUEUES_ALLOW_EMPTY;