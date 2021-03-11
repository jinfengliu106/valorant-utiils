function buildObj(obj, path = []) {
  let last = obj;
  for (const p of path) {
    if (!(p in last)) {
      last[p] = {};
    }
    last = last[p];
  }
}

export default buildObj;
