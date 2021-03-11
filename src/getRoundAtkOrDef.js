export default (mode, roundNum, playerTeamColor) => {
  let roundType = 'attacking';

  switch (mode) {
    case 'bomb':
      if (
        (roundNum > 11 && playerTeamColor === 'Red')
          || (roundNum <= 11 && playerTeamColor === 'Blue')
      ) {
        roundType = 'defending';
      }
      break;
    case 'quickbomb':
      if (
        (roundNum > 2 && playerTeamColor === 'Red')
          || (roundNum <= 2 && playerTeamColor === 'Blue')
      ) {
        roundType = 'defending';
      }
      break;
    default:
      break;
  }

  return roundType;
};
