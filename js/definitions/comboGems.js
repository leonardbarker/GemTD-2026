// js/definitions/comboGems.js

export const COMBO_GEMS = {
  "Silver Knight": {
    colour: '#dcdde1',
    icon: '⚔️',
    short: 'SK',
    role: 'Armor Pierce & Slow',
    stats: {
      dmgMin: 45, dmgMax: 60, cooldown: 700, range: 130,
      trueDamage: true,
      damageType: 'physical',
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
      damageType: 'magic',
      poisonDps: 22, poisonDur: 3500,
      splashRadius: 65
    }
  },
  "Gold": {
    colour: '#f1c40f',
    icon: 'G',
    short: 'Au',
    role: 'Armour Reduction & Wealth',
    tiers: [
      {
        name: 'Gold',
        upgradeCost: 100,
        dmgMin: 160, dmgMax: 190, cooldown: 750, range: 114,
        damageType: 'physical',
        armourReduction: 5,
        critChance: 0.25,
        critMult: 2,
        goldBonusChance: 0.01,
        goldBonusAmount: 100
      },
      {
        name: 'Egyptian Gold',
        upgradeCost: null,
        dmgMin: 160, dmgMax: 200, cooldown: 700, range: 121,
        damageType: 'physical',
        armourReduction: 8,
        critChance: 0.30,
        critMult: 2,
        goldBonusChance: 0.01,
        goldBonusAmount: 100
      }
    ]
  }
};

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
  },
  {
    name: "Gold",
    requires: [
      { q: "Perfect", t: "Amethyst" },
      { q: "Flawless", t: "Amethyst" },
      { q: "Flawed", t: "Diamond" }
    ]
  }
];

export const COMBO_UPGRADES = {
  "Silver Knight": {
    name: "Knight's Bulwark",
    effect: "Adds a chance to stun on hit."
  },
  "Malachite": {
    name: "Toxic Bloom",
    effect: "Poison spreads to nearby creeps on death."
  },
  "Gold": {
    name: "Egyptian Gold",
    effect: "Improves damage, range and armour reduction while retaining the 1% chance to generate 100 bonus gold on hit."
  }
};
