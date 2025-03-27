import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import yellowSubmarineScene from '../assets/3d/yellow_submarine_beatles.glb'

const YellowSubmarine = ({...props}) => {
  const ref = useRef()
  const { scene } = useGLTF(yellowSubmarineScene)
  
  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  )
}

export default YellowSubmarine;