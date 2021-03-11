export default (match) => (match?.players[0]?.puuid ? 'puuid' : 'subject');
