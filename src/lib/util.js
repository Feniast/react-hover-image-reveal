export const isNumber = value => Object.prototype.toString.call(value) === '[object Number]';

export const isNumberLike = value => {
  return (typeof value === 'number' && !isNaN(value)) || /^\d+$/.test(value);
};

export const wait = (timeout = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

export const inverseNumber = (obj) => {
  if (isNumber(obj)) return -obj;
  if (Array.isArray(obj)) {
    return obj.map(x => inverseNumber(x));
  }
  if (typeof obj === 'object') {
    const newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = inverseNumber(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};
