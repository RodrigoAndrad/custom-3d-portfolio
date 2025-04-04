import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

import radioScene from '../assets/3d/1940s_motorola_police_radio.glb'

const Radio = ({ scale, position, rotation }) => {
  const props = { scale, position, rotation };
  const [scaleScene, setScaleScene] = useState(scale)
  const [positionScene, setPositionScene] = useState(position)
  const [isSelected, setIsSelected] = useState(false)
  const { scene } = useGLTF(radioScene)
  const ref = useRef()
  const onPointerDownHandler = () => {
    if (!isSelected) {
      setScaleScene([props.scale[0] * 1.5, props.scale[1] * 1.5, props.scale[2] * 1.5]);
      setPositionScene([2, 0, 0]);
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

export default Radio;