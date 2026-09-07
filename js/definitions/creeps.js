// js/definitions/creeps.js
//
// Creep data source of truth.
//
// CREEP_TYPES describes reusable creep archetypes. A wave entry selects an
// archetype and can override its HP/armour/MR/ability values for that round.
//
// WAVES contains the early-game cadence explicitly through round 50. After
// round 50, getWaveDefinition() continues the same cadence in 10-round
// cycles while allowing HP, armour and magic resistance to keep scaling.
//
// Damage mitigation used by index.html:
//   Physical: damage * (1 - armour / (armour + 10))
//   Magic:    damage * (1 - magicResist)
// True damage is still physical school damage, but bypasses armour. It does
// NOT bypass magic resistance. This keeps Diamond as an armour counter rather
// than a universal answer to every resistance mechanic.

export const CREEP_TYPES = {
  Normal: {
    speed: 1.00,
    hpMult: 1.00,
    armour: 0,
    magicResist: 0,
    flying: false,
    color: '#e74c3c',
    radius: 0.20
  },
  Fast: {
    speed: 1.55,
    hpMult: 0.72,
    armour: 0,
    magicResist: 0,
    flying: false,
    color: '#f1c40f',
    radius: 0.17
  },
  Armoured: {
    speed: 0.88,
    hpMult: 1.22,
    armour: 5,
    magicResist: 0.05,
    flying: false,
    color: '#7f8c8d',
    radius: 0.22
  },
  Flying: {
    speed: 1.12,
    hpMult: 0.82,
    armour: 1,
    magicResist: 0.10,
    flying: true,
    color: '#5dade2',
    radius: 0.18
  },
  Resistant: {
    speed: 0.94,
    hpMult: 1.05,
    armour: 2,
    magicResist: 0.35,
    flying: false,
    color: '#9b59b6',
    radius: 0.21
  },
  Evasive: {
    speed: 1.05,
    hpMult: 0.95,
    armour: 1,
    magicResist: 0.05,
    evasion: 0.20,
    flying: false,
    color: '#f39c12',
    radius: 0.19
  },
  Disabler: {
    speed: 0.82,
    hpMult: 1.15,
    armour: 2,
    magicResist: 0.15,
    disarmRadius: 70,
    disarmDuration: 700,
    flying: false,
    color: '#d35400',
    radius: 0.22
  },
  Regenerator: {
    speed: 0.90,
    hpMult: 1.15,
    armour: 3,
    magicResist: 0.10,
    regenPct: 0.012,
    flying: false,
    color: '#27ae60',
    radius: 0.21
  },
  PhysicalImmune: {
    speed: 0.78,
    hpMult: 1.00,
    armour: 10,
    magicResist: 0.05,
    physicalImmune: true,
    flying: false,
    color: '#34495e',
    radius: 0.21
  },
  MagicImmune: {
    speed: 0.82,
    hpMult: 1.00,
    armour: 2,
    magicResist: 1,
    magicImmune: true,
    flying: false,
    color: '#8e44ad',
    radius: 0.21
  },
  Boss: {
    speed: 0.72,
    hpMult: 4.6,
    armour: 6,
    magicResist: 0.20,
    flying: false,
    boss: true,
    color: '#8e44ad',
    radius: 0.30
  }
};

// Each round keeps 20 creeps. The mix is intentionally gradual:
// - 1-4: basic Normal/Fast
// - 5+: Armoured begins appearing
// - 7+: Flying begins appearing
// - 11+: Resistant appears
// - 15+: Evasive appears
// - 21+: Disabler and Regenerator appear
// - 25+: occasional one-school immunities begin
// - every 10th round: Boss replaces one Normal slot
//
// `count` is a weight, not a hard count. getWaveDefinition() turns the
// weights into exactly 20 spawned creeps using a deterministic round seed.
export const WAVES = [
  { start: 1,  end: 2,  weights: { Normal: 16, Fast: 4 } },
  { start: 3,  end: 4,  weights: { Normal: 14, Fast: 6 } },
  { start: 5,  end: 6,  weights: { Normal: 11, Fast: 5, Armoured: 4 } },
  { start: 7,  end: 8,  weights: { Normal: 9, Fast: 4, Armoured: 4, Flying: 3 } },
  { start: 9,  end: 10, weights: { Normal: 7, Fast: 4, Armoured: 4, Flying: 4, Resistant: 1 } },
  { start: 11, end: 12, weights: { Normal: 7, Fast: 3, Armoured: 4, Flying: 4, Resistant: 2 } },
  { start: 13, end: 14, weights: { Normal: 6, Fast: 3, Armoured: 4, Flying: 4, Resistant: 3 } },
  { start: 15, end: 16, weights: { Normal: 5, Fast: 3, Armoured: 4, Flying: 4, Resistant: 2, Evasive: 2 } },
  { start: 17, end: 18, weights: { Normal: 5, Fast: 2, Armoured: 4, Flying: 4, Resistant: 3, Evasive: 2 } },
  { start: 19, end: 20, weights: { Normal: 4, Fast: 2, Armoured: 4, Flying: 4, Resistant: 3, Evasive: 2, Disabler: 1 } },
  { start: 21, end: 22, weights: { Normal: 4, Fast: 2, Armoured: 4, Flying: 4, Resistant: 3, Evasive: 1, Disabler: 1, Regenerator: 1 } },
  { start: 23, end: 24, weights: { Normal: 3, Fast: 2, Armoured: 4, Flying: 4, Resistant: 3, Evasive: 2, Disabler: 1, Regenerator: 1 } },
  { start: 25, end: 26, weights: { Normal: 3, Fast: 2, Armoured: 3, Flying: 4, Resistant: 3, Evasive: 2, Disabler: 1, Regenerator: 1, MagicImmune: 1 } },
  { start: 27, end: 28, weights: { Normal: 3, Fast: 2, Armoured: 3, Flying: 4, Resistant: 3, Evasive: 2, Disabler: 1, Regenerator: 1, PhysicalImmune: 1 } },
  { start: 29, end: 30, weights: { Normal: 2, Fast: 2, Armoured: 3, Flying: 4, Resistant: 3, Evasive: 2, Disabler: 1, Regenerator: 2, MagicImmune: 1 } },
  { start: 31, end: 34, weights: { Normal: 2, Fast: 2, Armoured: 2, Flying: 5, Resistant: 3, Evasive: 2, Disabler: 1, Regenerator: 2, PhysicalImmune: 1 } },
  { start: 35, end: 39, weights: { Normal: 2, Fast: 2, Armoured: 2, Flying: 5, Resistant: 3, Evasive: 2, Disabler: 1, Regenerator: 2, MagicImmune: 1 } },
  { start: 40, end: 44, weights: { Normal: 2, Fast: 2, Armoured: 2, Flying: 6, Resistant: 3, Evasive: 2, Disabler: 1, Regenerator: 1, PhysicalImmune: 1 } },
  { start: 45, end: 50, weights: { Normal: 2, Fast: 2, Armoured: 2, Flying: 6, Resistant: 3, Evasive: 2, Disabler: 1, Regenerator: 1, MagicImmune: 1 } }
];

export const DIFFICULTIES = [
  { name: 'Easy',   mult: 0.8, startLives: 20 },
  { name: 'Normal', mult: 1.0, startLives: 10 },
  { name: 'Hard',   mult: 1.3, startLives: 5 }
];

const BOSS_ROUND_MULT = 4.6;

function findTemplate(round) {
  const r = Math.max(1, round);
  const cycleRound = r <= 50 ? r : ((r - 1) % 50) + 1;
  return WAVES.find(w => cycleRound >= w.start && cycleRound <= w.end) || WAVES[WAVES.length - 1];
}

function normaliseWeights(weights) {
  const total = Object.values(weights).reduce((sum, n) => sum + n, 0);
  return Object.entries(weights).map(([type, weight]) => ({ type, weight: weight / total }));
}

function buildTypes(weights, round, count = 20) {
  const entries = normaliseWeights(weights);
  const result = [];
  let carry = 0;

  for (let i = 0; i < count; i++) {
    let best = entries[0];
    let bestScore = -Infinity;

    for (const entry of entries) {
      const target = (i + 1) * entry.weight;
      const score = target - result.filter(t => t === entry.type).length + carry * 0.001;
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    result.push(best.type);
    carry += best.weight;
  }

  // Rotate the composition by round so identical two-round templates do not
  // always put the same special creeps at the same spawn positions.
  const offset = (round * 7) % result.length;
  return result.slice(offset).concat(result.slice(0, offset));
}

function armourForRound(round, typeDef) {
  // Armour rises in noticeable steps rather than every round, echoing the
  // reference map without making armour scale exponentially.
  const tier = Math.floor(Math.max(0, round - 1) / 8);
  return typeDef.armour + Math.min(12, tier * 1.5);
}

function magicResistForRound(round, typeDef) {
  const tier = Math.floor(Math.max(0, round - 1) / 10);
  return Math.min(0.55, typeDef.magicResist + tier * 0.025);
}

export function getWaveDefinition(round) {
  const r = Math.max(1, Math.floor(round));
  const template = findTemplate(r);
  let types = buildTypes(template.weights, r, 20);

  if (r % 10 === 0) {
    types[0] = 'Boss';
  }

  const cycle = Math.floor((r - 1) / 50);
  const cycleRound = ((r - 1) % 50) + 1;
  const hpScale = Math.pow(1.035, cycle) * Math.pow(1.095, Math.max(0, r - cycle * 50 - 1) / 10);

  return {
    round: r,
    label: r % 10 === 0 ? `Boss round ${r}` : `Round ${r}`,
    types,
    hpBase: 72 + 10.5 * (r - 1) + 0.8 * Math.pow(r - 1, 2),
    hpScale,
    armourScale: 1,
    magicResistScale: 1,
    bossHpMult: BOSS_ROUND_MULT,
    cycle,
    cycleRound
  };
}

export function getCreepDefinition(typeName, round) {
  const base = CREEP_TYPES[typeName] || CREEP_TYPES.Normal;
  const wave = getWaveDefinition(round);
  const isBoss = !!base.boss;

  return {
    ...base,
    type: typeName,
    hpMult: base.hpMult * (isBoss ? wave.bossHpMult : 1),
    armour: armourForRound(round, base) * wave.armourScale,
    magicResist: Math.min(0.75, magicResistForRound(round, base) * wave.magicResistScale),
    regenPct: base.regenPct || 0
  };
}
