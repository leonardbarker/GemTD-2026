// js/definitions/comboGems.js

// Each combo gem needs its own `stats` block (same shape as a standard
// gem's per-level stats — combo gems don't level up, so there's only one)
// and a `short` string, which is what draw() prints on the board tile.
export const COMBO_GEMS = {
  "Silver Knight": {
    colour: '#dcdde1',
    icon: '⚔️',
    short: 'SK',
    role: 'Armor Pierce & Slow',
    stats: {
      dmgMin: 45, dmgMax: 60, cooldown: 700, range: 130,
      trueDamage: true,
      slowPct: 0.40, slowDur: 2000
    }
  },
  "Malachite": {
    colour: '#10ac84',
    icon: '☣️',
    short: 'ML',
    role: 'Poison Splash',
    stats: {
      dmgMin: 20, dmgMax: 28, cooldown: 900, range: 110,
      poisonDps: 22, poisonDur: 3500,
      splashRadius: 65
    }
  }
};

// What each combo actually requires. Kept separate from COMBO_GEMS because
// index.html's matchCombo()/comboAvailability()/findIngredientsForCombo()
// all read this array directly — the `recipe` field that used to sit on
// COMBO_GEMS was never read anywhere, so it's gone rather than kept as
// dead data.
//
// Every recipe uses exactly 3 ingredients so it can trigger both ways
// index.html supports combining: picking "combine all 3" on a fresh
// 3-gem roll, and combining 3 matching gems already placed on the board.
export const COMBINATIONS = [
  {
    name: "Silver Knight",
    requires: [
      { q: "Chipped", t: "Ruby" },
      { q: "Chipped", t: "Diamond" },
      { q: "Chipped", t: "Sapphire" }
    ]
  },
  {
    name: "Malachite",
    requires: [
      { q: "Chipped", t: "Emerald" },
      { q: "Chipped", t: "Emerald" },
      { q: "Chipped", t: "Amethyst" }
    ]
  }
];

// Keyed by combo name, not an array — index.html looks these up with
// COMBO_UPGRADES[c.name]. This is display-only right now (shown in the
// recipes modal); there's no gold/currency system in index.html yet, so
// `cost` is left off rather than invented.
export const COMBO_UPGRADES = {
  "Silver Knight": {
    name: "Knight's Bulwark",
    effect: "Adds a chance to stun on hit."
  },
  "Malachite": {
    name: "Toxic Bloom",
    effect: "Poison spreads to nearby creeps on death."
  }
};
