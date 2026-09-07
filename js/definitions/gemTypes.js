// js/definitions/gemTypes.js
//
// GEM_LEVELS must be a flat array: index.html reads GEM_LEVELS.length and
// GEM_LEVELS[level] as a plain string ("Chipped", "Flawed", ...).
export const GEM_LEVELS = ["Chipped", "Flawed", "Normal", "Flawless", "Perfect"];

// Power multiplier per quality tier, applied to damage / effect strength.
// (These are the same numbers the old object-shaped GEM_LEVELS carried —
// just relocated to where they're actually used.)
const LEVEL_MULT = [1.0, 1.25, 1.6, 2.1, 2.8];

// Expands one base stat block into GEM_LEVELS.length tiers. Only damage and
// effect magnitude scale with quality; cooldown, range, splash radius and
// max targets stay fixed per gem so behaviour stays predictable as you
// upgrade a tower's quality rather than changing what kind of tower it is.
function buildLevels(base) {
  return LEVEL_MULT.map(mult => {
    const lvl = {
      dmgMin: Math.round(base.dmgMin * mult),
      dmgMax: Math.round(base.dmgMax * mult),
      cooldown: base.cooldown,
      range: base.range
    };

    if (base.slowPct)      lvl.slowPct      = Math.min(0.75, base.slowPct + (mult - 1) * 0.08);
    if (base.slowDur)      lvl.slowDur      = base.slowDur;
    if (base.poisonDps)    lvl.poisonDps    = Math.round(base.poisonDps * mult);
    if (base.poisonDur)    lvl.poisonDur    = base.poisonDur;
    if (base.splashRadius) lvl.splashRadius = base.splashRadius;
    if (base.maxTargets)   lvl.maxTargets   = base.maxTargets;
    if (base.trueDamage)   lvl.trueDamage   = true;
    if (base.auraPct)      lvl.auraPct      = Math.min(0.5, base.auraPct + (mult - 1) * 0.08);

    return lvl;
  });
}

export const GEM_TYPES = {
  Ruby: {
    colour: '#e53935',
    icon: '◆',
    role: 'Single-Target Heavy',
    levels: buildLevels({ dmgMin: 40, dmgMax: 55, cooldown: 900, range: 110 })
  },
  Sapphire: {
    colour: '#1e88e5',
    icon: '▲',
    role: 'Slowing',
    levels: buildLevels({
      dmgMin: 8, dmgMax: 14, cooldown: 700, range: 120,
      slowPct: 0.30, slowDur: 1500
    })
  },
  Emerald: {
    colour: '#43a047',
    icon: '■',
    role: 'Poison DPS',
    levels: buildLevels({
      dmgMin: 6, dmgMax: 10, cooldown: 800, range: 100,
      poisonDps: 12, poisonDur: 3000
    })
  },
  Topaz: {
    colour: '#fdd835',
    icon: '★',
    role: 'Multi-Target Attack',
    levels: buildLevels({
      dmgMin: 10, dmgMax: 16, cooldown: 750, range: 110,
      maxTargets: 3
    })
  },
  Amethyst: {
    colour: '#8e24aa',
    icon: '●',
    role: 'Splash Damage',
    levels: buildLevels({
      dmgMin: 18, dmgMax: 26, cooldown: 950, range: 100,
      splashRadius: 55
    })
  },
  Diamond: {
    colour: '#e0e0e0',
    icon: '✦',
    role: 'Armor Piercing',
    levels: buildLevels({
      dmgMin: 22, dmgMax: 30, cooldown: 850, range: 115,
      trueDamage: true
    })
  },
  Opal: {
    colour: '#00acc1',
    icon: '⬟',
    role: 'Aura Support',
    // auraRadius is read from this top-level entry (not per-level stats) —
    // see getGemStats() in index.html.
    auraRadius: 130,
    levels: buildLevels({
      dmgMin: 6, dmgMax: 10, cooldown: 1100, range: 90,
      auraPct: 0.15
    })
  },
  Aquamarine: {
    colour: '#00d2d3',
    icon: '⬢',
    role: 'Rapid Attack',
    levels: buildLevels({ dmgMin: 5, dmgMax: 9, cooldown: 350, range: 95 })
  }
};
