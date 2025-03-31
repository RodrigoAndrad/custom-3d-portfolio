import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'

import islandScene from '../assets/3d/low_poly_flying_island.glb'

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {

  const islandRef = useRef(0);

  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene)

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);

  }

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      try {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;

        const delta = (clientX - lastX.current) / viewport.width;

        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
        lastX.current = clientX;
        rotationSpeed.current = delta * 0.01 * Math.PI;
      } catch {
        (e) => {
          console.warn("Lost Island Reference")
        }
      }

    }
  }

  const handleKeyDown = (e) => {
    try {
      if (e.key === 'ArrowLeft') {
        if (!isRotating) setIsRotating(true);
        islandRef.current.rotation.y += 0.01 * Math.PI;
        rotationSpeed.current = 0.0125
      } else if (e.key === 'ArrowRight') {
        if (!isRotating) setIsRotating(true);
        islandRef.current.rotation.y -= 0.01 * Math.PI;
        rotationSpeed.current = -0.0125
      }
    } catch {
      (e) => {
        console.warn("Lost Island Reference")
      }

    }

  }

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  }

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 4.25 && normalizedRotation <= 6.25:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.75 && normalizedRotation <= 1.75:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.25 && normalizedRotation <= 3.25:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 3.75 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(0);
      }
    }
  })

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return (() => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    })
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove, handleKeyUp, handleKeyDown])

  return (
    <a.group ref={islandRef} {...props}>
      <group position={[0.384, 1.761, 2.286]} rotation={[0.462, -0.035, 0.37]} scale={0.102}>
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials['Material.006']}
        />
      </group>
      <group position={[7.074, 2.168, 0.819]} rotation={[0.279, -0.914, 0.352]} scale={0.036}>
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group
        position={[-4.593, 2.095, 1.683]}
        rotation={[0, 0.617, 0]}
        scale={[0.393, 0.252, 0.393]}>
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials['Material.007']}
        />
        <mesh
          geometry={nodes.Object_18.geometry}
          material={materials['Material.008']}
        />
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials['Material.009']}
        />
      </group>
      <group position={[1.163, 1.413, 5.186]} rotation={[0.245, 0.496, 0.222]} scale={0.124}>
        <mesh
          geometry={nodes.Object_21.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_22.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_23.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_24.geometry}
          material={materials['Material.006']}
        />
      </group>
      <group position={[1.148, 1.302, 4.522]} rotation={[3.123, 1.188, 3.095]} scale={0.067}>
        <mesh
          geometry={nodes.Object_26.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_27.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_28.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_29.geometry}
          material={materials['Material.006']}
        />
      </group>
      <group position={[6.207, 1.932, -1.136]} rotation={[0.335, -0.454, 0.089]} scale={0.037}>
        <mesh
          geometry={nodes.Object_31.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_32.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[6.737, 1.978, -0.388]} rotation={[0, 0, 0.393]} scale={0.065}>
        <mesh
          geometry={nodes.Object_34.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_35.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[7.466, 2.267, 0.142]} rotation={[-0.014, -0.112, -0.041]} scale={0.076}>
        <mesh
          geometry={nodes.Object_37.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_38.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[5.975, 1.626, 0.204]} rotation={[-2.831, 0.357, 2.764]} scale={0.03}>
        <mesh
          geometry={nodes.Object_40.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_41.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[-0.023, 1.663, -4.536]} rotation={[1.91, 1.433, -1.626]} scale={0.086}>
        <mesh
          geometry={nodes.Object_43.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_44.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_45.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_46.geometry}
          material={materials['Material.006']}
        />
      </group>
      <group position={[-1.109, 1.611, -2.798]} rotation={[2.582, 1.377, -2.419]} scale={0.067}>
        <mesh
          geometry={nodes.Object_48.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_49.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_50.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_51.geometry}
          material={materials['Material.006']}
        />
      </group>
      <group position={[-0.358, 1.467, -3.12]} rotation={[3.116, -0.404, -2.85]} scale={0.117}>
        <mesh
          geometry={nodes.Object_53.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_54.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_55.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_56.geometry}
          material={materials['Material.006']}
        />
      </group>
      <group position={[-5.644, 1.851, 0.236]} rotation={[0.196, 0.677, -0.162]} scale={0.061}>
        <mesh
          geometry={nodes.Object_58.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_59.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[0.433, 2.511, 7.945]} rotation={[-0.045, 0.104, 0.268]} scale={0.065}>
        <mesh
          geometry={nodes.Object_61.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_62.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[-2.304, 1.573, -3.775]} rotation={[2.993, 0.565, -2.923]} scale={0.057}>
        <mesh
          geometry={nodes.Object_64.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_65.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_66.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_67.geometry}
          material={materials['Material.006']}
        />
      </group>
      <group position={[-6.146, 2.022, 0.313]} rotation={[0.05, 0.259, -0.111]} scale={0.025}>
        <mesh
          geometry={nodes.Object_69.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_70.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[-5.175, 1.702, 0.685]} rotation={[0.091, -0.422, 0.121]} scale={0.043}>
        <mesh
          geometry={nodes.Object_72.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_73.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[-0.312, 1.963, 2.095]} rotation={[0.157, -0.176, -0.099]} scale={0.036}>
        <mesh
          geometry={nodes.Object_75.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_76.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[-0.727, 2.429, 1.075]} rotation={[0.128, -0.085, -0.073]} scale={0.034}>
        <mesh
          geometry={nodes.Object_78.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_79.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[0.288, 2.059, 1.117]} rotation={[2.568, 0.97, -2.459]} scale={0.095}>
        <mesh
          geometry={nodes.Object_81.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_82.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_83.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_84.geometry}
          material={materials['Material.006']}
        />
      </group>
      <group position={[4.44, 1.601, -5.007]} rotation={[0.095, 1.232, 0.086]} scale={0.065}>
        <mesh
          geometry={nodes.Object_96.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_97.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[4.106, 2.753, -6.131]} rotation={[-2.974, 1.365, -3.014]} scale={0.065}>
        <mesh
          geometry={nodes.Object_99.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_100.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[4.533, 2.576, -5.761]} rotation={[-0.066, 1.291, 0.226]} scale={0.045}>
        <mesh
          geometry={nodes.Object_102.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_103.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[4.915, 2.845, -5.915]} rotation={[-0.241, -0.731, -0.128]} scale={0.032}>
        <mesh
          geometry={nodes.Object_105.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_106.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[-0.11, 2.255, 8.063]} rotation={[-0.045, 0.104, 0.268]} scale={0.036}>
        <mesh
          geometry={nodes.Object_108.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_109.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[0.104, 2.029, 8.681]} rotation={[-2.5, 0.699, 2.633]} scale={0.061}>
        <mesh
          geometry={nodes.Object_111.geometry}
          material={materials['Material.010']}
        />
        <mesh
          geometry={nodes.Object_112.geometry}
          material={materials['Material.011']}
        />
      </group>
      <group position={[6.461, 1.893, 0.886]} rotation={[2.946, 0.618, -3.105]} scale={0.069}>
        <mesh
          geometry={nodes.Object_114.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.Object_115.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Object_116.geometry}
          material={materials['Material.005']}
        />
        <mesh
          geometry={nodes.Object_117.geometry}
          material={materials['Material.006']}
        />
      </group>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials['Material.003']}
        scale={10}
      />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials['Material.001']}
        position={[-0.014, 1.446, -0.024]}
        rotation={[0, -0.637, 0]}
        scale={10.097}
      />
      <mesh
        geometry={nodes.Object_86.geometry}
        material={materials.material_0}
        position={[-6.824, 6.284, -4.472]}
        rotation={[0, -0.019, 0]}
        scale={0.72}
      />
      <mesh
        geometry={nodes.Object_88.geometry}
        material={materials.cloud}
        position={[-6.311, 5.038, -3.602]}
        rotation={[-0.393, -0.003, -0.078]}
        scale={0.534}
      />
      <mesh
        geometry={nodes.Object_90.geometry}
        material={materials.cloud}
        position={[6.597, 6.268, 0.85]}
        rotation={[0.881, 0.076, 0.417]}
        scale={0.876}
      />
      <mesh
        geometry={nodes.Object_92.geometry}
        material={materials.material_0}
        position={[3.228, 5.228, -5.024]}
        rotation={[-1.935, 0.598, -0.271]}
        scale={[0.759, 0.759, 0.894]}
      />
      <mesh
        geometry={nodes.Object_94.geometry}
        material={materials.material_0}
        position={[7.467, 4.743, 4.554]}
        rotation={[3.084, -0.011, -3.076]}
        scale={0.599}
      />
      <mesh
        geometry={nodes.Object_119.geometry}
        material={materials.cloud}
        position={[5.786, 5.102, 0.83]}
        rotation={[0.799, -0.43, 0.686]}
        scale={0.414}
      />
      <mesh
        geometry={nodes.Object_121.geometry}
        material={materials.cloud}
        position={[6.729, 5.224, 1.486]}
        rotation={[0.039, 0.131, 0.082]}
        scale={0.238}
      />
      <mesh
        geometry={nodes.Object_123.geometry}
        material={materials['Material.004']}
        position={[3.999, -3.067, 6.577]}
        rotation={[2.674, -0.429, 1.297]}
        scale={0.334}
      />
      <mesh
        geometry={nodes.Object_125.geometry}
        material={materials['Material.004']}
        position={[3.36, -2.696, 7.036]}
        rotation={[1.304, -0.645, -0.769]}
        scale={0.288}
      />
      <mesh
        geometry={nodes.Object_127.geometry}
        material={materials['Material.004']}
        position={[3.398, -3.437, 6.619]}
        rotation={[1.133, 0.389, -2.124]}
        scale={0.414}
      />
      <mesh
        geometry={nodes.Object_129.geometry}
        material={materials['Material.006']}
        position={[2.655, 2.073, -4.707]}
        rotation={[-0.369, 0.432, 0.544]}
        scale={0.224}
      />
      <mesh
        geometry={nodes.Object_131.geometry}
        material={materials['Material.006']}
        position={[2.354, 2.072, -4.699]}
        rotation={[2.032, -0.09, 2.505]}
        scale={0.09}
      />
      <mesh
        geometry={nodes.Object_133.geometry}
        material={materials['Material.006']}
        position={[2.436, 1.993, -4.607]}
        rotation={[-0.018, 0.797, 0.7]}
        scale={0.048}
      />
      <mesh
        geometry={nodes.Object_135.geometry}
        material={materials['Material.006']}
        position={[0.167, 1.352, 3.056]}
        rotation={[-1.766, 0.425, 1.256]}
        scale={0.441}
      />
      <mesh
        geometry={nodes.Object_137.geometry}
        material={materials['Material.006']}
        position={[-0.285, 1.292, 3.197]}
        rotation={[2.032, -0.09, 2.505]}
        scale={0.177}
      />
      <mesh
        geometry={nodes.Object_139.geometry}
        material={materials['Material.006']}
        position={[-0.055, 1.105, 3.367]}
        rotation={[3.133, 0.179, 2.926]}
        scale={0.094}
      />
      <mesh
        geometry={nodes.Object_141.geometry}
        material={materials['Material.004']}
        position={[4.241, -2.38, 6.698]}
        rotation={[2.674, -0.429, 1.297]}
        scale={0.286}
      />
      <mesh
        geometry={nodes.Object_143.geometry}
        material={materials['Material.004']}
        position={[3.892, -2.676, 6.936]}
        rotation={[-3.104, 0.521, -1.707]}
        scale={0.191}
      />
    </a.group>
  )
}

export default Island