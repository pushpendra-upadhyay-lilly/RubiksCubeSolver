import * as THREE from 'three';
import { useRef } from 'react';

const FACE_ORDER = ['R', 'L', 'U', 'D', 'F', 'B'];

export default function Cubie({ cubie }) {
  const meshRef = useRef();

  const { pos, colors } = cubie;

  const materials = FACE_ORDER.map(face => {
    const color = colors[face] || 'black';
    return new THREE.MeshStandardMaterial({ color });
  });

  return (
    <mesh ref={meshRef} position={pos} material={materials}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
    </mesh>
  );
}
