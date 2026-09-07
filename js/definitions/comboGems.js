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
  "Jade": {
    colour: '#2ecc71',
    icon: '❇️',
    short: 'JD',
    role: 'Poison & Slow',
    stats: {
      dmgMin: 30, dmgMax: 42, cooldown: 800, range: 120,
      damageType: 'magic',
      poisonDps: 30, poisonDur: 4000,
      slowPct: 0.35, slowDur: 2500
    }
  },
  "Red Crystal": {
    colour: '#e74c3c',
    icon: '🔻',
    short: 'RC',
    role: 'Heavy Splash Attack',
    stats: {
      dmgMin: 65, dmgMax: 85, cooldown: 850, range: 125,
      damageType: 'physical',
      splashRadius: 75
    }
  },
  "Dark Emerald": {
    colour: '#1abc9c',
    icon: '🟢',
    short: 'DE',
    role: 'Multi-Target Poison',
    stats: {
      dmgMin: 25, dmgMax: 35, cooldown: 750, range: 120,
      damageType: 'magic',
      maxTargets: 3,
      poisonDps: 28, poisonDur: 3500
    }
  },
  "Yellow Sapphire": {
    colour: '#f1c40f',
    icon: '🌟',
    short: 'YS',
    role: 'Rapid Armor Pierce',
    stats: {
      dmgMin: 35, dmgMax: 50, cooldown: 450, range: 130,
      trueDamage: true,
      damageType: 'physical'
    }
  },
  "Star Ruby": {
    colour: '#9b59b6',
    icon: '⭐',
    short: 'SR',
    role: 'Heavy Multi-Target',
    stats: {
      dmgMin: 55, dmgMax: 75, cooldown: 800, range: 135,
      damageType: 'physical',
      maxTargets: 4
    }
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
    name: "Jade",
    requires: [
      { q: "Chipped", t: "Emerald" },
      { q: "Chipped", t: "Opal" },
      { q: "Chipped", t: "Aquamarine" }
    ]
  },
  {
    name: "Red Crystal",
    requires: [
      { q: "Chipped", t: "Ruby" },
      { q: "Chipped", t: "Emerald" },
      { q: "Chipped", t: "Topaz" }
    ]
  },
  {
    name: "Dark Emerald",
    requires: [
      { q: "Flawed", t: "Emerald" },
      { q: "Flawed", t: "Sapphire" },
      { q: "Chipped", t: "Topaz" }
    ]
  },
  {
    name: "Yellow Sapphire",
    requires: [
      { q: "Chipped", t: "Sapphire" },
      { q: "Chipped", t: "Topaz" },
      { q: "Chipped", t: "Ruby" }
    ]
  },
  {
    name: "Star Ruby",
    requires: [
      { q: "Flawed", t: "Ruby" },
      { q: "Chipped", t: "Ruby" },
      { q: "Chipped", t: "Topaz" }
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
  "Jade": {
    name: "Emerald Resonance",
    effect: "Increases poison damage by 50%."
  },
  "Red Crystal": {
    name: "Magma Burst",
    effect: "Increases splash radius and impact damage."
  },
  "Dark Emerald": {
    name: "Shadow Decay",
    effect: "Applies armor reduction alongside poison."
  },
  "Yellow Sapphire": {
    name: "Solar Flare",
    effect: "Increases attack speed and range."
  },
  "Star Ruby": {
    name: "Starlight Cascade",
    effect: "Strikes up to 2 additional targets."
  }
};
