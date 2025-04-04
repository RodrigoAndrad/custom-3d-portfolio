import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

import yellowSubmarineScene from '../assets/3d/yellow_submarine_beatles.glb'

const YellowSubmarine = ({ scale, position, rotation }) => {
  const props = { scale, position, rotation };
  const [scaleScene, setScaleScene] = useState(scale)
  const [positionScene, setPositionScene] = useState(position)
  const [isSelected, setIsSelected] = useState(false)
  const { scene } = useGLTF(yellowSubmarineScene)
  const ref = useRef()
  const onPointerDownHandler = () => {
    if (!isSelected) {
      setScaleScene([props.scale[0] * 3, props.scale[1] * 3, props.scale[2] * 3]);
      setPositionScene([0, -1.5, 0]);
    } else {
      setScaleScene(props.scale);
      setPositionScene(props.position);
    }
    setIsSelected(!isSelected)
  }

  return (
    <>
      <mesh scale={scaleScene} position={positionScene} rotation={rotation}
        onPointerDown={onPointerDownHandler} >
        <primitive object={scene} ref={ref} />
      </mesh>
    </>
  )
}

export default YellowSubmarine;