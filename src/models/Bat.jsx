import { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'

import batScene from '../assets/3d/bat.glb'

const Bat = ({ scale, position, rotation }) => {
  const batRef = useRef();
  const { scene, animations } = useGLTF(batScene)
  const { actions } = useAnimations(animations, batRef);
  const props = { scale, position, rotation };
  const [scaleScene, setScaleScene] = useState(scale)
  const [positionScene, setPositionScene] = useState(position)
  const [rotationScene, setRotationScene] = useState(rotation)
  const [isSelected, setIsSelected] = useState(false)
  const onPointerDownHandler = () => {
    // if (!isSelected) {
    //   setScaleScene([props.scale[0] * 4, props.scale[1] * 4, props.scale[2] * 4]);
    //   setPositionScene([0, -1.5, 0]);
    // } else {
    //   setScaleScene(props.scale);
    //   setPositionScene(props.position);
    //   setRotationScene(props.rotation);
    // }
    // setIsSelected(!isSelected)
    window.alert("Ouch")
  }
  useEffect(() => {
    actions['flapping'].play();
  }, [])

  useFrame(({ clock, camera }) => {
    // Update the Y position to simulate bat-like motion using a sine wave
    batRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bat reached a certain endpoint relative to the camera
    if (batRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bat 180 degrees on the y-axis
      batRef.current.rotation.y = Math.PI;
    } else if (batRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bat's rotation
      batRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (batRef.current.rotation.y === 0) {
      // Moving forward
      batRef.current.position.x += 0.01;
      batRef.current.position.z -= 0.01;
    } else {
      // Moving backward
      batRef.current.position.x -= 0.01;
      batRef.current.position.z += 0.01;
    }
  })

  return (
    <mesh ref={batRef} scale={scaleScene} position={positionScene} rotation={rotationScene}
      onPointerDown={onPointerDownHandler}
    >
      <primitive object={scene} />
    </mesh>
  )
}

export default Bat