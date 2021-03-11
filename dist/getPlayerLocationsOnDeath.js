"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _calcDistance = _interopRequireDefault(require("./utils/calcDistance"));

var _getRoundAtkOrDef = _interopRequireDefault(require("./getRoundAtkOrDef"));

var _getKillsFromRoundResults = _interopRequireDefault(require("./getKillsFromRoundResults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(match, playerId) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'subject';
  var players = match.players,
      roundResults = match.roundResults,
      teams = match.teams,
      mode = match.mode;
  var player = players.find(function (p) {
    return p[type] === playerId;
  });
  if (!player) return undefined;
  var teamId = player.teamId;
  if (teamId === 'neutral') return undefined;
  var playerTeam = teams.find(function (t) {
    return t.teamId === teamId;
  });
  var allDeaths = [];
  var kills = (0, _getKillsFromRoundResults["default"])(roundResults);

  if (kills && kills.length) {
    var _iterator = _createForOfIteratorHelper(kills),
        _step;

    try {
      var _loop = function _loop() {
        var _step$value = _step.value,
            round = _step$value.round,
            victim = _step$value.victim,
            victimLocation = _step$value.victimLocation,
            killer = _step$value.killer,
            playerLocations = _step$value.playerLocations;

        if (victim === playerId) {
          var playerDeathDetails = {
            round: null,
            deathLocation: null,
            killer: null,
            killerLocation: null,
            distanceFromKiller: null,
            roundAtkOrDef: null
          };
          playerDeathDetails.round = round;
          playerDeathDetails.deathLocation = victimLocation;
          playerDeathDetails.killer = killer;
          var killerLocation = playerLocations.find(function (l) {
            return l[type] === killer;
          });

          if (killerLocation && killerLocation.location) {
            playerDeathDetails.killerLocation = killerLocation.location;
            playerDeathDetails.distanceFromKiller = (0, _calcDistance["default"])(victimLocation, killerLocation.location);
          }

          playerDeathDetails.roundAtkOrDef = (0, _getRoundAtkOrDef["default"])(mode, round, playerTeam.teamId);
          allDeaths.push(playerDeathDetails);
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return allDeaths;
};

exports["default"] = _default;