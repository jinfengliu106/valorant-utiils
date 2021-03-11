"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFixedNumber = toFixedNumber;
exports.calcWinrate = calcWinrate;
exports.calcKD = calcKD;
exports.calcAvgScore = calcAvgScore;
exports.calcHeadshotPercent = calcHeadshotPercent;
exports.calcAvgEconomy = calcAvgEconomy;
exports.calcFirstBloodPercent = calcFirstBloodPercent;
exports.calcKDA = calcKDA;

function sanitize(number) {
  return Number.isNaN(number) ? 0 : number;
}

function toFixedNumber(number, precision) {
  return Number(number.toFixed(precision));
}

function calcWinrate() {
  var stats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var result = stats.wins * 100 / (stats.matches > 0 ? stats.matches : 1);
  return sanitize(result);
}

function calcKD() {
  var stats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var result = stats.kills / (stats.deaths > 0 ? stats.deaths : 1);
  return toFixedNumber(sanitize(result), 2);
}

function calcAvgScore() {
  var stats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var result = stats.score / (rounds > 0 ? rounds : 1);
  return toFixedNumber(sanitize(result), 0);
}

function calcHeadshotPercent(stats) {
  var total = stats.headshots + stats.bodyshots + stats.legshots;
  var result = stats.headshots * 100 / (total > 0 ? total : 1);
  return toFixedNumber(sanitize(result), 1);
}

function calcAvgEconomy(economy, rounds) {
  var result = economy / (rounds > 0 ? rounds : 1);
  return toFixedNumber(sanitize(result), 0);
}

function calcFirstBloodPercent(firstBloods, totalKills) {
  var result = firstBloods * 100 / (totalKills > 0 ? totalKills : 1);
  return toFixedNumber(sanitize(result), 1);
}

function calcKDA() {
  var stats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var result = (stats.kills + stats.assists) / (stats.deaths > 0 ? stats.deaths : 1);
  return toFixedNumber(sanitize(result), 1);
}