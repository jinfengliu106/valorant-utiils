// object must contain either numeric values or other objects
// multiplies all numeric values by -1
// mutates the input object
const negateValues = (object) => {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object') {
      negateValues(object[key]);
    } else {
      // eslint-disable-next-line no-param-reassign
      object[key] *= -1;
    }
  });
};

export default negateValues;
