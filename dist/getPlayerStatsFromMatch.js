"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _VALORANT_STATS_WITH_AGENTS = _interopRequireDefault(require("./constants/VALORANT_STATS_WITH_AGENTS"));

var _VALORANT_STATS = _interopRequireDefault(require("./constants/VALORANT_STATS"));

var _mergeObj = _interopRequireDefault(require("./utils/mergeObj"));

var _getMatchOutcomeForTeam = _interopRequireDefault(require("./utils/getMatchOutcomeForTeam"));

var _getRoundAtkOrDef = _interopRequireDefault(require("./getRoundAtkOrDef"));

var _getWeaponStats = _interopRequireDefault(require("./getWeaponStats"));

var _getDamageStats = _interopRequireDefault(require("./getDamageStats"));

var _getWeaponDamageStats = _interopRequireDefault(require("./getWeaponDamageStats"));

var _isPistolRound = _interopRequireDefault(require("./isPistolRound"));

var _getKillsFromRoundResults = _interopRequireDefault(require("./getKillsFromRoundResults"));

var _getDuelStats = _interopRequireDefault(require("./getDuelStats"));

var _getExpandedWeaponDuelStats = _interopRequireDefault(require("./getExpandedWeaponDuelStats"));

var _getExpandedWeaponDamageStats = _interopRequireDefault(require("./getExpandedWeaponDamageStats"));

var _getWeaponKDStats = _interopRequireDefault(require("./getWeaponKDStats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(match, playerId, playerStatsParam) {
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'subject';
  var playerStats = playerStatsParam || (0, _lodash.cloneDeep)(_VALORANT_STATS_WITH_AGENTS["default"]);
  var teams = match.teams,
      roundResults = match.roundResults,
      players = match.players,
      map = match.map,
      mode = match.mode,
      queue = match.queue;
  var kills = (0, _getKillsFromRoundResults["default"])(roundResults);
  var matchPlayerStats = players.find(function (p) {
    return p[type] === playerId;
  });
  if (!matchPlayerStats) return playerStats;
  var stats = matchPlayerStats.stats,
      teamId = matchPlayerStats.teamId,
      characterId = matchPlayerStats.characterId;
  var mapStats;

  if (playerStats && playerStats.mapStats && playerStats.mapStats[map]) {
    mapStats = playerStats.mapStats[map];
  } else {
    mapStats = {
      wins: 0,
      ties: 0,
      matches: 0,
      roundsWon: 0,
      roundsPlayed: 0,
      attackingWon: 0,
      attackingPlayed: 0,
      defendingWon: 0,
      defendingPlayed: 0
    };
  }

  var agentStats;

  if (playerStats && playerStats.agentStats && playerStats.agentStats[characterId]) {
    agentStats = playerStats.agentsStats[characterId];
  } else {
    agentStats = (0, _lodash.cloneDeep)(_VALORANT_STATS["default"]);
  }

  var playerTeam = teams.find(function (t) {
    return t.teamId === teamId;
  });

  if (!playerTeam || teamId === 'Neutral') {
    return playerStats;
  }

  var matchOutcome = (0, _getMatchOutcomeForTeam["default"])({
    players: players,
    playerTeam: playerTeam,
    teams: teams,
    queue: queue
  });

  if (matchOutcome === 'win') {
    playerStats.wins += 1;
    agentStats.wins += 1;
    mapStats.wins += 1;
  } else if (matchOutcome === 'tie') {
    playerStats.ties += 1;
    agentStats.ties += 1;
    mapStats.ties += 1;
  }

  playerStats.matches += 1;
  agentStats.matches += 1;
  mapStats.matches += 1;
  playerStats.roundsWon += playerTeam.roundsWon;
  agentStats.roundsWon += playerTeam.roundsWon;
  mapStats.roundsWon += playerTeam.roundsWon;
  mapStats.roundsPlayed += playerTeam.roundsPlayed;
  playerStats = (0, _mergeObj["default"])(stats, playerStats);
  playerStats.agentsStats[characterId] = (0, _mergeObj["default"])(stats, agentStats);
  playerStats.mapStats[map] = mapStats;

  if (kills && kills.length > 0) {
    var currentRound = -1;

    var _iterator = _createForOfIteratorHelper(kills.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            index = _step$value[0],
            kill = _step$value[1];

        if (currentRound < kill.round) {
          var _roundResults$current;

          currentRound = kill.round;
          var winningTeam = (_roundResults$current = roundResults[currentRound]) === null || _roundResults$current === void 0 ? void 0 : _roundResults$current.winningTeam;

          if (winningTeam) {
            if (kill.killer === playerId) {
              playerStats.firstBloodsTaken += 1;

              if (winningTeam === teamId) {
                playerStats.roundsWonWhenFirstBloodTaken += 1;
              }
            } else if (kill.victim === playerId) {
              playerStats.firstBloodsGiven += 1;

              if (winningTeam !== teamId) {
                playerStats.roundsLostWhenFirstBloodGiven += 1;
              }
            }

            if (index > 0) {
              var prevKill = kills[index - 1];

              if (prevKill.killer === playerId) {
                playerStats.lastKills += 1;
              }
            }
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var lastKill = kills[kills.length - 1];

    if (lastKill.killer === playerId) {
      playerStats.lastKills += 1;
    }
  }

  if (roundResults && roundResults.length) {
    var _iterator2 = _createForOfIteratorHelper(roundResults),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var roundResult = _step2.value;
        var roundNum = roundResult.roundNum,
            bombDefuser = roundResult.bombDefuser,
            bombPlanter = roundResult.bombPlanter,
            playersRoundStats = roundResult.playerStats,
            _winningTeam = roundResult.winningTeam;
        var playerRoundStats = playersRoundStats.find(function (p) {
          return p[type] === playerId;
        });
        if (!playerRoundStats) continue;
        var roundType = (0, _getRoundAtkOrDef["default"])(mode, roundNum, teamId);

        if (roundType === 'attacking') {
          mapStats.attackingPlayed += 1;
          if (_winningTeam === teamId) mapStats.attackingWon += 1;
        } else if (roundType === 'defending') {
          mapStats.defendingPlayed += 1;
          if (_winningTeam === teamId) mapStats.defendingWon += 1;
        }

        var economy = playerRoundStats.economy,
            damage = playerRoundStats.damage,
            _kills = playerRoundStats.kills;
        playerStats.economy += economy.loadoutValue;
        playerStats.weaponStats = (0, _getWeaponStats["default"])(_kills, playerStats.weaponStats, type);
        playerStats.damageStats = (0, _getDamageStats["default"])(damage, playerStats.damageStats);
        playerStats.weaponDamageStats = (0, _getWeaponDamageStats["default"])(_kills, damage, economy, playerStats.weaponDamageStats, type);

        if ((0, _isPistolRound["default"])(mode, roundNum)) {
          playerStats.pistolRoundWeaponDamageStats = (0, _getWeaponDamageStats["default"])(_kills, damage, economy, playerStats.pistolRoundWeaponDamageStats, type);
        }

        playerStats.agentsStats[characterId].economy += economy.loadoutValue;
        playerStats.agentsStats[characterId].weaponStats = (0, _getWeaponStats["default"])(_kills, playerStats.agentsStats[characterId].weaponStats, type);
        playerStats.agentsStats[characterId].damageStats = (0, _getDamageStats["default"])(damage, playerStats.agentsStats[characterId].damageStats);
        playerStats.agentsStats[characterId].weaponDamageStats = (0, _getWeaponDamageStats["default"])(_kills, damage, economy, playerStats.agentsStats[characterId].weaponDamageStats, type);

        if (bombPlanter && bombPlanter === playerId) {
          playerStats.plants += 1;
        }

        if (bombDefuser && bombDefuser === playerId) {
          playerStats.defuses += 1;
        }

        var expandedWepDmgStats = (0, _getExpandedWeaponDamageStats["default"])(_kills, damage, economy, roundType, playerId, type);
        (0, _mergeObj["default"])(expandedWepDmgStats, playerStats.expandedWeaponDamageStats);
      } // Duel stats

    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var duelStats = (0, _getDuelStats["default"])(roundResults, playerId);
    (0, _mergeObj["default"])(duelStats, playerStats.duelStats);
    var expandedWepDuelStats = (0, _getExpandedWeaponDuelStats["default"])(roundResults, mode, teamId, playerId, type);
    (0, _mergeObj["default"])(expandedWepDuelStats, playerStats.expandedWeaponDuelStats);
    var weaponKDStats = (0, _getWeaponKDStats["default"])(roundResults, playerId);
    (0, _mergeObj["default"])(weaponKDStats, playerStats.weaponKDStats);
  }

  return playerStats;
};

exports["default"] = _default;