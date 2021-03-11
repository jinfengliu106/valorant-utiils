export default (mode, roundNum) => {
  switch (mode) {
    case 'bomb':
      return roundNum === 0 || roundNum === 12;
    default:
      return false;
  }
};
