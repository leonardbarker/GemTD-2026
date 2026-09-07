// js/definitions/creeps.js

export const CREEP_TYPES = {
  Normal: { speed: 1.0, hpMult: 1.0, color: '#e74c3c' },
  Fast:   { speed: 1.6, hpMult: 0.7, color: '#f1c40f' },
  Boss:   { speed: 0.7, hpMult: 3.5, color: '#8e44ad' }
};

export const WAVES = [
  // ... Keep your WAVES array here exactly as defined in Chunk 1
];

export const DIFFICULTIES = {
  Easy:   { startLives: 20, hpScale: 0.8 },
  Normal: { startLives: 10, hpScale: 1.0 },
  Hard:   { startLives: 5,  hpScale: 1.3 }
};
