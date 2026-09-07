// js/definitions/gemTypes.js

export const GEM_LEVELS = {
  1: ["Chipped", 1.0],
  2: ["Flawed", 1.25],
  3: ["Normal", 1.6],
  4: ["Flawless", 2.1],
  5: ["Perfect", 2.8]
};

export const GEM_TYPES = {
  Ruby:       { colour: '#e53935', symbol: '◆', role: 'Single-Target Heavy' },
  Sapphire:   { colour: '#1e88e5', symbol: '▲', role: 'Slowing' },
  Emerald:    { colour: '#43a047', symbol: '■', role: 'Poison DPS' },
  Topaz:      { colour: '#fdd835', symbol: '★', role: 'Multi-Target Attack' },
  Amethyst:   { colour: '#8e24aa', symbol: '●', role: 'Splash Damage' },
  Diamond:    { colour: '#e0e0e0', symbol: '✦', role: 'Armor Piercing' },
  Opal:       { colour: '#00acc1', symbol: '⬟', role: 'Aura Support' },
  Aquamarine: { colour: '#00d2d3', symbol: '⬢', role: 'Rapid Attack' }
};
