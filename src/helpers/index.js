import { Matrix4, Quaternion, Vector3, Euler } from 'three';
import { cubieDefs } from '../constants';

export function getPositionName(pos) {
  const [x, y, z] = pos;

  // Determine the face
  let face = '';
  if (z === 1) face = 'F';
  else if (z === -1) face = 'B';
  else if (x === 1) face = 'R';
  else if (x === -1) face = 'L';
  else if (y === 1) face = 'U';
  else if (y === -1) face = 'D';

  // For front and back faces
  if (z === 1 || z === -1) {
    let vertical = '';
    let horizontal = '';

    if (y === 1) vertical = 'Top';
    else if (y === -1) vertical = 'Bottom';
    else vertical = 'Middle';

    if (x === -1) horizontal = 'Left';
    else if (x === 1) horizontal = 'Right';
    else horizontal = 'Center';

    return `${face}-${vertical}-${horizontal}`;
  }

  // For other faces, adapt accordingly
  if (x === 1 || x === -1) { // Right or Left face
    let vertical = '';
    let depth = '';

    if (y === 1) vertical = 'Top';
    else if (y === -1) vertical = 'Bottom';
    else vertical = 'Middle';

    if (z === 1) depth = 'Front';
    else if (z === -1) depth = 'Back';
    else depth = 'Center';

    return `${face}-${vertical}-${depth}`;
  }

  if (y === 1 || y === -1) { // Up or Down face
    let frontBack = '';
    let leftRight = '';

    if (z === 1) frontBack = 'Front';
    else if (z === -1) frontBack = 'Back';
    else frontBack = 'Middle';

    if (x === -1) leftRight = 'Left';
    else if (x === 1) leftRight = 'Right';
    else leftRight = 'Center';

    return `${face}-${frontBack}-${leftRight}`;
  }

  return `Unknown-[${x},${y},${z}]`;
}

export function getRotationMatrix(axis, angle) {
  const matrix = new Matrix4();
  const quaternion = new Quaternion();

  // console.log(`Creating rotation matrix for axis: ${axis}, angle: ${angle} (${angle * 180 / Math.PI}°)`);

  if (axis === 'x') {
    quaternion.setFromAxisAngle(new Vector3(1, 0, 0), angle);
  } else if (axis === 'y') {
    quaternion.setFromAxisAngle(new Vector3(0, 1, 0), angle);
  } else if (axis === 'z') {
    quaternion.setFromAxisAngle(new Vector3(0, 0, 1), angle);
  } else {
    console.error(`Invalid axis: ${axis}`);
    return matrix; // Returns identity matrix
  }

  matrix.makeRotationFromQuaternion(quaternion);
  // console.log(`Rotation matrix for ${axis}-axis:`, matrix.elements);
  return matrix;
}

export function applyMatrixToPosition(position, matrix) {
  // Create a new Vector3 from the position array
  const vec = new Vector3(position[0], position[1], position[2]);

  // Apply the matrix transformation
  vec.applyMatrix4(matrix);

  // Round to nearest integer to avoid floating point issues
  const newPosition = [Math.round(vec.x), Math.round(vec.y), Math.round(vec.z)];

  return newPosition;
}

export function applyMatrixToRotation(currentRotation, rotationMatrix) {
  // Convert current euler rotation to matrix
  const currentEuler = new Euler(currentRotation[0], currentRotation[1], currentRotation[2], 'XYZ');
  const currentMatrix = new Matrix4();
  currentMatrix.makeRotationFromEuler(currentEuler);

  // Multiply by the new rotation (apply the move rotation to the current rotation)
  const resultMatrix = new Matrix4();
  resultMatrix.multiplyMatrices(rotationMatrix, currentMatrix);

  // Convert back to euler angles
  const resultEuler = new Euler();
  resultEuler.setFromRotationMatrix(resultMatrix, 'XYZ');

  return [resultEuler.x, resultEuler.y, resultEuler.z];
}

export function getInitialCubies() {
  const cubies = [];
  let id = 0;

  // U face
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      // if (x === 0 && z === 0) continue; // Skip the center piece
      const cubie = {
        id: id++,
        pos: [x, 1, z],
        colors: {
          U: 'white',
          D: 'black', // Internal face
          F: z === 1 ? 'green' : 'black',
          B: z === -1 ? 'blue' : 'black',
          R: x === 1 ? 'darkorange' : 'black',
          L: x === -1 ? 'red' : 'black',
        },
        rotation: [0, 0, 0], // [x, y, z] rotation in radians
        anim: null,
      };
      cubies.push(cubie);
    }
  }

  // R face
  for (let y = -1; y <= 0; y++) {
    for (let z = -1; z <= 1; z++) {
      const cubie = {
        id: id++,
        pos: [1, y, z],
        colors: {
          R: 'darkorange',
          L: 'black', // Internal face
          U: y === 1 ? 'white' : 'black',
          D: y === -1 ? 'yellow' : 'black',
          F: z === 1 ? 'green' : 'black',
          B: z === -1 ? 'blue' : 'black',
        },
        rotation: [0, 0, 0], // [x, y, z] rotation in radians
        anim: null,
      };
      cubies.push(cubie);
    }
  }

  // F face
  for (let x = -1; x <= 0; x++) {
    for (let y = -1; y <= 0; y++) {
      const cubie = {
        id: id++,
        pos: [x, y, 1],
        colors: {
          F: 'green',
          B: 'black', // Internal face
          U: y === 1 ? 'white' : 'black',
          D: y === -1 ? 'yellow' : 'black',
          R: x === 1 ? 'darkorange' : 'black',
          L: x === -1 ? 'red' : 'black',
        },
        rotation: [0, 0, 0], // [x, y, z] rotation in radians
        anim: null,
      };
      cubies.push(cubie);
    }
  }

  // D face
  for (let x = -1; x <= 0; x++) {
    for (let z = -1; z <= 0; z++) {
      const cubie = {
        id: id++,
        pos: [x, -1, z],
        colors: {
          D: 'yellow',
          U: 'black', // Internal face
          F: z === 1 ? 'green' : 'black',
          B: z === -1 ? 'blue' : 'black',
          R: x === 1 ? 'darkorange' : 'black',
          L: x === -1 ? 'red' : 'black',
        },
        rotation: [0, 0, 0], // [x, y, z] rotation in radians
        anim: null,
      };
      cubies.push(cubie);
    }
  }

  // L face
  for (let y = 0; y <= 0; y++) {
    for (let z = -1; z <= 0; z++) {
      const cubie = {
        id: id++,
        pos: [-1, y, z],
        colors: {
          L: 'red',
          R: 'black', // Internal face
          U: y === 1 ? 'white' : 'black',
          D: y === -1 ? 'yellow' : 'black',
          F: z === 1 ? 'green' : 'black',
          B: z === -1 ? 'blue' : 'black',
        },
        rotation: [0, 0, 0], // [x, y, z] rotation in radians
        anim: null,
      };
      cubies.push(cubie);
    }
  }

  // B face
  const cubie = {
    id: id++,
    pos: [0, 0, -1],
    colors: {
      B: 'blue',
      F: 'black', // Internal face
      U: 'black',
      D: 'black',
      R: 'black',
      L: 'black',
    },
    rotation: [0, 0, 0], // [x, y, z] rotation in radians
    anim: null,
  };
  cubies.push(cubie);

  console.log(`Created ${cubies.length} cubies after B face`);

  /*
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const colors = {
          R: 'black', // Default all faces to black (internal)
          L: 'black',
          U: 'black',
          D: 'black',
          F: 'black',
          B: 'black'
        };

        // Only assign actual colors to visible faces
        if (x === 1) colors.R = 'darkorange';  // +X = Right = Orange
        if (x === -1) colors.L = 'red';        // -X = Left = Red  
        if (y === 1) colors.U = 'white';       // +Y = Up = White
        if (y === -1) colors.D = 'yellow';     // -Y = Down = Yellow
        if (z === 1) colors.F = 'green';       // +Z = Front = Green
        if (z === -1) colors.B = 'blue';       // -Z = Back = Blue

        const cubie = {
          id: id++,
          pos: [x, y, z],
          colors,
          rotation: [0, 0, 0], // [x, y, z] rotation in radians
          anim: null,
        };

        cubies.push(cubie);
      }
    }
  }
  */
  return cubies;
}

const colorMap = {
  U: 'white',
  R: 'darkorange',
  F: 'green',
  D: 'yellow',
  L: 'red',
  B: 'blue',
};

export function parseFaceletString(faceletString) {
  const faces = {
    up: faceletString.slice(0, 9).split(''),
    right: faceletString.slice(9, 18).split(''),
    front: faceletString.slice(18, 27).split(''),
    down: faceletString.slice(27, 36).split(''),
    left: faceletString.slice(36, 45).split(''),
    back: faceletString.slice(45, 54).split(''),
  };

  for (const face in faces) {
    faces[face] = faces[face].map(letter => colorMap[letter]);
  }

  return faces;
}

export function faceletStringToCubies(faceletString, cubieFaceletIndices) {
  const faces = {
    U: faceletString.slice(0, 9),
    R: faceletString.slice(9, 18),
    F: faceletString.slice(18, 27),
    D: faceletString.slice(27, 36),
    L: faceletString.slice(36, 45),
    B: faceletString.slice(45, 54),
  };

  const cubies = [];

  for (let cubieId = 0; cubieId < 26; cubieId++) {
    const indices = cubieFaceletIndices[cubieId];
    const colors = {};

    if (indices) {
      for (const face in indices) {
        const idx = indices[face];
        colors[face] = colorMap[faces[face][idx]];
      }
    }

    cubies.push({
      id: cubieId,
      colors,
      // pos and rotation must be known or provided
    });
  }

  return cubies;
}

export const getCubieState = (cubeString) => {
  return cubieDefs.map(def => ({
    id: def.id,
    pos: def.pos,
    colors: Object.fromEntries(
      Object.entries(def.facelets).map(([face, index]) => [
        face,
        colorMap[cubeString[index]]
      ])
    )
  }));
};
