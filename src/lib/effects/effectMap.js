const effectMap = {};

export const registerEffect = (name, component, config) => {
  effectMap[name] = {
    component,
    config
  };
}

export const getEffectConfig = (name) => {
  const effect = effectMap[name];
  if (effect) return effect.config;
  return null;
}

export const getEffectComponent = (name) => {
  const effect = effectMap[name];
  if (effect) return effect.component;
  return null;
}
