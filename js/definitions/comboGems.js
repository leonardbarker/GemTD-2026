// js/definitions/comboGems.js
//
// Special (combination) gem definitions, ported from the original Gem Tower
// Defense special-gem list (https://gemtowerdefense.fandom.com/wiki/Special_gems).
//
// Gems with a `tiers` array are upgradeable in place: gem.level indexes into
// `tiers` (0 = base combo, increasing on each gold-funded upgrade). Each tier
// entry is a full stat block plus `upgradeCost` (gold cost to reach the NEXT
// tier; null on the final tier). maxTargets: Infinity means "hits everything
// in range" (Mighty Malachite's "All" targets).
//
// Gems still on the flat `stats` shape are placeholders awaiting their turn
// in the conversion order (Malachite -> Silver -> Star Ruby -> Jade -> Red
// Crystal -> Black Opal -> Blood Stone -> Dark Emerald -> Gold -> Pink
// Diamond -> Uranium -> Yellow Sapphire -> Tourmaline).

export const COMBO_GEMS = {
  "Malachite": {
    colour: '#10ac84',
    icon: '🔗',
    short: 'MLC',
    role: 'Multi-Target',
    // NOTE: the wiki's Malachite entry does not state a damage colour/type.
    // Two of its three ingredients (Opal, Emerald) are magic damage and one
    // (Aquamarine) is physical, so this is set to magic as a judgement call
    // pending confirmation - flag if you want it changed.
    tiers: [
      {
        name: 'Malachite',
        dmgMin: 6, dmgMax: 6,
        cooldown: 500, range: 107,
        maxTargets: 3,
        damageType: 'magic',
        upgradeCost: 25
      },
      {
        name: 'Vivid Malachite',
        dmgMin: 11, dmgMax: 11,
        cooldown: 500, range: 114,
        maxTargets: 4,
        damageType: 'magic',
        upgradeCost: 280
      },
      {
        name: 'Mighty Malachite',
        dmgMin: 45, dmgMax: 45,
        cooldown: 550, range: 114,
        maxTargets: Infinity,
        damageType: 'magic',
        upgradeCost: null
      }
    ]
  },
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
  }
};

export const COMBINATIONS = [
  {
    name: "Malachite",
    requires: [
      { q: "Chipped", t: "Opal" },
      { q: "Chipped", t: "Emerald" },
      { q: "Chipped", t: "Aquamarine" }
    ]
  },
  {
    name: "Silver Knight",
    requires: [
      { q: "Chipped", t: "Ruby" },
      { q: "Chipped", t: "Diamond" },
      { q: "Chipped", t: "Sapphire" }
    ]
  }
];

// Legacy single-step upgrade text, still used for combo gems that haven't
// been converted to the `tiers` shape yet.
export const COMBO_UPGRADES = {
  "Silver Knight": {
    name: "Knight's Bulwark",
    effect: "Adds a chance to stun on hit."
  }
};
