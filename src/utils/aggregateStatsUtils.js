function sanitize(number) {
  return Number.isNaN(number) ? 0 : number;
}

export function toFixedNumber(number, precision) {
  return Number(number.toFixed(precision));
}

export function calcWinrate(stats = {}) {
  const result = (stats.wins * 100) / (stats.matches > 0 ? stats.matches : 1);
  return sanitize(result);
}

export function calcKD(stats = {}) {
  const result = stats.kills / (stats.deaths > 0 ? stats.deaths : 1);
  return toFixedNumber(sanitize(result), 2);
}

export function calcAvgScore(stats = {}, rounds = 1) {
  const result = stats.score / (rounds > 0 ? rounds : 1);
  return toFixedNumber(sanitize(result), 0);
}

export function calcHeadshotPercent(stats) {
  const total = stats.headshots + stats.bodyshots + stats.legshots;
  const result = (stats.headshots * 100) / (total > 0 ? total : 1);
  return toFixedNumber(sanitize(result), 1);
}

export function calcAvgEconomy(economy, rounds) {
  const result = economy / (rounds > 0 ? rounds : 1);
  return toFixedNumber(sanitize(result), 0);
}

export function calcFirstBloodPercent(firstBloods, totalKills) {
  const result = (firstBloods * 100) / (totalKills > 0 ? totalKills : 1);
  return toFixedNumber(sanitize(result), 1);
}

export function calcKDA(stats = {}) {
  const result = (stats.kills + stats.assists) / (stats.deaths > 0 ? stats.deaths : 1);
  return toFixedNumber(sanitize(result), 1);
}
