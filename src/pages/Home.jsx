import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import YellowSubmarine from '../models/YellowSubmarine';
import TunaFish from '../models/TunaFish';
import Bat from '../models/Bat';

const Home = () => {

  const contentContainerRef = useRef();
  const [isRotating, setIsRotating] = useState(false);
  
  useEffect(()=>{
    let colorIntensity = 10;
    setInterval(() => {
      if (colorIntensity > 50) {
        colorIntensity = 10;
        contentContainerRef.current.classList = `bg-amber-300/${colorIntensity}`
      } else {
        contentContainerRef.current.classList = `bg-amber-300/${colorIntensity}`
        colorIntensity = colorIntensity + 10;
      }
    }, [7500])
  },[])
  


  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, 0, -43];
    let rotation = [0.1, 0.6, 0.05];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [2.3, 2.3, 2.3];
    }
    return [screenScale, screenPosition, rotation];
  }

  const adjustYellowSubmarineForScreenSize = () => {
    let screenScale, screenPosition;
    // let rotation = [0.1, 4.7, 0]

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [0.3, 0.3, 0.3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition]
  }


  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [yellowSubmarineScale, yellowSubmarinePosition] = adjustYellowSubmarineForScreenSize();

  return (
    <section ref={contentContainerRef} className='w-full h-[100%] relative bg-amber-300/10'>
      <article className='top-30 left-[10%] w-[30%] h-screen absolute align-middle text-center' style={{fontFamily: 'Shojumaru'}}>Sobre</article>
      <Canvas className={`z-100 w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />} >
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          {<hemisphereLight skyColor={'#b1e1ff'} groundColor={'#000000'} intensity={1} />}
          <Bat position={[-10, 1, 1]} scale={[0.05, 0.05, 0.05]} />
          <Island position={islandPosition} scale={islandScale} rotation={islandRotation}
            isRotating={isRotating} setIsRotating={setIsRotating}
          />
          {/* {isRotating && */}
          <TunaFish scale={[0.125, 0.125, 0.125]} position={[-13.3, 6.35, -4]}
            rotation={[0, 29.45, 0]} isRotating={isRotating} />
          {/* } */}
          <YellowSubmarine scale={yellowSubmarineScale} position={yellowSubmarinePosition}
            rotation={[0, 20, 0]} isRotating={isRotating} />

        </Suspense>
      </Canvas>
      <article className='top-30 right-[10%] w-[30%] h-screen absolute align-middle text-center' style={{fontFamily: 'Shojumaru'}}>Projetos</article>
    </section>
  )
}

export default Home