// Community Libraries
import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// Project's Shared Components
import Loader from '../components/Loader';
import HomeAboutInfo from '../components/home/HomeAboutInfo';
import HomeProjectsInfo from '../components/home/HomeProjectsInfo';
import HomeContactInfo from '../components/home/HomeContactInfo';
// Theme Config
import PortfolioThemeConfig from '../constants/SiteThemeConfig';
// Project's 3D Models Components
import Island from '../models/Island';
import YellowSubmarine from '../models/YellowSubmarine';
import Bat from '../models/Bat';
import BarcodeScanner from '../models/BarcodeScanner';
import TV from '../models/TV';
import Radio from '../models/Radio';



const Home = ({ isRotating, setIsRotating, isPlaying, setIsPlaying, bgColorStage, setBgColorStage, ...props }) => {

  const [currentStage, setCurrentStage] = useState(null);
  const contentContainerRef = useRef(null);
  /* Adjustment for 3D Models to Viewport */
  //Island
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [0.1, 0.6, 0.05];

    if (window.innerWidth < 768) {
      screenPosition = [0, -13, -43]
      screenScale = [1.5, 1.5, 1.5];
    } else {
      screenPosition = [0, 0, -43]
      screenScale = [2.3, 2.3, 2.3];
    }
    return [screenScale, screenPosition, rotation];
  }
  // Yellow Submarine
  const adjustYellowSubmarineForScreenSize = () => {
    let screenScale, screenPosition;
    // let rotation = [0.1, 4.7, 0]

    if (window.innerWidth < 768) {
      screenScale = [0.1, 0.1, 0.1];
      screenPosition = [0, -3.5, 0];
    } else {
      screenScale = [0.3, 0.3, 0.3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition]
  }
  // QR Code Scanner
  const adjustBarcodeScannerForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [0.1, 2.95, 0.05];
    if (window.innerWidth < 768) {
      screenScale = [0.15, 0.15, 0.15];
      screenPosition = [0, 2, 0];
    } else {
      screenScale = [0.5, 0.5, 0.5];
      screenPosition = [-3, -6, -4];
    }
    return [screenScale, screenPosition, rotation]
  }
  // Old TV
  const adjustTVForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [0.1, 0.5, 0.1];
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [0.025, 0.025, 0.025];
      screenPosition = [3.5, -6, -4];
    }
    return [screenScale, screenPosition, rotation]
  }
  // Motorola Radio
  const adjustRadioForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [0.1, 0.5, 0.1];
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [0.06, 0.06, 0.06];
      screenPosition = [11.3, -5.2, -5];
    }
    return [screenScale, screenPosition, rotation]
  }
  
  //Dynamic background color controller
  const changeBackgroundColor = () =>{
    let colorIntensity = PortfolioThemeConfig.mainContainer.background.colorTransparencyTransitionStepsMin;
    setInterval(() => {
      if (colorIntensity > PortfolioThemeConfig.mainContainer.background.colorTransparencyTransitionStepsMax) {
        colorIntensity = PortfolioThemeConfig.mainContainer.background.colorTransparencyTransitionStepsMin;
      } else {
        colorIntensity = colorIntensity + PortfolioThemeConfig.mainContainer.background.colorTransparencyTransitionStepsGap;
      }
      contentContainerRef.current.style.backgroundColor = `rgb(
        ${PortfolioThemeConfig.mainContainer.background.color.rgba.r + 10}, 
        ${PortfolioThemeConfig.mainContainer.background.color.rgba.g + 10}, 
        ${PortfolioThemeConfig.mainContainer.background.color.rgba.b + 10}, 
        ${colorIntensity * 0.01}
        )`;
      setBgColorStage(colorIntensity)
    }, [5000])
  }
  useEffect(()=>{
    changeBackgroundColor();
  },[])
  // Calling screen adjustment funcionts
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [yellowSubmarineScale, yellowSubmarinePosition] = adjustYellowSubmarineForScreenSize();
  const [barcodeScannerScale, barcodeScannerPosition, barcodeScannerRotation] = adjustBarcodeScannerForScreenSize();
  const [tvScale, tvPosition, tvRotation] = adjustTVForScreenSize();
  const [radioScale, radioPosition, radioRotation] = adjustRadioForScreenSize();
  // return DOM object
  return (
    <section ref={contentContainerRef} className='w-full h-[100%] relative select-none'>
      {currentStage === 3 &&
        <HomeAboutInfo bgColorStage={bgColorStage} currentStage={currentStage} />
      }
      {currentStage === 4 &&
        <HomeContactInfo bgColorStage={bgColorStage} currentStage={currentStage} />
      }
      <Canvas className={`z-100 w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader size={20} />} >
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          {<hemisphereLight skyColor={'#b1e1ff'} groundColor={'#000000'} intensity={1} />}
          {/* <Bat position={[-10, 1, 1]} scale={[0.05, 0.05, 0.05]} /> */}
          <Bat position={[-10, 0, 0]} scale={[0.05, 0.05, 0.05]} />
          <Island position={islandPosition} scale={islandScale} rotation={islandRotation}
            isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage}
          />
          <YellowSubmarine scale={yellowSubmarineScale} position={yellowSubmarinePosition}
            rotation={[0, 20, 0]}/>
          {currentStage === 3 &&
            <BarcodeScanner scale={barcodeScannerScale} position={barcodeScannerPosition} rotation={barcodeScannerRotation} />
          }
          {currentStage === 2 &&
            <TV scale={tvScale} position={tvPosition} rotation={tvRotation} />
          }
          {currentStage === 4 &&
            <Radio scale={radioScale} position={radioPosition} rotation={radioRotation} />
          }
        </Suspense>
      </Canvas>
      {currentStage === 2 &&
        <HomeProjectsInfo bgColorStage={bgColorStage} currentStage={currentStage} />
      }
    </section>
  )
}
export default Home