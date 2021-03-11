/* eslint-disable no-restricted-syntax */
import { cloneDeep } from 'lodash';
import VALORANT_STATS_WITH_AGENTS from './constants/VALORANT_STATS_WITH_AGENTS';
import VALORANT_STATS from './constants/VALORANT_STATS';
import mergeObj from './utils/mergeObj';
import getMatchOutcomeForTeam from './utils/getMatchOutcomeForTeam';
import getRoundAtkOrDef from './getRoundAtkOrDef';
import getWeaponStats from './getWeaponStats';
import getDamageStats from './getDamageStats';
import getWeaponDamageStats from './getWeaponDamageStats';
import isPistolRound from './isPistolRound';
import getKillsFromRoundResults from './getKillsFromRoundResults';
import getDuelStats from './getDuelStats';
import getExpandedWeaponDuelStats from './getExpandedWeaponDuelStats';
import getExpandedWeaponDamageStats from './getExpandedWeaponDamageStats';
import getWeaponKDStats from './getWeaponKDStats';

export default (match, playerId, playerStatsParam, type = 'subject') => {
  let playerStats = playerStatsParam || cloneDeep(VALORANT_STATS_WITH_AGENTS);

  const {
    teams,
    roundResults,
    players,
    map,
    mode,
    queue,
    // ranked,
  } = match;
  const kills = getKillsFromRoundResults(roundResults);

  const matchPlayerStats = players.find((p) => p[type] === playerId);

  if (!matchPlayerStats) return playerStats;

  const {
    stats,
    teamId,
    characterId,
  } = matchPlayerStats;

  let mapStats;
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
      defendingPlayed: 0,
    };
  }

  let agentStats;
  if (
    playerStats
    && playerStats.agentStats
    && playerStats.agentStats[characterId]
  ) {
    agentStats = playerStats.agentsStats[characterId];
  } else {
    agentStats = cloneDeep(VALORANT_STATS);
  }

  const playerTeam = teams.find((t) => t.teamId === teamId);

  if (!playerTeam || teamId === 'Neutral') {
    return playerStats;
  }

  const matchOutcome = getMatchOutcomeForTeam({
    players, playerTeam, teams, queue,
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

  playerStats = mergeObj(stats, playerStats);
  playerStats.agentsStats[characterId] = mergeObj(stats, agentStats);
  playerStats.mapStats[map] = mapStats;
  if (kills && kills.length > 0) {
    let currentRound = -1;

    for (const [index, kill] of kills.entries()) {
      if (currentRound < kill.round) {
        currentRound = kill.round;
        const winningTeam = roundResults[currentRound]?.winningTeam;

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
            const prevKill = kills[index - 1];
            if (prevKill.killer === playerId) {
              playerStats.lastKills += 1;
            }
          }
        }
      }
    }
    const lastKill = kills[kills.length - 1];
    if (lastKill.killer === playerId) {
      playerStats.lastKills += 1;
    }
  }
  if (roundResults && roundResults.length) {
    for (const roundResult of roundResults) {
      const {
        roundNum,
        bombDefuser,
        bombPlanter,
        playerStats: playersRoundStats,
        winningTeam,
      } = roundResult;
      const playerRoundStats = playersRoundStats.find(
        (p) => p[type] === playerId,
      );
      if (!playerRoundStats) continue;

      const roundType = getRoundAtkOrDef(mode, roundNum, teamId);

      if (roundType === 'attacking') {
        mapStats.attackingPlayed += 1;
        if (winningTeam === teamId) mapStats.attackingWon += 1;
      } else if (roundType === 'defending') {
        mapStats.defendingPlayed += 1;
        if (winningTeam === teamId) mapStats.defendingWon += 1;
      }

      const { economy, damage, kills } = playerRoundStats;

      playerStats.economy += economy.loadoutValue;
      playerStats.weaponStats = getWeaponStats(kills, playerStats.weaponStats, type);
      playerStats.damageStats = getDamageStats(damage, playerStats.damageStats);
      playerStats.weaponDamageStats = getWeaponDamageStats(
        kills,
        damage,
        economy,
        playerStats.weaponDamageStats,
        type,
      );
      if (isPistolRound(mode, roundNum)) {
        playerStats.pistolRoundWeaponDamageStats = getWeaponDamageStats(
          kills,
          damage,
          economy,
          playerStats.pistolRoundWeaponDamageStats,
          type,
        );
      }

      playerStats.agentsStats[characterId].economy += economy.loadoutValue;
      playerStats.agentsStats[characterId].weaponStats = getWeaponStats(
        kills,
        playerStats.agentsStats[characterId].weaponStats,
        type,
      );
      playerStats.agentsStats[characterId].damageStats = getDamageStats(
        damage,
        playerStats.agentsStats[characterId].damageStats,
      );
      playerStats.agentsStats[
        characterId
      ].weaponDamageStats = getWeaponDamageStats(
        kills,
        damage,
        economy,
        playerStats.agentsStats[characterId].weaponDamageStats,
        type,
      );
      if (bombPlanter && bombPlanter === playerId) {
        playerStats.plants += 1;
      }
      if (bombDefuser && bombDefuser === playerId) {
        playerStats.defuses += 1;
      }

      const expandedWepDmgStats = getExpandedWeaponDamageStats(
        kills, damage, economy, roundType, playerId, type,
      );
      mergeObj(expandedWepDmgStats, playerStats.expandedWeaponDamageStats);
    }

    // Duel stats
    const duelStats = getDuelStats(roundResults, playerId);
    mergeObj(duelStats, playerStats.duelStats);

    const expandedWepDuelStats = getExpandedWeaponDuelStats(
      roundResults, mode, teamId, playerId, type,
    );
    mergeObj(expandedWepDuelStats, playerStats.expandedWeaponDuelStats);

    const weaponKDStats = getWeaponKDStats(roundResults, playerId);
    mergeObj(weaponKDStats, playerStats.weaponKDStats);
  }
  return playerStats;
};
