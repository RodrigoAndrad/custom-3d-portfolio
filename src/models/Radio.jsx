import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import radioScene from '../assets/3d/1940s_motorola_police_radio.glb'

const Radio = ({...props}) => {
  const ref = useRef()
  const { scene } = useGLTF(radioScene)
  
  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Radio;