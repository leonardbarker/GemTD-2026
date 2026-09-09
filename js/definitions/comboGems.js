// js/definitions/comboGems.js
//
// Special (combination) gem definitions, ported from the original Gem Tower
// Defense special-gem list: https://gemtowerdefense.fandom.com/wiki/Special_gems
//
// Every gem is upgradeable in place via `tiers`: gem.level indexes into the
// array (0 = base combo). Each tier is a full stat block plus `upgradeCost`
// (gold cost to reach the NEXT tier; null on the final tier).
//
// Mechanics beyond the basic-gem set, and which tier fields drive them:
//   maxTargets: Infinity        - hits every creep in range (Mighty Malachite)
//   critChance / critMult       - chance to multiply a hit's damage
//   stunChance / stunDur        - chance to stun the target (ms)
//   armourReduction             - flat armour reduction, STACKS per hit (Gold, Red Crystal)
//   auraArmourReduction/auraRadius - continuous armour-reduction aura, does NOT
//                                  stack, only applies while a creep is in range (Tourmaline)
//   auraSlowPct/auraRadius      - continuous area slow, refreshed every frame a
//                                  creep is in range (Uranium)
//   auraDamagePct/auraRadius    - continuous damage buff to towers in range,
//                                  recalculated every frame (Yellow Sapphire)
//   snapshotBuffPct/snapshotBuffRadius - ONE-TIME damage buff applied to towers
//                                  in range at the moment this tier is reached;
//                                  towers placed later get nothing (Black Opal)
//   killScalePct                - permanent damage bonus per confirmed kill by
//                                  this gem (Star Ruby)
//   ignoresBuffs                 - excluded from damage-buff auras/snapshots
//                                  (Star Ruby)
//   goldOnHitChance              - chance per hit to award floor(round/2) gold
//                                  (Lucky Asian Jade)
//   burnChance/burnTotal/burnDur - chance to apply a flat, unmitigated DoT that
//                                  ignores armour, magic resist, buffs and kill
//                                  scaling (Ancient Blood Stone)
//   manaRegen/manaCap/manaCost/manaChance/manaBurstTotal/manaBurstDur - mana
//                                  pool that gates a bonus burst DoT (Tourmaline)
//   flyingOnly (top-level def flag) - can only target flying creeps (Red Crystal)
//
// A number of exact values are not published on the wiki page (no stat table
// was given for Silver, Star Ruby or Yellow Sapphire; some upgrade costs and
// most damage TYPES are unstated for every gem). Those are marked ESTIMATE in
// the comments below and should be treated as placeholders pending real data
// or your own balancing pass, per the "reproduce first, playtest, balance
// later" plan.

export const COMBO_GEMS = {

  "Malachite": {
    colour: '#10ac84',
    icon: '🔗',
    short: 'MLC',
    role: 'Multi-Target',
    // Damage type ESTIMATE: not stated on the wiki. Two of three ingredients
    // (Opal, Emerald) are magic, one (Aquamarine) is physical - set to magic.
    tiers: [
      { name: 'Malachite',        dmgMin: 6,  dmgMax: 6,   cooldown: 500, range: 107, maxTargets: 3,        damageType: 'magic', upgradeCost: 25 },
      { name: 'Vivid Malachite',  dmgMin: 11, dmgMax: 11,  cooldown: 500, range: 114, maxTargets: 4,        damageType: 'magic', upgradeCost: 280 },
      { name: 'Mighty Malachite', dmgMin: 45, dmgMax: 45,  cooldown: 550, range: 114, maxTargets: Infinity, damageType: 'magic', upgradeCost: null }
    ]
  },

  "Silver": {
    colour: '#c0c0c0',
    icon: '🌙',
    short: 'SLV',
    role: 'Splash Damage',
    // ESTIMATE: the wiki gives only the 36 splash range for Silver - no
    // damage/cooldown/range/damage-type table, and no upgrade path is
    // mentioned. Numbers below are placeholders sized to match Malachite's
    // base (Chipped-tier) combo.
    tiers: [
      { name: 'Silver', dmgMin: 8, dmgMax: 12, cooldown: 750, range: 107, damageType: 'physical', splashRadius: 36, upgradeCost: null }
    ]
  },

  "Star Ruby": {
    colour: '#c62828',
    icon: '✴️',
    short: 'STR',
    role: 'Kill-Scaling Damage',
    // ESTIMATE: no stat table given. killScalePct is invented (wiki only
    // says "damage benefits from kills", no rate) - flagged for balancing.
    // ignoresBuffs reflects the wiki's "not affected by ... any of the opals".
    tiers: [
      { name: 'Star Ruby', dmgMin: 16, dmgMax: 22, cooldown: 800, range: 110, damageType: 'physical', killScalePct: 0.005, ignoresBuffs: true, upgradeCost: null }
    ]
  },

  "Jade": {
    colour: '#00b894',
    icon: '🍀',
    short: 'JD',
    role: 'Poison + Slow + Economy',
    // Fully specified on the wiki. The "50% slowdown" is bundled with the
    // poison tick, so it's applied for the same duration as the poison.
    tiers: [
      { name: 'Jade',             dmgMin: 30, dmgMax: 35, cooldown: 500, range: 114, damageType: 'magic', poisonDps: 5,  poisonDur: 2000, slowPct: 0.50, slowDur: 2000, upgradeCost: 45 },
      { name: 'Asian Jade',       dmgMin: 50, dmgMax: 50, cooldown: 500, range: 114, damageType: 'magic', poisonDps: 10, poisonDur: 3000, slowPct: 0.50, slowDur: 3000, upgradeCost: 250 },
      { name: 'Lucky Asian Jade', dmgMin: 55, dmgMax: 55, cooldown: 350, range: 121, damageType: 'magic', poisonDps: 10, poisonDur: 4000, slowPct: 0.50, slowDur: 4000,
        goldOnHitChance: 0.01, stunChance: 0.01, stunDur: 2000, critChance: 0.05, critMult: 4, upgradeCost: null }
    ]
  },

  "Red Crystal": {
    colour: '#e74c3c',
    icon: '🦇',
    short: 'RC',
    role: 'Flying-Only / Air Armour Reduction',
    flyingOnly: true,
    // Damage type and both upgrade costs are ESTIMATE - the wiki's table has
    // no damage-type column and no "upgrade cost" column for this gem.
    tiers: [
      { name: 'Red Crystal',         dmgMin: 50,  dmgMax: 75,  cooldown: 800, range: 186, damageType: 'physical', armourReduction: 4, upgradeCost: 150 },
      { name: 'Red Crystal Facet',   dmgMin: 75,  dmgMax: 100, cooldown: 800, range: 200, damageType: 'physical', armourReduction: 5, upgradeCost: 300 },
      { name: 'Rose Quartz Crystal', dmgMin: 100, dmgMax: 125, cooldown: 800, range: 214, damageType: 'physical', armourReduction: 6, upgradeCost: null }
    ]
  },

  "Black Opal": {
    colour: '#2c2c54',
    icon: '⬛',
    short: 'BO',
    role: 'Damage Aura + Single Target',
    // Damage type ESTIMATE. Everything else (damage, range, cooldown, upgrade
    // cost, buff %, buff radius) is straight from the wiki, including the
    // "snapshot" behaviour: Mystic Black Opal buffs only the towers that were
    // already in its 171 range at the moment of upgrade.
    tiers: [
      { name: 'Black Opal',        dmgMin: 24, dmgMax: 25, cooldown: 1000, range: 114, damageType: 'physical', upgradeCost: 250 },
      { name: 'Mystic Black Opal', dmgMin: 70, dmgMax: 70, cooldown: 1000, range: 143, damageType: 'physical', snapshotBuffPct: 0.40, snapshotBuffRadius: 171, upgradeCost: null }
    ]
  },

  "Blood Stone": {
    colour: '#7f1d1d',
    icon: '🔥',
    short: 'BS',
    role: 'AoE + Burn',
    // Damage type ESTIMATE. The wiki notes the burn itself "isn't reduced by
    // armor... doesn't benefit from kills or black opal" - implemented as a
    // flat unmitigated DoT via burnChance/burnTotal/burnDur, independent of
    // damageType. Mana is tracked (manaRegen) for tooltip flavour only - the
    // wiki itself calls the exact mana-gating "difficult to judge", so the
    // crit/burn procs here trigger by chance alone, not mana-gated.
    tiers: [
      { name: 'Blood Stone',       dmgMin: 68,  dmgMax: 68,  cooldown: 500, range: 100, damageType: 'physical', splashRadius: 57, upgradeCost: 250 },
      { name: 'Ancient Blood Stone', dmgMin: 160, dmgMax: 240, cooldown: 800, range: 100, damageType: 'physical', splashRadius: 57,
        critChance: 0.15, critMult: 3, burnChance: 0.10, burnTotal: 2500, burnDur: 5000, manaRegen: 2, manaCap: 10, upgradeCost: null }
    ]
  },

  "Dark Emerald": {
    colour: '#1e5631',
    icon: '💫',
    short: 'DE',
    role: 'Single Target + Stun',
    // Damage type ESTIMATE (emerald-line). Stun %, duration, crit % and
    // multiplier are straight from the wiki.
    tiers: [
      { name: 'Dark Emerald',      dmgMin: 90,  dmgMax: 150, cooldown: 800, range: 79,  damageType: 'magic', stunChance: 0.125, stunDur: 1500, upgradeCost: 250 },
      { name: 'Enchanted Emerald', dmgMin: 100, dmgMax: 200, cooldown: 700, range: 100, damageType: 'magic', stunChance: 0.15,  stunDur: 2000, critChance: 0.15, critMult: 4, upgradeCost: null }
    ]
  },

  "Gold": {
    colour: '#f1c40f',
    icon: '🪙',
    short: 'GLD',
    role: 'Armour Reduction',
    // Damage type ESTIMATE ("violet" in the source's colour system, which we
    // don't model - treated as physical). Armour reduction stacks per hit.
    tiers: [
      { name: 'Gold',          dmgMin: 160, dmgMax: 190, cooldown: 1000, range: 114, damageType: 'physical', armourReduction: 5, critChance: 0.25, critMult: 2, upgradeCost: 210 },
      { name: 'Egyptian Gold', dmgMin: 160, dmgMax: 200, cooldown: 750,  range: 114, damageType: 'physical', armourReduction: 8, critChance: 0.30, critMult: 2, upgradeCost: null }
    ]
  },

  "Pink Diamond": {
    colour: '#f8bbd0',
    icon: '💗',
    short: 'PD',
    role: 'High Single-Target Damage',
    // trueDamage ESTIMATE - the wiki doesn't say, but both ingredients and
    // predecessor are Diamond, whose defining trait is armour-piercing true
    // damage, so this carries it forward as a judgement call.
    tiers: [
      { name: 'Pink Diamond',       dmgMin: 150, dmgMax: 175, cooldown: 750, range: 114, damageType: 'physical', trueDamage: true, critChance: 0.10, critMult: 5, upgradeCost: 175 },
      { name: 'Great Pink Diamond', dmgMin: 175, dmgMax: 225, cooldown: 650, range: 121, damageType: 'physical', trueDamage: true, critChance: 0.10, critMult: 8, upgradeCost: null }
    ]
  },

  "Uranium": {
    colour: '#8bc34a',
    icon: '☢️',
    short: 'URN',
    role: 'Area Slow',
    // Damage type and upgrade cost ESTIMATE. Slow is a continuous area aura
    // (auraSlowPct/auraRadius), not an on-hit slow, per the wiki's "slows
    // enemies within range/area". Uranium 235's aura radius is kept equal to
    // Uranium 238's since the wiki only says the 235 slow-area is "smaller
    // than full [attack] range" without giving the actual number.
    tiers: [
      { name: 'Uranium 238', dmgMin: 47, dmgMax: 47, cooldown: 250, range: 64, damageType: 'physical', auraSlowPct: 0.50, auraRadius: 64, upgradeCost: 200 },
      { name: 'Uranium 235', dmgMin: 64, dmgMax: 64, cooldown: 250, range: 85, damageType: 'physical', auraSlowPct: 0.50, auraRadius: 64, upgradeCost: null }
    ]
  },

  "Yellow Sapphire": {
    colour: '#fdd835',
    icon: '🌟',
    short: 'YS',
    role: 'Splash + Damage Buff',
    // ESTIMATE throughout except the 57 splash range: the wiki gives no stat
    // table for Yellow Sapphire at all, only that its buff aura is "roughly
    // the same range as Black Opal" (171) and is always overridden by an
    // active Black Opal snapshot buff (handled in the engine, not here).
    tiers: [
      { name: 'Yellow Sapphire', dmgMin: 90, dmgMax: 120, cooldown: 700, range: 114, damageType: 'physical', splashRadius: 57, auraDamagePct: 0.20, auraRadius: 171, upgradeCost: null }
    ]
  },

  "Tourmaline": {
    colour: '#26a69a',
    icon: '🌀',
    short: 'TRM',
    role: 'Single Target + Armour Reduction + Ability',
    // Damage type and manaCap ESTIMATE. Everything else (damage, range,
    // cooldown, aura armour reduction + radius, mana regen, ability cost/
    // chance/burst) is from the wiki. The armour reduction is a continuous
    // radius aura (not stacking), separate from its attack range.
    tiers: [
      { name: 'Tourmaline',         dmgMin: 10, dmgMax: 400, cooldown: 750, range: 121, damageType: 'physical',
        auraArmourReduction: 4, auraRadius: 85.8, manaRegen: 1.75, manaCap: 10, manaCost: 5, manaChance: 0.20, manaBurstTotal: 200, manaBurstDur: 3000, upgradeCost: 350 },
      { name: 'Paraiba Tourmaline', dmgMin: 30, dmgMax: 420, cooldown: 750, range: 125, damageType: 'physical',
        auraArmourReduction: 6, auraRadius: 93,   manaRegen: 2,    manaCap: 10, manaCost: 5, manaChance: 0.20, manaBurstTotal: 250, manaBurstDur: 3000, upgradeCost: null }
    ]
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
    name: "Silver",
    requires: [
      { q: "Chipped", t: "Sapphire" },
      { q: "Chipped", t: "Diamond" },
      { q: "Chipped", t: "Topaz" }
    ]
  },
  {
    name: "Star Ruby",
    requires: [
      { q: "Chipped", t: "Amethyst" },
      { q: "Chipped", t: "Ruby" },
      { q: "Flawed", t: "Ruby" }
    ]
  },
  {
    name: "Jade",
    requires: [
      { q: "Normal", t: "Emerald" },
      { q: "Normal", t: "Opal" },
      { q: "Flawed", t: "Sapphire" }
    ]
  },
  {
    name: "Red Crystal",
    requires: [
      { q: "Flawless", t: "Emerald" },
      { q: "Normal", t: "Ruby" },
      { q: "Flawed", t: "Amethyst" }
    ]
  },
  {
    name: "Black Opal",
    requires: [
      { q: "Perfect", t: "Opal" },
      { q: "Flawless", t: "Diamond" },
      { q: "Normal", t: "Aquamarine" }
    ]
  },
  {
    name: "Blood Stone",
    requires: [
      { q: "Perfect", t: "Ruby" },
      { q: "Flawless", t: "Aquamarine" },
      { q: "Normal", t: "Amethyst" }
    ]
  },
  {
    name: "Dark Emerald",
    requires: [
      { q: "Perfect", t: "Emerald" },
      { q: "Flawless", t: "Sapphire" },
      { q: "Flawed", t: "Topaz" }
    ]
  },
  {
    name: "Gold",
    requires: [
      { q: "Perfect", t: "Amethyst" },
      { q: "Flawless", t: "Amethyst" },
      { q: "Flawed", t: "Diamond" }
    ]
  },
  {
    name: "Pink Diamond",
    requires: [
      { q: "Perfect", t: "Diamond" },
      { q: "Normal", t: "Diamond" },
      { q: "Normal", t: "Topaz" }
    ]
  },
  {
    name: "Uranium",
    requires: [
      { q: "Perfect", t: "Topaz" },
      { q: "Flawed", t: "Opal" },
      { q: "Normal", t: "Sapphire" }
    ]
  },
  {
    name: "Yellow Sapphire",
    requires: [
      { q: "Perfect", t: "Sapphire" },
      { q: "Flawless", t: "Ruby" },
      { q: "Flawless", t: "Topaz" }
    ]
  },
  {
    name: "Tourmaline",
    requires: [
      { q: "Perfect", t: "Aquamarine" },
      { q: "Flawless", t: "Opal" },
      { q: "Flawed", t: "Aquamarine" },
      { q: "Flawed", t: "Emerald" }
    ]
  }
];

// Legacy single-step upgrade text - unused now that every combo gem has a
// `tiers` array, kept only so any old reference doesn't crash on import.
export const COMBO_UPGRADES = {};
