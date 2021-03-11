/* eslint-disable no-param-reassign */
import { cloneDeep } from 'lodash';

const mergeObj = (obj, exObj) => {
  if (obj) {
    Object.entries(obj).forEach(([key, val]) => {
      let newVal = exObj[key];
      if (typeof val === 'object') {
        newVal = newVal ? mergeObj(val, newVal) : cloneDeep(val);
      } else {
        newVal = (newVal || 0) + val;
      }
      exObj[key] = newVal;
    });
  }
  return exObj;
};

export default mergeObj;
