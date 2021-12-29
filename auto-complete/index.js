module.exports = {
  createAutoComplete(data) {
    return function (str) {
      if (!str) return [];
      const strInLowCase = str.toLowerCase();
      const strLength = str.length;
      let firstOccurrenceIndex;
      let potentialLastOccurrenceIndex;
      let lastOccurrenceIndex;
      let left = 0;
      let right = data.length - 1;
      while (left <= right) {
        const middle = Math.floor(left + (right - left) / 2);
        const dataMiddleSliced = data[middle].slice(0, strLength).toLowerCase();
        const dataMiddlePrevSliced = middle !== 0
          ? data[middle - 1].slice(0, strLength).toLowerCase()
          : '';
        if (dataMiddleSliced === strInLowCase && !(dataMiddlePrevSliced === strInLowCase)) {
          firstOccurrenceIndex = middle;
          break;
        } else if (dataMiddleSliced >= strInLowCase) {
          right = middle - 1;
          if (dataMiddleSliced > strInLowCase) potentialLastOccurrenceIndex = right;
        } else {
          left = middle + 1;
        }
      }

      if (
        firstOccurrenceIndex >= 0
        && (firstOccurrenceIndex === data.length - 1
          || !(data[firstOccurrenceIndex + 1].slice(0, strLength).toLowerCase() === strInLowCase))
      ) {
        return data.slice(firstOccurrenceIndex, firstOccurrenceIndex + 1);
      }
      if (firstOccurrenceIndex >= 0) {
        left = firstOccurrenceIndex + 1;
        right = potentialLastOccurrenceIndex >= 0 ? potentialLastOccurrenceIndex : data.length - 1;
        while (left <= right) {
          const middle = Math.floor(left + (right - left) / 2);
          const dataMiddleSliced = data[middle].slice(0, strLength).toLowerCase();
          const dataMiddleNextSliced = middle !== data.length - 1
            ? data[middle + 1].slice(0, strLength).toLowerCase()
            : '';
          if (dataMiddleSliced === strInLowCase && !(dataMiddleNextSliced === strInLowCase)) {
            lastOccurrenceIndex = middle;
            break;
          } else if (dataMiddleSliced === strInLowCase) {
            left = middle + 1;
          } else {
            right = middle - 1;
          }
        }
      } else return [];

      return data.slice(firstOccurrenceIndex, lastOccurrenceIndex + 1);
    };
  }
};
