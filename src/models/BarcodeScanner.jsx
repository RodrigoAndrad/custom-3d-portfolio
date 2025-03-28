import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import barcodeScannerScene from '../assets/3d/qr_code_barcode_scanner.glb'

const BarcodeScanner = ({...props}) => {
  const ref = useRef()
  const { scene } = useGLTF(barcodeScannerScene)
  
  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  )
}

export default BarcodeScanner;