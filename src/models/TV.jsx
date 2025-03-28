import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import tvScene from '../assets/3d/crt_tv.glb'

const TV = ({...props}) => {
  const ref = useRef()
  const { scene } = useGLTF(tvScene)
  
  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  )
}

export default TV;