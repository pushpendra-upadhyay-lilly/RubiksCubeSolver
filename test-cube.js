import Cube from 'cubejs';

// Initialize solver
Cube.initSolver();

// Create a solved cube
const cube = new Cube();
console.log('Solved cube state:');
console.log('String:', cube.asString());
console.log('JSON:', cube.toJSON());
console.log('Length:', cube.asString().length);

// Test shuffle
cube.randomize();
console.log('\nShuffled cube state:');
console.log('String:', cube.asString());
console.log('JSON:', cube.toJSON());

// Let's understand the face mapping
const state = cube.asString().split('');
console.log('\nFace breakdown:');
console.log('Up (0-8):', state.slice(0, 9).join(''));
console.log('Right (9-17):', state.slice(9, 18).join(''));
console.log('Front (18-26):', state.slice(18, 27).join(''));
console.log('Down (27-35):', state.slice(27, 36).join(''));
console.log('Left (36-44):', state.slice(36, 45).join(''));
console.log('Back (45-53):', state.slice(45, 54).join(''));