// js/definitions/creeps.js
 
// Not yet wired into index.html's combat loop — spawnOneCreep() only calls
// baseCreepHp(round) right now, it doesn't vary creep type. Left in place
// for when you add creep variety.
export const CREEP_TYPES = {
  Normal: { speed: 1.0, hpMult: 1.0, color: '#e74c3c' },
  Fast:   { speed: 1.6, hpMult: 0.7, color: '#f1c40f' },
  Boss:   { speed: 0.7, hpMult: 3.5, color: '#8e44ad' }
};
 
// Also not yet read anywhere — index.html spawns a flat 20 creeps per round
// via creepsToSpawn = 20, not from a wave table. Left in place for later.
export const WAVES = [];
 
// Must be an array: index.html does DIFFICULTIES.forEach(...) to populate
// the dropdown, and reads DIFFICULTIES[difficultyIndex].mult / .name.
// Note: startLives isn't currently consumed anywhere — index.html hardcodes
// MAX_LIVES = 20 regardless of difficulty. Wire livesLeft = DIFFICULTIES[difficultyIndex].startLives
// in resetCombat() if you want difficulty to affect lives too.
export const DIFFICULTIES = [
  { name: 'Easy',   mult: 0.8, startLives: 20 },
  { name: 'Normal', mult: 1.0, startLives: 10 },
  { name: 'Hard',   mult: 1.3, startLives: 5 }
];
 
