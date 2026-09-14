// js/definitions/comboGems.js
//
// STATUS: DATA ONLY. This is a wholesale replacement of the old 13-gem combo
// system with the full "Advanced towers" tree you supplied (44 towers: 38
// combined + 6 secret). It is NOT wired into the crafting engine yet - see
// the note at the bottom of this file for what that needs.
//
// Structural differences from the old system, and why the old engine can't
// run this data as-is:
//   - Recipes can require OTHER COMBO TOWERS as ingredients (Silver Knight
//     needs a Silver), several tiers deep in places (Malachite -> Vivid
//     Malachite -> Uranium-238 -> Uranium-235 -> Depleted-Kyparium). The old
//     engine only ever matches a fixed roll of 3 base gems against a flat
//     recipe list.
//   - Some recipes have an ALTERNATE form (the "|" lines) - see
//     `altSubstitute` below.
//   - Recipes can have more than 3 ingredients (Yaphets Stone and Burning
//     Stone use 4; several final-tier recipes use 6 when you count the
//     alternate substitution).
//   - Each tower here is a single stat block (no in-place tiers/levels of
//     its own) - progression happens by re-combining into the next named
//     tower, not by upgrading in place. Because of that these use `stats`
//     (a flat object), not `tiers` (an array) - getGemStats() already falls
//     back to `def.stats` when `def.tiers` is absent, so a combo gem
//     defined this way will render correctly once one exists on the board.
//
// RECIPE FORMAT
//   ingredients: array of either
//     - a base-gem code string, e.g. 'B4' = letter + tier digit (1-6).
//       Letter -> GEM_TYPES key: B=Sapphire, D=Diamond, E=Opal, G=Emerald,
//       P=Amethyst, Q=Aquamarine, R=Ruby, Y=Topaz. Digit 1-6 -> GEM_LEVELS
//       index 0-5 (digit - 1).
//     - { combo: 'Tower Name' } - another entry in COMBO_GEMS.
//   altSubstitute (optional): { replace: 'X6', with: ['X1','X2','X3','X4','X5'] }
//     - lets the recipe be completed with one of each of tiers 1-5 of that
//       gem letter sitting on the board simultaneously, instead of a single
//       tier-6 gem. Confirmed pattern across every "| ..." line in the
//       source: the substitution always targets exactly one of the
//       recipe's tier-6 ingredients, matched by letter.
//
// ABILITY FIELDS
// Fields that map onto mechanics the engine already has (splashPct/
// splashRadius, slowFlat/slowDur, poisonDps/poisonDur, armourReduction,
// auraArmourReduction/auraRadius, auraSlowPct/auraRadius, auraDamagePct/
// auraRadius, auraPct [attack-speed aura, radius from the gem-type-level
// `auraRadius`], critChance/critMult, stunChance/stunDur, maxTargets,
// trueDamage) are wired exactly as those mechanics already work for the
// old combo gems and basic gems.
//
// Fields prefixed `NEW_` are abilities this engine has no mechanic for yet
// at all (chain/forked lightning, petrification, range-buff auras,
// evasion-bypass auras, gold-multiplier auras, on-hit splash-slow, a
// self-disarm chance, "resist magic"/heal-the-castle - the last two don't
// obviously map onto anything this prototype tracks, since towers are
// never themselves attacked and there's no castle-HP concept here). The
// raw source values are stored so nothing has to be re-derived later, but
// none of them do anything in combat yet.
//
// A few abilities in the source have no tooltip at all (e10001, e10002,
// etc. - empty Name/Tooltip rows) - these are skipped entirely as
// unknown/unrecoverable rather than guessed at.
//
// "Pierce Spell Immunity: true" on several towers is flagged as
// `piercesMagicImmune: true` (source-confirmed) but not wired - the engine
// currently blocks all magic damage outright on magicImmune creeps in
// mitigateDamage(), with no bypass mechanism yet.
//
// A couple of numeric mismatches between a tooltip's rounded English and
// its Raw tag are called out inline; Raw is treated as authoritative for
// exact numbers since it's the literal applied value, not player-facing
// rounding - flagged rather than silently picking one.
//
// RANGE_SCALE: same convention as gemTypes.js (0.2), so these towers sit in
// the same visual/tactical scale as everything else already on the board.
export const RANGE_SCALE = 0.2;
const R = n => Math.round(n * RANGE_SCALE);

export const COMBO_GEMS = {

  "Silver": {
    colour: '#c0c0c0', icon: '🌙', short: 'SLV', role: 'Slowing',
    stats: { dmgMin: 30, dmgMax: 30, cooldown: 1000, range: R(600), damageType: 'magic',
      slowFlat: 90, slowDur: 1200 } // slowDur ESTIMATE, see file header
  },

  "Silver Knight": {
    colour: '#b0b8c0', icon: '🛡️', short: 'SK', role: 'Cleave + Slow',
    stats: { dmgMin: 100, dmgMax: 100, cooldown: 800, range: R(700), damageType: 'physical',
      splashPct: 0.50, splashRadius: R(400), slowFlat: 120, slowDur: 1200 }
  },

  "Pink Diamond": {
    colour: '#f8bbd0', icon: '💗', short: 'PD', role: 'Crit',
    stats: { dmgMin: 110, dmgMax: 110, cooldown: 1000, range: R(600), damageType: 'physical', // 30 base + 80 bonus
      critChance: 0.10, critMult: 5, piercesMagicImmune: true }
  },

  "Huge Pink Diamond": {
    colour: '#f48fb1', icon: '💗', short: 'HPD', role: 'Cleave + Crit + Slow',
    stats: { dmgMin: 310, dmgMax: 310, cooldown: 800, range: R(700), damageType: 'physical', // 150 + 160
      splashPct: 0.50, splashRadius: R(400), critChance: 0.10, critMult: 5, piercesMagicImmune: true,
      slowFlat: 120, slowDur: 1200 }
  },

  "Koh-i-noor Diamond": {
    colour: '#ffffff', icon: '💎', short: 'KD', role: 'Cleave + Crit + Armour Shred',
    stats: { dmgMin: 1300, dmgMax: 1300, cooldown: 600, range: R(700), damageType: 'physical', // 660 + 640
      splashPct: 0.50, splashRadius: R(400), critChance: 0.10, critMult: 5, piercesMagicImmune: true,
      armourReduction: 64 }
  },

  "Malachite": {
    colour: '#10ac84', icon: '🔗', short: 'MLC', role: 'Multi-Target',
    stats: { dmgMin: 15, dmgMax: 15, cooldown: 800, range: R(600), damageType: 'magic', maxTargets: 3 }
  },

  "Vivid Malachite": {
    colour: '#0e9c76', icon: '🔗', short: 'VMLC', role: 'Multi-Target',
    stats: { dmgMin: 50, dmgMax: 50, cooldown: 700, range: R(700), damageType: 'magic', maxTargets: 5 }
  },

  "Uranium-238": {
    colour: '#8bc34a', icon: '☢️', short: 'U238', role: 'Multi-Target',
    stats: { dmgMin: 120, dmgMax: 120, cooldown: 700, range: R(700), damageType: 'physical', maxTargets: 10 }
  },

  "Uranium-235": {
    colour: '#7cb342', icon: '☢️', short: 'U235', role: 'Multi-Target',
    stats: { dmgMin: 220, dmgMax: 220, cooldown: 700, range: R(800), damageType: 'physical', maxTargets: 10 } // 60 + 160
  },

  "Depleted-Kyparium": {
    colour: '#689f38', icon: '☢️', short: 'DK', role: 'Multi-Target',
    stats: { dmgMin: 410, dmgMax: 410, cooldown: 400, range: R(5000), damageType: 'physical', maxTargets: 10 } // 90 + 320
  },

  "Asteriated Ruby": {
    colour: '#ad1457', icon: '🔥', short: 'AR', role: 'Burn Aura',
    auraRadius: R(400), // NEW_auraBurn radius - not read anywhere yet
    stats: { dmgMin: 0, dmgMax: 0, cooldown: 1000, range: R(600), damageType: 'physical',
      NEW_auraBurnDps: 60, NEW_auraBurnRadius: R(400) }
  },

  "Volcano": {
    colour: '#c2185b', icon: '🌋', short: 'VLC', role: 'Burn Aura',
    auraRadius: R(500),
    stats: { dmgMin: 0, dmgMax: 0, cooldown: 1000, range: R(600), damageType: 'physical',
      NEW_auraBurnDps: 320, NEW_auraBurnRadius: R(500) }
  },

  "Bloodstone": {
    colour: '#7f1d1d', icon: '🩸', short: 'BLS', role: 'Chain Lightning',
    stats: { dmgMin: 35, dmgMax: 35, cooldown: 1000, range: R(700), damageType: 'physical',
      NEW_chainChance: 0.30, NEW_chainDamage: 150, NEW_chainRadius: R(1000), NEW_chainBounces: 5,
      piercesMagicImmune: false }
  },

  "Antique Bloodstone": {
    colour: '#5d1414', icon: '🩸', short: 'ABLS', role: 'Forked Lightning + Burn Aura',
    auraRadius: R(500),
    stats: { dmgMin: 70, dmgMax: 70, cooldown: 1000, range: R(800), damageType: 'physical',
      NEW_forkChance: 0.25, NEW_forkDamage: 2500, NEW_forkTargets: 5, NEW_forkStartRadius: R(100), NEW_forkEndRadius: R(3000),
      NEW_auraBurnDps: 320, NEW_auraBurnRadius: R(500), piercesMagicImmune: false }
  },

  "The Crown Prince": {
    colour: '#4a0e0e', icon: '👑', short: 'TCP', role: 'Forked Lightning + Burn + Poison',
    auraRadius: R(800),
    stats: { dmgMin: 70, dmgMax: 70, cooldown: 1000, range: R(800), damageType: 'physical',
      NEW_forkChance: 0.25, NEW_forkDamage: 2500, NEW_forkTargets: 5, NEW_forkStartRadius: R(100), NEW_forkEndRadius: R(3000),
      NEW_auraBurnDps: 2500, NEW_auraBurnRadius: R(800), // tooltip value; Raw's "every 2s deals 5000" reads as a
                                                          // source inconsistency (that's 2500 dps averaged anyway)
      poisonDps: 128, poisonDur: 5000, piercesMagicImmune: false }
  },

  "Jade": {
    colour: '#00b894', icon: '🍀', short: 'JD', role: 'Poison',
    stats: { dmgMin: 10, dmgMax: 10, cooldown: 500, range: R(800), damageType: 'magic',
      poisonDps: 16, poisonDur: 5000 }
  },

  "Quartz": {
    colour: '#e1bee7', icon: '💠', short: 'QTZ', role: 'Anti-Air Aura',
    auraRadius: R(600),
    stats: { dmgMin: 15, dmgMax: 15, cooldown: 600, range: R(500), damageType: 'physical',
      // Tooltip says "-150 speed", Raw tag says [MOVESPEED: -250] - used
      // Raw as the authoritative applied value, tooltip flagged as likely
      // a rounding/typo in the source.
      NEW_antiFlyArmourReduction: 10, NEW_antiFlySlowFlat: 250, NEW_auraRadius: R(600) }
  },

  "Grey Jade": {
    colour: '#80cbc4', icon: '🍀', short: 'GJD', role: 'Poison + Range Aura',
    stats: { dmgMin: 30, dmgMax: 30, cooldown: 500, range: R(800), damageType: 'magic',
      poisonDps: 32, poisonDur: 5000, NEW_auraRangeBonus: R(300), NEW_auraRangeRadius: R(290) }
  },

  "Monkey King Jade": {
    colour: '#ffca28', icon: '🐵', short: 'MKJ', role: 'Poison + Range Aura + True Strike Aura',
    stats: { dmgMin: 80, dmgMax: 80, cooldown: 500, range: R(1000), damageType: 'magic',
      poisonDps: 32, poisonDur: 5000, NEW_auraRangeBonus: R(300), NEW_auraRangeRadius: R(290),
      NEW_auraTrueStrikeRadius: R(300) }
  },

  "Diamond Cullinan": {
    colour: '#eeeeee', icon: '✦', short: 'DC', role: 'Crit + Range Aura + True Strike Aura',
    stats: { dmgMin: 3154, dmgMax: 3154, cooldown: 800, range: R(1200), damageType: 'physical', // 2514 + 640
      critChance: 0.10, critMult: 5, piercesMagicImmune: true,
      NEW_auraRangeBonus: R(300), NEW_auraRangeRadius: R(290), NEW_auraTrueStrikeRadius: R(300) }
  },

  "Lucky Chinese Jade": {
    colour: '#a5d6a7', icon: '🍀', short: 'LCJ', role: 'Poison + Anti-Air Aura',
    stats: { dmgMin: 30, dmgMax: 30, cooldown: 500, range: R(900), damageType: 'magic',
      poisonDps: 32, poisonDur: 5000,
      NEW_antiFlyArmourReduction: 10, NEW_antiFlySlowFlat: 250, NEW_auraRadius: R(600),
      NEW_healCastleChance: 0.01 } // no castle-HP concept in this engine - not applicable
  },

  "Charming Lazurite": {
    colour: '#5c6bc0', icon: '💠', short: 'CL', role: 'Anti-Air Aura',
    stats: { dmgMin: 30, dmgMax: 30, cooldown: 600, range: R(800), damageType: 'physical',
      NEW_antiFlyArmourReduction: 10, NEW_antiFlySlowFlat: 250, NEW_antiFlyMagicResistReduction: 0.50,
      NEW_auraRadius: R(600), piercesMagicImmune: true }
  },

  "Golden Jubilee": {
    colour: '#ffd54f', icon: '👑', short: 'GJ', role: 'Anti-Air Aura + Bonus Magic',
    stats: { dmgMin: 1, dmgMax: 1, cooldown: 700, range: R(800), damageType: 'physical',
      NEW_antiFlyArmourReduction: 10, NEW_antiFlySlowFlat: 250, NEW_antiFlyMagicResistReduction: 0.50,
      NEW_auraRadius: R(600), NEW_bonusMagicDamagePct: 1.0 }
  },

  "Gold": {
    colour: '#f1c40f', icon: '🪙', short: 'GLD', role: 'Armour Shred',
    stats: { dmgMin: 60, dmgMax: 60, cooldown: 800, range: R(600), damageType: 'physical',
      armourReduction: 32, piercesMagicImmune: true }
  },

  "Egypt Gold": {
    colour: '#f9a825', icon: '🪙', short: 'EGLD', role: 'Armour Shred + Gold Aura',
    stats: { dmgMin: 100, dmgMax: 100, cooldown: 800, range: R(700), damageType: 'physical',
      armourReduction: 48, piercesMagicImmune: true,
      NEW_auraGreedyChance: 0.05, NEW_auraGreedyMult: 10, NEW_auraRadius: R(800) }
  },

  "Dark Emerald": {
    colour: '#1e5631', icon: '💫', short: 'DE', role: 'Stun',
    stats: { dmgMin: 80, dmgMax: 80, cooldown: 500, range: R(700), damageType: 'magic',
      stunChance: 0.10, stunDur: 2000 }
  },

  "Emerald Golem": {
    colour: '#2e7d32', icon: '🗿', short: 'EG', role: 'Stun + Armour Shred + Petrify',
    stats: { dmgMin: 170, dmgMax: 170, cooldown: 500, range: R(700), damageType: 'magic',
      stunChance: 0.10, stunDur: 2000, armourReduction: 32, piercesMagicImmune: true,
      NEW_stoneGazeChance: 0.01, NEW_stoneGazeRadius: R(1000), NEW_stoneGazeRootDur: 3000, NEW_stoneGazeBonusPhysicalPct: 1.0 }
  },

  "Paraiba Tourmaline": {
    colour: '#26a69a', icon: '🌀', short: 'PT', role: 'Armour Aura',
    stats: { dmgMin: 30, dmgMax: 30, cooldown: 600, range: R(600), damageType: 'physical',
      auraArmourReduction: 15, auraRadius: R(800), piercesMagicImmune: false }
  },

  "Elaborately Carved Tourmaline": {
    colour: '#00897b', icon: '🌀', short: 'ECT', role: 'Stun + Armour Aura',
    stats: { dmgMin: 130, dmgMax: 130, cooldown: 600, range: R(700), damageType: 'physical',
      stunChance: 0.10, stunDur: 2000, auraArmourReduction: 30, auraRadius: R(1200), piercesMagicImmune: true }
  },

  "Sapphire Star Of Adam": {
    colour: '#1565c0', icon: '✡️', short: 'SSOA', role: 'Poison + Armour Shred + Armour Aura + Slow Splash',
    stats: { dmgMin: 42, dmgMax: 42, cooldown: 1000, range: R(800), damageType: 'physical',
      poisonDps: 128, poisonDur: 5000, armourReduction: 64,
      auraArmourReduction: 30, auraRadius: R(1200), piercesMagicImmune: true,
      NEW_onHitSplashSlowPct: 0.50, NEW_onHitSplashSlowRadius: R(300), NEW_onHitSplashSlowDur: 3000, NEW_disablesHealing: true }
  },

  "Deep Sea Pearl": {
    colour: '#4fc3f7', icon: '🦪', short: 'DSP', role: 'Tower-Resist Aura',
    stats: { dmgMin: 80, dmgMax: 80, cooldown: 600, range: R(500), damageType: 'physical',
      NEW_auraTowerMagicImmuneRadius: R(600) } // no tower-takes-damage concept in this engine - not applicable
  },

  "Chrysoberyl Cat's Eye": {
    colour: '#8d6e63', icon: '👁️', short: 'CCE', role: 'Attack Speed + Damage Aura',
    auraRadius: R(664), // attack-speed aura radius (gem-type-level, matches Opal's convention)
    stats: { dmgMin: 6, dmgMax: 6, cooldown: 1000, range: R(500), damageType: 'physical',
      auraPct: 0.60, auraDamagePct: 0.50, auraRadius: R(500) } // per-tier auraRadius here drives auraDamagePct only
  },

  "Red Coral": {
    colour: '#e53935', icon: '🪸', short: 'RCR', role: 'Attack Speed + Damage Aura + Tower-Resist Aura',
    auraRadius: R(664),
    // Source grants both aura4 (+50%) and aura5 (+60%) attack-speed at once;
    // collapsed to the stronger one since a gem only has one auraPct slot.
    stats: { dmgMin: 120, dmgMax: 120, cooldown: 600, range: R(500), damageType: 'physical',
      auraPct: 0.60, auraDamagePct: 0.50, auraRadius: R(500),
      NEW_auraTowerMagicImmuneRadius: R(600) }
  },

  "Natural Zumurud": {
    colour: '#00c853', icon: '💚', short: 'NZ', role: 'Single-Target',
    stats: { dmgMin: 80, dmgMax: 80, cooldown: 1000, range: R(500), damageType: 'physical' }
  },

  "Carmen-Lucia": {
    colour: '#d32f2f', icon: '👑', short: 'CML', role: 'Attack Speed + Damage Aura + Tower-Resist Aura',
    // Source stacks THREE attack-speed auras at different radii (aura6
    // +70%@664, otomad +200%@200). Only one auraPct/auraRadius slot exists
    // per gem, so this collapses to the strongest (otomad) - flagged as a
    // simplification, the wider/weaker aura6 effect is dropped rather than
    // silently averaged.
    auraRadius: R(200),
    stats: { dmgMin: 6, dmgMax: 6, cooldown: 1000, range: R(500), damageType: 'magic',
      auraPct: 2.0, auraDamagePct: 0.50, auraRadius: R(500),
      NEW_auraTowerMagicImmuneRadius: R(600) }
  },

  "Yellow Sapphire": {
    colour: '#fdd835', icon: '🌟', short: 'YS', role: 'Area Slow',
    stats: { dmgMin: 20, dmgMax: 20, cooldown: 1000, range: R(600), damageType: 'physical',
      auraSlowPct: 0.70, auraRadius: R(300) }
  },

  "Northern Saber's Eye": {
    colour: '#4dd0e1', icon: '❄️', short: 'NSE', role: 'Area Slow + Chain Frost',
    stats: { dmgMin: 60, dmgMax: 60, cooldown: 1000, range: R(500), damageType: 'physical',
      auraSlowPct: 0.70, auraRadius: R(300),
      NEW_chainFrostChance: 0.25, NEW_chainFrostBounces: 10, piercesMagicImmune: false }
  },

  "Star Sapphire": {
    colour: '#81d4fa', icon: '⭐', short: 'SS', role: 'Slow + Area Slow + Attack Speed Aura',
    auraRadius: R(664),
    stats: { dmgMin: 20, dmgMax: 20, cooldown: 1000, range: R(600), damageType: 'physical',
      slowFlat: 480, slowDur: 1200, auraSlowPct: 0.75, auraRadius: R(556), auraPct: 0.70 }
  },

  // ---- Secret towers ----

  "Obsidian": {
    colour: '#212121', icon: '🖤', short: 'OBS', role: 'Cleave + Slow',
    stats: { dmgMin: 820, dmgMax: 820, cooldown: 800, range: R(800), damageType: 'physical', // 180 + 640
      splashPct: 0.70, splashRadius: R(500), slowFlat: 180, slowDur: 1200 }
  },

  "Agate": {
    colour: '#6d4c41', icon: '🟤', short: 'AGT', role: 'Multi-Target',
    stats: { dmgMin: 430, dmgMax: 430, cooldown: 300, range: R(5000), damageType: 'physical', maxTargets: 5 } // 110 + 320
  },

  "Fantastic Miss Shrimp": {
    colour: '#ff7043', icon: '🦐', short: 'FMS', role: 'Chain + Fork Lightning',
    stats: { dmgMin: 1225, dmgMax: 1225, cooldown: 500, range: R(1000), damageType: 'physical', // 585 + 640
      NEW_selfDisarmChance: 0.03, NEW_selfDisarmDur: 5000, // a self-debuff, kept for fidelity even though it's a downside
      NEW_chainChance: 0.30, NEW_chainDamage: 150, NEW_chainRadius: R(1000), NEW_chainBounces: 5,
      NEW_forkChance: 0.25, NEW_forkDamage: 2500, NEW_forkTargets: 5, NEW_forkStartRadius: R(100), NEW_forkEndRadius: R(3000),
      piercesMagicImmune: false }
  },

  "Yaphets Stone": {
    colour: '#37474f', icon: '🗿', short: 'YPS', role: 'Armour Shred + Armour Aura + Anti-Air Aura',
    stats: { dmgMin: 140, dmgMax: 140, cooldown: 1000, range: R(800), damageType: 'physical',
      auraArmourReduction: 30, auraRadius: R(1200), armourReduction: 64, piercesMagicImmune: true,
      NEW_antiFlyArmourReduction: 64, NEW_antiFlySlowFlat: 480, NEW_antiFlyMagicResistReduction: 1.0, NEW_auraRadius: R(600) }
  },

  "Burning Stone": {
    colour: '#bf360c', icon: '🔥', short: 'BNS', role: 'Burn Aura',
    auraRadius: R(800),
    stats: { dmgMin: 0, dmgMax: 0, cooldown: 500, range: R(600), damageType: 'physical',
      NEW_auraBurnDps: 2500, NEW_auraBurnRadius: R(800) }
  },

  // Listed with full stats in the source but absent from its own "Secret
  // towers" summary list, and given no Combination line at all (just "~
  // ~") - kept in with `craftable: false` rather than guessing at a recipe.
  "The Great Stone": {
    colour: '#000000', icon: '⚫', short: 'TGS', role: 'Cleave + Crit', craftable: false,
    stats: { dmgMin: 2009, dmgMax: 2009, cooldown: 1000, range: R(800), damageType: 'physical', // 1369 + 640
      critChance: 0.10, critMult: 5, piercesMagicImmune: true, splashPct: 1.00, splashRadius: R(700) }
  }
};

export const RECIPES = {
  "Silver":                        { ingredients: ['B1', 'Y1', 'D1'] },
  "Silver Knight":                 { ingredients: [{ combo: 'Silver' }, 'Q2', 'R3'] },
  "Pink Diamond":                  { ingredients: ['D5', 'Y3', 'D3'] },
  "Huge Pink Diamond":             { ingredients: [{ combo: 'Pink Diamond' }, { combo: 'Silver Knight' }, { combo: 'Silver' }] },
  "Koh-i-noor Diamond":            { ingredients: [{ combo: 'Huge Pink Diamond' }, 'P6', 'D6'],
                                      altSubstitute: { replace: 'P6', with: ['P1', 'P2', 'P3', 'P4', 'P5'] } },

  "Malachite":                     { ingredients: ['E1', 'Q1', 'G1'] },
  "Vivid Malachite":               { ingredients: [{ combo: 'Malachite' }, 'D2', 'Y3'] },
  "Uranium-238":                   { ingredients: ['Y5', 'E2', 'B3'] },
  "Uranium-235":                   { ingredients: [{ combo: 'Uranium-238' }, { combo: 'Vivid Malachite' }, { combo: 'Malachite' }] },
  "Depleted-Kyparium":             { ingredients: [{ combo: 'Uranium-235' }, 'Q6', 'Y6'],
                                      altSubstitute: { replace: 'Q6', with: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'] } },

  "Asteriated Ruby":               { ingredients: ['R2', 'R1', 'P1'] },
  "Volcano":                       { ingredients: [{ combo: 'Asteriated Ruby' }, 'R4', 'P3'] },
  "Bloodstone":                    { ingredients: ['R5', 'Q4', 'P3'] },
  "Antique Bloodstone":            { ingredients: [{ combo: 'Bloodstone' }, { combo: 'Volcano' }, 'R2'] },
  "The Crown Prince":              { ingredients: [{ combo: 'Antique Bloodstone' }, 'R6', 'G6'],
                                      altSubstitute: { replace: 'R6', with: ['R1', 'R2', 'R3', 'R4', 'R5'] } },

  "Jade":                          { ingredients: ['G3', 'E3', 'B2'] },
  "Quartz":                        { ingredients: ['G4', 'R3', 'P2'] },
  "Grey Jade":                     { ingredients: [{ combo: 'Jade' }, 'B4', 'Q3'] },
  "Monkey King Jade":              { ingredients: [{ combo: 'Grey Jade' }, 'G4', 'P2'] },
  "Diamond Cullinan":              { ingredients: [{ combo: 'Monkey King Jade' }, 'D6', 'B6'],
                                      altSubstitute: { replace: 'D6', with: ['D1', 'D2', 'D3', 'D4', 'D5'] } },

  "Lucky Chinese Jade":            { ingredients: [{ combo: 'Jade' }, { combo: 'Quartz' }, 'G3'] },
  "Charming Lazurite":             { ingredients: [{ combo: 'Quartz' }, 'P4', 'Y2'] },
  "Golden Jubilee":                { ingredients: [{ combo: 'Charming Lazurite' }, 'Y6', 'R6'],
                                      altSubstitute: { replace: 'Y6', with: ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'] } },

  "Gold":                          { ingredients: ['P5', 'P4', 'D2'] },
  "Egypt Gold":                    { ingredients: [{ combo: 'Gold' }, 'P5', 'Q2'] },
  "Dark Emerald":                  { ingredients: ['G5', 'B4', 'Y2'] },
  "Emerald Golem":                 { ingredients: [{ combo: 'Gold' }, { combo: 'Dark Emerald' }, 'D3'] },

  "Paraiba Tourmaline":            { ingredients: ['Q5', 'E4', 'G2'] },
  "Elaborately Carved Tourmaline": { ingredients: [{ combo: 'Paraiba Tourmaline' }, { combo: 'Dark Emerald' }, 'G2'] },
  "Sapphire Star Of Adam":         { ingredients: [{ combo: 'Elaborately Carved Tourmaline' }, 'G6', 'P6'],
                                      altSubstitute: { replace: 'G6', with: ['G1', 'G2', 'G3', 'G4', 'G5'] } },

  "Deep Sea Pearl":                { ingredients: ['Q4', 'D4', 'E2'] },
  "Chrysoberyl Cat's Eye":         { ingredients: ['E5', 'D4', 'Q3'] },
  "Red Coral":                     { ingredients: [{ combo: "Chrysoberyl Cat's Eye" }, { combo: 'Deep Sea Pearl' }, 'E4'] },
  "Natural Zumurud":               { ingredients: [{ combo: 'Deep Sea Pearl' }, 'G5', 'D3'] },
  "Carmen-Lucia":                  { ingredients: [{ combo: 'Red Coral' }, 'E6', 'Q6'],
                                      altSubstitute: { replace: 'E6', with: ['E1', 'E2', 'E3', 'E4', 'E5'] } },

  "Yellow Sapphire":               { ingredients: ['B5', 'Y4', 'R4'] },
  "Northern Saber's Eye":          { ingredients: [{ combo: 'Yellow Sapphire' }, { combo: 'Bloodstone' }, 'B5'] },
  "Star Sapphire":                 { ingredients: [{ combo: 'Yellow Sapphire' }, 'B6', 'E6'],
                                      altSubstitute: { replace: 'B6', with: ['B1', 'B2', 'B3', 'B4', 'B5'] } },

  // ---- Secret towers ----
  "Obsidian":                      { ingredients: ['B5', 'Y5', 'D5'] },
  "Agate":                         { ingredients: ['Q5', 'E5', 'G5'] },
  "Fantastic Miss Shrimp":         { ingredients: ['R5', 'G5', 'B5'] },
  "Yaphets Stone":                 { ingredients: ['B5', 'G5', 'B4', 'G4'] },
  "Burning Stone":                 { ingredients: ['R5', 'P5', 'R4', 'P4'] }

  // "The Great Stone" intentionally has no entry here - the source gives it
  // no Combination line (see the `craftable: false` note on its COMBO_GEMS
  // entry above).
};

// ---------------------------------------------------------------------------
// Letter / quality mapping for recipe codes (e.g. 'B1' = Chipped Sapphire)
// Digit 1-5 map to GEM_LEVELS[0..4]. Digit 6 is treated as Perfect (index 4)
// because this engine only has 5 quality tiers.
// ---------------------------------------------------------------------------
export const CODE_LETTER_TO_TYPE = {
  B: 'Sapphire',
  D: 'Diamond',
  E: 'Opal',
  G: 'Emerald',
  P: 'Amethyst',
  Q: 'Aquamarine',
  R: 'Ruby',
  Y: 'Topaz'
};

export function parseIngredientCode(code) {
  if (typeof code !== 'string' || code.length < 2) return null;
  const letter = code[0];
  const digit = parseInt(code.slice(1), 10);
  const type = CODE_LETTER_TO_TYPE[letter];
  if (!type || isNaN(digit)) return null;
  const level = Math.min(Math.max(digit - 1, 0), 4); // clamp to 0..4
  return { type, level, q: ['Chipped','Flawed','Normal','Flawless','Perfect'][level], t: type, code };
}

/** Build old-style { name, requires: [{q,t}, ...] } entries for pure base-gem recipes
 *  so the existing matchCombo / recipes panel / board-combine paths work. */
function buildCombinationsFromRecipes() {
  const out = [];
  for (const [name, recipe] of Object.entries(RECIPES)) {
    if (!recipe || !Array.isArray(recipe.ingredients)) continue;
    // Only pure base-gem recipes (no {combo: ...} and exactly 3 codes) for the
    // classic 3-roll combine path. Higher-tier recipes still appear via RECIPES.
    const codes = recipe.ingredients.filter(i => typeof i === 'string');
    if (codes.length !== recipe.ingredients.length) continue; // has combo ingredients
    if (codes.length !== 3) continue;
    const requires = codes.map(c => {
      const p = parseIngredientCode(c);
      return p ? { q: p.q, t: p.t } : null;
    }).filter(Boolean);
    if (requires.length === 3) {
      out.push({ name, requires, sourceCodes: codes });
    }
  }
  return out;
}

export const COMBINATIONS = buildCombinationsFromRecipes();
export const COMBO_UPGRADES = {};

// Helper used by the engine to list every recipe (base + combo-ingredient) for the recipes modal.
export function getAllRecipesForDisplay() {
  const LEVELS = ['Chipped','Flawed','Normal','Flawless','Perfect'];
  return Object.entries(RECIPES).map(([name, recipe]) => {
    const requires = (recipe.ingredients || []).map(ing => {
      if (typeof ing === 'string') {
        const p = parseIngredientCode(ing);
        return p ? { q: p.q, t: p.t, label: `${p.q} ${p.t}`, isCombo: false } : { label: ing, isCombo: false };
      }
      if (ing && ing.combo) {
        return { q: null, t: ing.combo, label: ing.combo, isCombo: true };
      }
      return { label: String(ing), isCombo: false };
    });
    return {
      name,
      requires,
      altSubstitute: recipe.altSubstitute || null,
      craftable: COMBO_GEMS[name] ? COMBO_GEMS[name].craftable !== false : true
    };
  });
}
