import {useRef, useEffect} from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'

import batScene from '../assets/3d/bat.glb'

const Bat = ({...props}) => {
    const batRef = useRef();
    const { scene, animations } = useGLTF(batScene)
    const { actions } = useAnimations(animations, batRef);

  useEffect(()=>{
    actions['flapping'].play();
  },[])

  useFrame(({clock, camera})=>{
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
    <mesh ref={batRef} {...props}><primitive object={scene} /></mesh>
  )
}

export default Bat