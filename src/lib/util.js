export const isNumber = value => Object.prototype.toString.call(value) === '[object Number]';

export const isFunction = value => Object.prototype.toString.call(value) === '[object Function]';

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

export const toArray = (obj) => {
  return Array.isArray(obj) ? obj : [obj];
}

export const pick = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  return toArray(keys).reduce((o, key) => {
    if (obj.hasOwnProperty(key)) {
      o[key] = obj[key];
    }
    return o;
  }, {});
}

export const injectTransition = (obj, transition) => {
  for (let key in obj) {
    obj[key] = Object.assign({}, obj[key], transition);
  }
  return obj;
};

export const createTransitionConfig = (obj, transition) => {
  const config = {
    transition: {}
  };
  for (let key in obj) {
    const values = obj[key];
    if (Array.isArray(values) && values.length >= 2) {
      const [from, to] = values;
      config[key] = to;
      config.transition[key] = {
        from,
        to,
        ...transition
      }
    } else {
      const to = Array.isArray(values) ? values[0] : values;
      config[key] = to;
    }
  }
  return config;
};

export const mergeTransitionConfig = (...cfgs) => {
  const mergedTransition = cfgs.reduce((assembly, cfg) => {
    if (!cfg) return assembly;
    return Object.assign(assembly, cfg.transition || {});
  }, {});
  const mergedConfig = cfgs.reduce((assembly, cfg) => {
    return Object.assign(assembly, cfg);
  }, {});
  mergedConfig.transition = mergedTransition;
  return mergedConfig;
};
