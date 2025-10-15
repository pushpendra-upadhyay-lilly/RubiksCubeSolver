// Define a Map Rotate and direction based on the layer being rotated
export const RotationMap = {
  // Y-axis: Top view
  U: { axis: 'y', angle: -Math.PI / 2 },
  "U'": { axis: 'y', angle: Math.PI / 2 },

  D: { axis: 'y', angle: Math.PI / 2 },
  "D'": { axis: 'y', angle: -Math.PI / 2 },

  // X-axis: Side view
  R: { axis: 'x', angle: -Math.PI / 2 },
  "R'": { axis: 'x', angle: Math.PI / 2 },

  L: { axis: 'x', angle: Math.PI / 2 },
  "L'": { axis: 'x', angle: -Math.PI / 2 },

  // Z-axis: Front view
  F: { axis: 'z', angle: -Math.PI / 2 },
  "F'": { axis: 'z', angle: Math.PI / 2 },

  B: { axis: 'z', angle: Math.PI / 2 },
  "B'": { axis: 'z', angle: -Math.PI / 2 },
};


export const LayerMap = {
  U: (cubie) => cubie.pos[1] === 1,
  D: (cubie) => cubie.pos[1] === -1,
  L: (cubie) => cubie.pos[0] === -1,
  R: (cubie) => cubie.pos[0] === 1,
  F: (cubie) => cubie.pos[2] === 1,
  B: (cubie) => cubie.pos[2] === -1,
  "U'": (cubie) => cubie.pos[1] === 1,
  "D'": (cubie) => cubie.pos[1] === -1,
  "L'": (cubie) => cubie.pos[0] === -1,
  "R'": (cubie) => cubie.pos[0] === 1,
  "F'": (cubie) => cubie.pos[2] === 1,
  "B'": (cubie) => cubie.pos[2] === -1,
  '': () => false, // No rotation
};


export const faceletIndices = {
  U: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  R: [9, 10, 11, 12, 13, 14, 15, 16, 17],
  F: [18, 19, 20, 21, 22, 23, 24, 25, 26],
  D: [27, 28, 29, 30, 31, 32, 33, 34, 35],
  L: [36, 37, 38, 39, 40, 41, 42, 43, 44],
  B: [45, 46, 47, 48, 49, 50, 51, 52, 53],
};

export const cubieDefs = [
  // --- Top Layer (y = 1) ---
  {
    id: 0,
    pos: [-1, 1, 1], // UFL
    facelets: { U: 6, F: 18, L: 38 }
  },
  {
    id: 1,
    pos: [0, 1, 1], // UF
    facelets: { U: 7, F: 19 }
  },
  {
    id: 2,
    pos: [1, 1, 1], // UFR
    facelets: { U: 8, F: 20, R: 9 }
  },
  {
    id: 3,
    pos: [-1, 1, 0], // UL
    facelets: { U: 3, L: 37 }
  },
  {
    id: 4,
    pos: [0, 1, 0], // U (center)
    facelets: { U: 4 }
  },
  {
    id: 5,
    pos: [1, 1, 0], // UR
    facelets: { U: 5, R: 10 }
  },
  {
    id: 6,
    pos: [-1, 1, -1], // UBL
    facelets: { U: 0, B: 47, L: 36 }
  },
  {
    id: 7,
    pos: [0, 1, -1], // UB
    facelets: { U: 1, B: 46 }
  },
  {
    id: 8,
    pos: [1, 1, -1], // UBR
    facelets: { U: 2, B: 45, R: 11 }
  },

  // --- Middle Layer (y = 0) ---
  {
    id: 9,
    pos: [-1, 0, 1], // FL
    facelets: { F: 21, L: 41 }
  },
  {
    id: 10,
    pos: [0, 0, 1], // F
    facelets: { F: 22 }
  },
  {
    id: 11,
    pos: [1, 0, 1], // FR
    facelets: { F: 23, R: 12 }
  },
  {
    id: 12,
    pos: [-1, 0, 0], // L
    facelets: { L: 40 }
  },
  {
    id: 13,
    pos: [0, 0, 0], // Core (invisible)
    facelets: {}
  },
  {
    id: 14,
    pos: [1, 0, 0], // R
    facelets: { R: 13 }
  },
  {
    id: 15,
    pos: [-1, 0, -1], // BL
    facelets: { B: 50, L: 39 }
  },
  {
    id: 16,
    pos: [0, 0, -1], // B
    facelets: { B: 49 }
  },
  {
    id: 17,
    pos: [1, 0, -1], // BR
    facelets: { B: 48, R: 14 }
  },

  // --- Bottom Layer (y = -1) ---
  {
    id: 18,
    pos: [-1, -1, 1], // DFL
    facelets: { D: 33, F: 24, L: 44 }
  },
  {
    id: 19,
    pos: [0, -1, 1], // DF
    facelets: { D: 34, F: 25 }
  },
  {
    id: 20,
    pos: [1, -1, 1], // DFR
    facelets: { D: 35, F: 26, R: 15 }
  },
  {
    id: 21,
    pos: [-1, -1, 0], // DL
    facelets: { D: 30, L: 43 }
  },
  {
    id: 22,
    pos: [0, -1, 0], // D (center)
    facelets: { D: 31 }
  },
  {
    id: 23,
    pos: [1, -1, 0], // DR
    facelets: { D: 32, R: 16 }
  },
  {
    id: 24,
    pos: [-1, -1, -1], // DBL
    facelets: { D: 33, B: 53, L: 42 }
  },
  {
    id: 25,
    pos: [0, -1, -1], // DB (bottom middle back)
    facelets: { D: 34, B: 52 }
  },
  {
    id: 26,
    pos: [1, -1, -1], // DBR
    facelets: { D: 35, B: 51, R: 17 }
  },
];
