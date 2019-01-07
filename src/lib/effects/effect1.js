import EffectFactory from './base-effect';
import { sineEaseOut } from './cubic-bezier';
import { createTransitionConfig } from '../util';
import { registerEffect } from './effectMap';

const transitionConfig = {
  duration: 200,
  ease: sineEaseOut
}

const containerConfig = {
  show: createTransitionConfig({
    x: ['-100%', '0%']
  }, transitionConfig),
  hide: {
    x: '100%',
    transition: transitionConfig
  }
};

const imgConfig = {
  show: createTransitionConfig({
    x: ['100%', '0%']
  }, transitionConfig),
  hide: {
    x: '-100%',
    transition: transitionConfig
  }
};

const effect = EffectFactory({
  containerConfig,
  imgConfig
});

registerEffect('1', effect);
