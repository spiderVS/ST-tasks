const copy = (object) => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    const copiedArray = [];
    object.forEach((item, idx) => {
      copiedArray[idx] = copy(item);
    });
    return copiedArray;
  }

  if (typeof object === 'object') {
    const copiedObject = {};
    Object.keys(object).forEach((key) => {
      copiedObject[key] = copy(object[key]);
    });
    return copiedObject;
  }
};
