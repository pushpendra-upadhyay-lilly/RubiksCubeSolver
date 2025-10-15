import { useFrame } from '@react-three/fiber';
import React from 'react';
import Cubie from './Cubie';
import { RotationMap, LayerMap } from '../constants';

export default function RubiksCube({ cubies, move, onMoveComplete, speed: deltaY }) {
  const activeLayerRef = React.createRef();

  const rotation = RotationMap[move] || { axis: 'y', angle: 0 };

  useFrame(() => {
    if (move !== null) {
      if (activeLayerRef && activeLayerRef.current) {

        // Smoothly rotate the correct layer group
        activeLayerRef.current.rotation[rotation.axis] += rotation.angle * deltaY;

        // Check if we've reached 90 degrees in either direction
        const currentRotation = activeLayerRef.current.rotation[rotation.axis];
        const targetRotation = rotation.angle;

        if (((rotation.angle > 0 && currentRotation >= Math.PI / 2) ||
          (rotation.angle < 0 && currentRotation <= -Math.PI / 2))) {

          // Reset the layer rotation after positions are updated
          activeLayerRef.current.rotation[rotation.axis] = targetRotation;

          // Complete the move - this will update positions and reset rotation
          onMoveComplete(move, targetRotation, rotation.axis);

          // Reset the layer rotation after positions are updated
          activeLayerRef.current.rotation[rotation.axis] = 0;
        }
      }
    }
  });

  return (
    <group>
      <group ref={activeLayerRef}>
        {move !== null && cubies.filter(LayerMap[move]).map(c => (
          <Cubie key={c.id} cubie={c} />
        ))}
      </group>

      {cubies.filter(c => move !== null ? !LayerMap[move](c) : true).map(c => (
        <Cubie key={c.id} cubie={c} />
      ))}
    </group>
  );
}
