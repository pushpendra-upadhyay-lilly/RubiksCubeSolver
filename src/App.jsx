import { OrbitControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Cube from 'cubejs'; // import your cube library
import { useCallback, useEffect, useRef, useState } from 'react';
import RubiksCube from './components/RubiksCube';
import { getCubieState } from './helpers';
import './App.css';


export default function App() {
  const cubeRef = useRef(new Cube());
  const [cubies, setCubies] = useState();
  const [move, setMove] = useState(null);
  const moveQueue = useRef([]);
  const [speed, setSpeed] = useState(0.01);
  const [pauseBetweenMoves, setPauseBetweenMoves] = useState(false);

  useEffect(() => {
    Cube.initSolver();
    const initial = cubeRef.current.asString();
    setCubies(getCubieState(initial));
  }, []);

  const applyMove = useCallback((move) => {
    moveQueue.current.push(move);
    processNextMove();
  }, []);

  const onMoveComplete = useCallback(() => {
    setCubies(getCubieState(cubeRef.current.asString()));
    setMove(null); // Clear the move to stop animation

    console.log("Auto moving:", pauseBetweenMoves);
    if (pauseBetweenMoves) return; // Wait for user to trigger next move

    // Process the next move in the queue
    setTimeout(() => {
      processNextMove();
    }, 500);
  }, []);

  const handleShuffle = async () => {
    setSpeed(0.1); // Increase speed for shuffling
    const moves = [];
    const faces = ['U', 'D', 'L', 'R', 'F', 'B'];
    const modifiers = ['', "'", '2'];

    for (let i = 0; i < 10; i++) {
      const face = faces[Math.floor(Math.random() * faces.length)];
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      moves.push(face + modifier);
    }

    console.log('Shuffle moves:', moves);
    moveQueue.current = moves;
    processNextMove(); // Start processing the queue
  }

  const handleSolve = () => {
    setSpeed(0.05); // Moderate speed for solving
    const sol = cubeRef.current.solve();
    const moves = sol.split(' ').filter(move => move.trim() !== '');
    console.log("Solution:", sol);
    moveQueue.current = [...moves];
    processNextMove();
  };

  const processNextMove = () => {
    if (moveQueue.current?.length > 0) {
      let nextMove = moveQueue.current.shift();
      // console.log('Processing next move:', nextMove);

      if (nextMove.length >= 2) {
        // Multiple move (e.g., "U2")
        // Add single move and reduce count
        if (nextMove[1] === "'") {
          if (nextMove.length === 3) {
            const face = nextMove[0] + "'";
            const remaining = parseInt(nextMove[2]) - 1;
            if (remaining > 1) {
              moveQueue.current.unshift(`${face}${remaining}`);
            } else if (remaining === 1) {
              moveQueue.current.unshift(face);
            }
            nextMove = face;
          } else {
            nextMove = nextMove[0] + "'";
          }
        } else {
          let [face, count] = nextMove;
          count = parseInt(count);
          const remaining = count - 1;
          if (remaining > 1) {
            moveQueue.current.unshift(`${face}${remaining}`);
          } else if (remaining === 1) {
            moveQueue.current.unshift(face);
          }
          nextMove = face;
        }
      }

      cubeRef.current.move(nextMove);
      setMove(nextMove);
    } else {
      console.log('All moves completed');
      // console.log(cubeState);
      setMove(null);
    }
  };

  const handleTogglePause = () => setPauseBetweenMoves(prev => !prev);

  return (
    <div className="app-container">
      <h1 className="title">🧊 3D Rubik's Cube Solver</h1>


      <div className="cube-container">
        {move && (
          <div className="current-move">
            <span>{move}</span>
          </div>
        )}
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [4, 4, 4], fov: 50 }}
          shadows
        >
          <ambientLight />
          <directionalLight position={[5, 5, 5]} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <RubiksCube cubies={cubies} move={move} onMoveComplete={onMoveComplete} speed={speed} />
          <OrbitControls />
        </Canvas>
      </div>

      <div className="controls">
        <div className="move-buttons">
          {['F', "F'", 'B', "B'", 'R', "R'", 'L', "L'", 'U', "U'", 'D', "D'"].map(move => (
            <button key={move} onClick={() => applyMove(move)}>{move}</button>
          ))}
        </div>

        <div className="action-buttons">
          <button
            type="button"
            onClick={handleShuffle}
            disabled={moveQueue.current.length > 0}
          >
            🔀 Shuffle
          </button>
          <button
            type="button"
            onClick={handleSolve}
            disabled={moveQueue.current.length > 0}
          >
            🧠 Solve
          </button>
        </div>

        <div className="solve-options">
          <label>
            <input type="checkbox" checked={pauseBetweenMoves} onChange={handleTogglePause} />
            Pause between moves
          </label>
          {pauseBetweenMoves && <button onClick={processNextMove} disabled={!pauseBetweenMoves}>Next ▶</button>}
        </div>
      </div>
    </div>

  );
}
