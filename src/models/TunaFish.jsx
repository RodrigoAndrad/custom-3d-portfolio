import React, { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

import tunaFishScene from '../assets/3d/tuna_fish.glb'

const TunaFish = ({isRotating, ...props}) => {
  const ref = useRef()
  const { scene, animations } = useGLTF(tunaFishScene)
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (isRotating) {
      actions["Swim"].play();
    } else {
      actions["Swim"].stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref} >
      <primitive object={scene} />
    </mesh>
  )
}

export default TunaFish;