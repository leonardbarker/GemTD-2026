// js/definitions/creeps.js
// Stat guide based creep database. Base values are the single-player [Base] values from the supplied guide.
// The guide provides levels 1-50. After level 50, HP scales from the level-50 value for endless play.

export const CREEP_LEVELS = {
  1: [
    {'name': 'Frenzied Pig', 'hp': 5, 'speed': 525, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  2: [
    {'name': 'Swift Frog', 'hp': 10, 'speed': 600, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  3: [
    {'name': 'Sturdy Yak', 'hp': 20, 'speed': 525, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  4: [
    {'name': 'Smart Robot', 'hp': 20, 'speed': 1000, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  5: [
    {'name': 'Baby Panda', 'hp': 24, 'speed': 500, 'armour': 0, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': ''},
    {'name': 'Balloon Badger', 'hp': 22, 'speed': 500, 'armour': 0, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': ''},
  ],
  6: [
    {'name': 'Tardy Stump', 'hp': 100, 'speed': 450, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  7: [
    {'name': 'Satisfied Lizard', 'hp': 100, 'speed': 600, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  8: [
    {'name': 'Invisible Spider', 'hp': 70, 'speed': 750, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'invisible'},
  ],
  9: [
    {'name': 'Dusky', 'hp': 120, 'speed': 600, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0.5, 'ability': ''},
  ],
  10: [
    {'name': 'Invincible Dog', 'hp': 2100, 'speed': 750, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  11: [
    {'name': 'Sheep', 'hp': 300, 'speed': 525, 'armour': 4, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  12: [
    {'name': 'Funny Alpaca', 'hp': 450, 'speed': 600, 'armour': 4, 'magicResist': 0.2, 'flying': false, 'evasion': 0, 'ability': 'disarm'},
  ],
  13: [
    {'name': 'Pig Princess', 'hp': 800, 'speed': 600, 'armour': 4, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  14: [
    {'name': 'Bulldog', 'hp': 1100, 'speed': 600, 'armour': 4, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'refraction'},
  ],
  15: [
    {'name': 'Cat & Dog', 'hp': 400, 'speed': 700, 'armour': 4, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': ''},
    {'name': 'Bamboo Addict', 'hp': 440, 'speed': 600, 'armour': 4, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': ''},
  ],
  16: [
    {'name': 'Young Demon', 'hp': 950, 'speed': 800, 'armour': 4, 'magicResist': 1.0, 'flying': false, 'evasion': 0, 'ability': 'magicImmune'},
  ],
  17: [
    {'name': 'Belted Chicken', 'hp': 1600, 'speed': 600, 'armour': 4, 'magicResist': 0.5, 'flying': false, 'evasion': 0, 'ability': 'untouchable'},
  ],
  18: [
    {'name': 'Bajie', 'hp': 3000, 'speed': 675, 'armour': 4, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'disarm'},
  ],
  19: [
    {'name': 'Exquisite Rabbit', 'hp': 2200, 'speed': 1000, 'armour': 4, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'rush'},
    {'name': 'Donkey Trio', 'hp': 3700, 'speed': 700, 'armour': 4, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'rush'},
  ],
  20: [
    {'name': 'Shakbag', 'hp': 34000, 'speed': 900, 'armour': 0, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  21: [
    {'name': 'Ripper', 'hp': 7500, 'speed': 675, 'armour': 8, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
    {'name': 'Crab', 'hp': 9000, 'speed': 700, 'armour': 8, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': ''},
  ],
  22: [
    {'name': 'Lockjaw', 'hp': 9000, 'speed': 600, 'armour': 20, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'highArmour'},
  ],
  23: [
    {'name': 'Flopjaw', 'hp': 12000, 'speed': 650, 'armour': 8, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'physicalImmune_refraction'},
    {'name': 'Trapjaw', 'hp': 10000, 'speed': 625, 'armour': 8, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'physicalImmune_refraction'},
  ],
  24: [
    {'name': 'Mech Donkey', 'hp': 7500, 'speed': 775, 'armour': 13, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'reactiveArmour'},
    {'name': 'Machjaw', 'hp': 10000, 'speed': 675, 'armour': 13, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'reactiveArmour'},
  ],
  25: [
    {'name': 'Demolisher', 'hp': 2800, 'speed': 600, 'armour': 20, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': 'highArmour'},
    {'name': 'Corsair', 'hp': 3600, 'speed': 400, 'armour': 20, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': 'highArmour'},
  ],
  26: [
    {'name': 'Skateboard Flamingo', 'hp': 6300, 'speed': 900, 'armour': 8, 'magicResist': 1.0, 'flying': false, 'evasion': 0, 'ability': 'magicImmune'},
  ],
  27: [
    {'name': 'Lgd Goldfish', 'hp': 3500, 'speed': 625, 'armour': 8, 'magicResist': 0.5, 'flying': true, 'evasion': 0, 'ability': 'untouchable_physicalImmune'},
    {'name': 'Jellyfish', 'hp': 2000, 'speed': 625, 'armour': 8, 'magicResist': 0.5, 'flying': true, 'evasion': 0, 'ability': 'untouchable_physicalImmune'},
  ],
  28: [
    {'name': 'Ig Dragon', 'hp': 3800, 'speed': 750, 'armour': 8, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': 'reactiveArmour'},
    {'name': 'Timbersaw', 'hp': 4900, 'speed': 600, 'armour': 8, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': 'reactiveArmour'},
  ],
  29: [
    {'name': 'Vg Fox', 'hp': 6000, 'speed': 775, 'armour': 8, 'magicResist': 0.1, 'flying': true, 'evasion': 0.5, 'ability': 'refraction'},
    {'name': 'Parrot Boatman', 'hp': 4500, 'speed': 1000, 'armour': 8, 'magicResist': 0.1, 'flying': true, 'evasion': 0.5, 'ability': 'refraction'},
  ],
  30: [
    {'name': 'Carpet Rider', 'hp': 80000, 'speed': 750, 'armour': 0, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': ''},
  ],
  31: [
    {'name': 'Bookwyrm', 'hp': 14000, 'speed': 900, 'armour': 12, 'magicResist': 1.0, 'flying': false, 'evasion': 0, 'ability': 'magicImmune_refraction'},
    {'name': 'Otter Dragon', 'hp': 21000, 'speed': 800, 'armour': 12, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'magicImmune_refraction'},
  ],
  32: [
    {'name': 'Rechargeable Shark', 'hp': 85000, 'speed': 600, 'armour': 12, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'recharge'},
  ],
  33: [
    {'name': 'Ribboned Zombie', 'hp': 80000, 'speed': 700, 'armour': 12, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'physicalImmune_blink'},
    {'name': 'Baby DP', 'hp': 55000, 'speed': 1000, 'armour': 12, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'physicalImmune_blink'},
  ],
  34: [
    {'name': 'Baby Bloody', 'hp': 13000, 'speed': 925, 'armour': 12, 'magicResist': 0.1, 'flying': true, 'evasion': 0.5, 'ability': 'evasion'},
    {'name': 'Bounty Apprentice', 'hp': 20000, 'speed': 725, 'armour': 12, 'magicResist': 0.1, 'flying': true, 'evasion': 0.5, 'ability': 'evasion'},
  ],
  35: [
    {'name': 'Black And White Fox', 'hp': 8800, 'speed': 700, 'armour': 12, 'magicResist': 1.0, 'flying': true, 'evasion': 0, 'ability': 'magicImmune'},
  ],
  36: [
    {'name': 'Jumo', 'hp': 55000, 'speed': 1000, 'armour': 12, 'magicResist': 1.0, 'flying': false, 'evasion': 0, 'ability': 'magicImmune'},
  ],
  37: [
    {'name': 'Baekho', 'hp': 120000, 'speed': 1200, 'armour': 12, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'blink'},
  ],
  38: [
    {'name': 'Lilnova', 'hp': 200000, 'speed': 1000, 'armour': 12, 'magicResist': 0.1, 'flying': false, 'evasion': 0, 'ability': 'disarm'},
  ],
  39: [
    {'name': 'Mermaid Rider', 'hp': 55000, 'speed': 600, 'armour': 12, 'magicResist': 0.1, 'flying': true, 'evasion': 0.5, 'ability': 'untouchable_evasion'},
    {'name': 'Newt', 'hp': 15000, 'speed': 800, 'armour': 12, 'magicResist': 0.1, 'flying': true, 'evasion': 0.5, 'ability': 'untouchable_evasion'},
  ],
  40: [
    {'name': 'Thrilling Ghost', 'hp': 330000, 'speed': 800, 'armour': 0, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': ''},
  ],
  41: [
    {'name': 'Jade Dragon', 'hp': 240000, 'speed': 700, 'armour': 16, 'magicResist': 0.5, 'flying': false, 'evasion': 0, 'ability': 'refraction'},
    {'name': 'Azuremir', 'hp': 120000, 'speed': 1300, 'armour': 16, 'magicResist': 0.25, 'flying': false, 'evasion': 0, 'ability': 'refraction'},
  ],
  42: [
    {'name': 'Kupu', 'hp': 15000, 'speed': 700, 'armour': 16, 'magicResist': 1.0, 'flying': true, 'evasion': 0, 'ability': 'magicImmune_rush'},
  ],
  43: [
    {'name': 'Furry Fish', 'hp': 190000, 'speed': 800, 'armour': 16, 'magicResist': 0.5, 'flying': false, 'evasion': 0.5, 'ability': 'untouchable_evasion_recharge'},
  ],
  44: [
    {'name': 'Shroomy', 'hp': 200000, 'speed': 500, 'armour': 16, 'magicResist': 1.0, 'flying': false, 'evasion': 0, 'ability': 'magicImmune_blink'},
  ],
  45: [
    {'name': 'Chirpy', 'hp': 120000, 'speed': 2400, 'armour': 16, 'magicResist': 0.1, 'flying': true, 'evasion': 0, 'ability': 'globalSlow_disarm'},
  ],
  46: [
    {'name': 'Boooofus', 'hp': 600000, 'speed': 800, 'armour': 32, 'magicResist': 0.2, 'flying': false, 'evasion': 0, 'ability': 'physicalImmune'},
  ],
  47: [
    {'name': 'Swift Donkey', 'hp': 300000, 'speed': 500, 'armour': 16, 'magicResist': 1.0, 'flying': false, 'evasion': 0, 'ability': 'magicImmune_untouchable_rush'},
    {'name': 'Crummy', 'hp': 550000, 'speed': 600, 'armour': 16, 'magicResist': 1.0, 'flying': false, 'evasion': 0, 'ability': 'magicImmune_untouchable_rush'},
  ],
  48: [
    {'name': 'Wabbit', 'hp': 60000, 'speed': 550, 'armour': 16, 'magicResist': 1.0, 'flying': true, 'evasion': 0.5, 'ability': 'magicImmune_disarm_evasion'},
    {'name': 'G1 Courier', 'hp': 100000, 'speed': 400, 'armour': 16, 'magicResist': 1.0, 'flying': true, 'evasion': 0.5, 'ability': 'magicImmune_disarm_evasion'},
  ],
  49: [
    {'name': 'Drodo', 'hp': 800000, 'speed': 700, 'armour': 32, 'magicResist': 0.8, 'flying': false, 'evasion': 0, 'ability': 'recharge'},
  ],
  50: [
    {'name': 'Baby Roshan', 'hp': 1000000, 'speed': 1000, 'armour': 16, 'magicResist': 0.2, 'flying': true, 'evasion': 0, 'ability': 'kraken'},
  ],
};

export const DIFFICULTIES = [
  { name: 'Easy', mult: 0.8 },
  { name: 'Normal', mult: 1.0 },
  { name: 'Hard', mult: 1.3 },
];

const POST_50_HP_SCALE = 1.12;

function levelForRound(round) {
  return Math.max(1, Math.min(50, Math.floor(round)));
}

function endlessHp(round) {
  const extra = Math.max(0, Math.floor(round) - 50);
  return Math.pow(POST_50_HP_SCALE, extra);
}

function pickVariant(level, round, spawnIndex = 0) {
  const variants = CREEP_LEVELS[level] || CREEP_LEVELS[50];
  return variants[Math.abs(Math.floor(round) * 17 + level * 31 + spawnIndex * 13) % variants.length];
}

export function getWaveDefinition(round) {
  const r = Math.max(1, Math.floor(round));
  const level = levelForRound(r);
  const isAirRound = r % 5 === 0;
  return {
    round: r,
    level,
    label: r % 10 === 0 ? `Level ${level} boss round ${r}` : `Level ${level} round ${r}`,
    isAirRound,
    cycle: Math.floor((r - 1) / 50)
  };
}

export function getCreepDefinition(typeName, round, bossOverride = false) {
  const wave = getWaveDefinition(round);
  const variants = CREEP_LEVELS[wave.level] || CREEP_LEVELS[50];
  const variant = variants.find(v => v.name === typeName) || pickVariant(wave.level, wave.round);

  const isBoss = !!bossOverride;
  const flying = wave.isAirRound ? true : variant.flying;
  const ability = variant.ability || '';
  const highArmour = ability.includes('highArmour');
  const reactiveArmour = ability.includes('reactiveArmour');
  const armour = (highArmour ? 20 : variant.armour) + (reactiveArmour ? 5 : 0);
  return {
    ...variant,
    type: variant.name,
    hp: variant.hp * endlessHp(wave.round),
    speed: variant.speed,
    armour,
    magicResist: variant.magicResist,
    flying,
    boss: isBoss || wave.level === 50,
    hpMult: 1,
    disarmRadius: ability.includes('disarm') ? 130 : 0,
    disarmDuration: 700,
    regenPct: 0,
    regenFlat: ability.includes('recharge') ? 400 : 0,
    physicalImmune: ability.includes('physicalImmune'),
    magicImmune: ability.includes('magicImmune'),
    evasion: variant.evasion || 0,
    rush: ability.includes('rush'),
    globalSlow: ability.includes('globalSlow'),
    blink: ability.includes('blink'),
    invisible: ability.includes('invisible'),
    refraction: ability.includes('refraction'),
    untouchable: ability.includes('untouchable'),
    kraken: ability.includes('kraken')
  };
}

export function getRoundCreepVariant(round, spawnIndex = 0) {
  const wave = getWaveDefinition(round);
  return pickVariant(wave.level, wave.round, spawnIndex);
}
