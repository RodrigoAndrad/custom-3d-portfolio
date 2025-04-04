import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

import barcodeScannerScene from '../assets/3d/qr_code_barcode_scanner.glb'

const BarcodeScanner = ({ scale, position, rotation }) => {
  const props = { scale, position, rotation };
  const [scaleScene, setScaleScene] = useState(scale)
  const [positionScene, setPositionScene] = useState(position)
  const [rotationScene, setRotationScene] = useState(rotation)
  const [isSelected, setIsSelected] = useState(false)
  const { scene } = useGLTF(barcodeScannerScene)
  const ref = useRef()

  const onPointerDownHandler = () => {
    if (!isSelected) {
      setScaleScene([props.scale[0] * 4, props.scale[1] * 4, props.scale[2] * 4]);
      setPositionScene([0, -1.5, 0]);
    } else {
      setScaleScene(props.scale);
      setPositionScene(props.position);
      setRotationScene(props.rotation);
    }
    setIsSelected(!isSelected)
  }
  return (
    <>
      <mesh scale={scaleScene} position={positionScene} rotation={rotationScene}
        onPointerDown={onPointerDownHandler} >
        <primitive object={scene} ref={ref} />
      </mesh>
    </>
  )
}

export default BarcodeScanner;