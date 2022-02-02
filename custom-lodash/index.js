class CustomLodash {
  static push(array, ...elements) {
    const outArray = array;
    let lastIndex = array.length;
    for (const elem of elements) {
      outArray[lastIndex] = elem;
      lastIndex += 1;
    }
    return outArray.length;
  }

  static slice(array, begin, end) {
    const { length } = array;
    const result = [];
    const sliceLength = end > length ? length - begin : end - begin;
    let currentIndex = begin;
    const lastIndex = currentIndex + sliceLength;
    while (currentIndex < lastIndex) {
      CustomLodash.push(result, array[currentIndex]);
      currentIndex += 1;
    }
    return result;
  }

  static shift(array) {
    const outArray = array;
    const shifted = outArray[0];
    for (let i = 0; i < outArray.length; i += 1) {
      outArray[i] = outArray[i + 1];
    }
    outArray.length = outArray.length ? outArray.length - 1 : outArray.length;
    return shifted;
  }

  static identity(value) {
    return value;
  }

  static getPaths(paths) {
    return Array.isArray(paths[0]) ? paths[0] : paths;
  }

  chunk(array, size = 1) {
    let auxiliaryArray = [...array];
    const result = [];
    const { length } = array;
    if (!length || size < 1) return [];
    if (length <= size) return auxiliaryArray;
    while (auxiliaryArray.length > 0) {
      const chunk = CustomLodash.slice(auxiliaryArray, 0, size);
      CustomLodash.push(result, chunk);
      auxiliaryArray = this.drop(auxiliaryArray, size);
    }
    return result;
  }

  compact(array) {
    return this.filter(array, (elem) => !!elem);
  }

  drop(array, n = 1) {
    const { length } = array;
    if (!length || n >= length) return [];
    if (n <= 0) return [...array];
    return CustomLodash.slice(array, n, length);
  }

  dropWhile(array, predicate = CustomLodash.identity) {
    const { length } = array;
    if (!length) return [];
    const result = [];
    let flag = false;
    for (let i = 0; i < length; i += 1) {
      const elem = array[i];
      if (!flag) {
        if (!predicate(elem, i, array)) {
          flag = true;
          CustomLodash.push(result, elem);
        }
      } else {
        flag = true;
        CustomLodash.push(result, elem);
      }
    }
    return result;
  }

  take(array, n = 1) {
    const { length } = array;
    if (!length || n <= 0) return [];
    if (n >= length) return [...array];
    return CustomLodash.slice(array, 0, n);
  }

  filter(array, predicate = CustomLodash.identity) {
    const { length } = array;
    if (!length) return [];
    const result = [];
    for (let i = 0; i < length; i += 1) {
      const elem = array[i];
      if (predicate(elem, i, array)) CustomLodash.push(result, elem);
    }
    return result;
  }

  find(array, predicate = CustomLodash.identity, fromIndex = 0) {
    const { length } = array;
    let startFrom = fromIndex;
    if (startFrom < 0 && +startFrom >= length) startFrom = 0;
    else if (startFrom < 0) startFrom = length + startFrom;
    const arrayForFilter = this.drop(array, startFrom);
    const filteredArray = this.filter(arrayForFilter, predicate);
    return filteredArray[0];
  }

  includes(array, value, fromIndex = 0) {
    const { length } = array;
    let startFrom = fromIndex;
    if (startFrom < 0 && +startFrom >= length) startFrom = 0;
    else if (startFrom < 0) startFrom = length + startFrom;
    const arrayForIncludes = this.drop(array, startFrom);
    const valueIsNaN = Number.isNaN(value);
    for (const elem of arrayForIncludes) {
      if (elem === value || (valueIsNaN && Number.isNaN(elem))) return true;
    }
    return false;
  }

  map(array, iteratee = CustomLodash.identity) {
    const { length } = array;
    const result = [];
    for (let i = 0; i < length; i += 1) {
      const elem = array[i];
      const iterateeResult = iteratee(elem, i, array);
      CustomLodash.push(result, iterateeResult);
    }
    return result;
  }

  zip(...arrays) {
    const { length } = arrays;
    const result = [];
    const maxLength = Math.max(...(this.map(arrays, (array) => array.length)));
    for (let i = 0; i < maxLength; i += 1) {
      const currentArray = [];
      for (let j = 0; j < length; j += 1) {
        CustomLodash.push(currentArray, arrays[j][i]);
      }
      CustomLodash.push(result, currentArray);
    }
    return result;
  }

  merge(object, ...sources) {
    if (!sources.length) return object;
    const source = CustomLodash.shift(sources);
    if (object instanceof Object && source instanceof Object) {
      for (const key in source) {
        if (source[key] instanceof Object) {
          if (!object[key]) Object.assign(object, { [key]: {} });
          this.merge(object[key], source[key]);
        } else if (source[key] === undefined) {
          if (!(key in object)) Object.assign(object, { [key]: source[key] });
        } else Object.assign(object, { [key]: source[key] });
      }
    }
    return this.merge(object, ...sources);
  }

  omit(object, ...paths) {
    const propertyPaths = Array.isArray(paths[0]) ? paths[0] : paths;
    const result = {};
    for (const key in object) {
      if (!this.includes(propertyPaths, key)) result[key] = object[key];
    }
    return result;
  }

  omitBy(object, predicate = CustomLodash.identity) {
    return this.pickBy(object, (value,key) => !predicate(value, key));
  }

  pick(object, ...paths) {
    const propertyPaths = CustomLodash.getPaths(paths);
    return this.pickBy(object, (value, key) => this.includes(propertyPaths, key));
  }

  pickBy(object, predicate = CustomLodash.identity) {
    const result = {};
    for (const key in object) {
      const value = object[key];
      if (predicate(value, key)) result[key] = value;
    }
    return result;
  }

  toPairs(object) {
    if (object instanceof Map || object instanceof Set) return Array.from(object.entries());
    return Object.entries(object);
  }
}
