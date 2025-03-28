import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import scannerMenuScene from '../assets/3d/scanner_menu.glb'

const ScannerMenu = ({...props}) => {
  const ref = useRef()
  const { scene } = useGLTF(scannerMenuScene)
  
  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  )
}

export default ScannerMenu;