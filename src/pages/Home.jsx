// Community Libraries
import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// Project's Shared Components
import Loader from '../components/Loader';
import HomeAboutInfo from '../components/HomeAboutInfo';
import HomeProjectsInfo from '../components/HomeProjectsInfo';
import HomeContactInfo from '../components/HomeContactInfo';
// Theme Config
import PortfolioThemeConfig from '../constants/SiteThemeConfig';
// Project's 3D Models Components
import Island from '../models/Island';
import YellowSubmarine from '../models/YellowSubmarine';
import Bat from '../models/Bat';
import BarcodeScanner from '../models/BarcodeScanner';
import TV from '../models/TV';
import Radio from '../models/Radio';
// Images
import playAudioButtom from '../assets/images/play.png'
import stopAudioButtom from '../assets/images/stop.png'
import pauseAudioButtom from '../assets/images/pause.png'
import restartAudioButtom from '../assets/images/restart.png'
import rewindAudioButtom from '../assets/images/rrw.png'
import forwardAudioButtom from '../assets/images/ffw.png'
import volumeAudioButtom from '../assets/images/volume.png'
import muteAudioButtom from '../assets/images/mute.png'
import unmuteAudioButtom from '../assets/images/unmute.png'
// Audios
import audioBg1 from '../assets/audios/Michael Shynes - Calling All the People.mp3'
import audioBg2 from '../assets/audios/Ian Post - Breathe - Instrumental Version.mp3'
import audioBg3 from '../assets/audios/SLPSTRM - Do the Math.mp3'
import audioBg4 from '../assets/audios/Sora Shima - Glass Coffins.mp3'
import audioBg5 from '../assets/audios/Tiko Tiko - Solar Flares - No Backing Vocals.mp3'
import audioBg6 from '../assets/audios/Wheres LuLu - Hell Yeah.mp3'


const Home = ({ isRotating, setIsRotating, isPlaying, setIsPlaying, bgColorStage, setBgColorStage, ...props }) => {

  const playlist =
    [
      {
        trakNumber: 0,
        name: 'audioBg1',
        file: audioBg1
      },
      {
        trakNumber: 1,
        name: 'audioBg2',
        file: audioBg2
      },
      {
        trakNumber: 2,
        name: 'audioBg3',
        file: audioBg3
      },
      {
        trakNumber: 3,
        name: 'audioBg4',
        file: audioBg4
      },
      {
        trakNumber: 4,
        name: 'audioBg5',
        file: audioBg5
      },
      {
        trakNumber: 5,
        name: 'audioBg6',
        file: audioBg6
      },
    ]
  const audioControls = {
    volume: {
      current: 0.4,
      last: 0.4
    }
  }

  const [currentStage, setCurrentStage] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);
  const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(audioControls.volume.current)
  const contentContainerRef = useRef(null);
  
  const audioVolumeInputRef = useRef(audioControls.volume.current)
  //initialize ref for use first music of playlist on first load using arbitrary values
  const audioIndexRef = useRef(0);
  const audioRef = useRef(new Audio(playlist[audioIndexRef.current].file));
  audioRef.current.loop = false;
  audioRef.current.onended = () => {
    playNextMusic();
  }
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
  /* Audio Functions */
  // Function for play music setting onEnding events pausing music before make the switch
  const changeCurrentMusic = () => {
    audioRef.current.pause()
    audioRef.current = new Audio(playlist[audioIndexRef.current].file)
    audioRef.current.onended = () => {
      playNextMusic();
    }
    audioRef.current.volume = audioControls.volume.current;
    setIsPlaying(true)
    audioRef.current.play()
  }
  // Toogle Play / Pause button on UI
  const togglePlayPauseMusic = () => {
    setIsPlaying(!isPlaying)
  }
  // Stop music
  const stopMusic = () => {
    setIsPlaying(!isPlaying)
    audioRef.current.pause()
    audioRef.current = new Audio(playlist[audioIndexRef.current].file)
    audioRef.current.onended = () => {
      playNextMusic();
    }
    audioRef.current.volume = audioControls.volume.current;
  }
  //Toggle volume control visibility
  const toggleVolumeControl = () => {
    setIsVolumeControlVisible(!isVolumeControlVisible);
  }
  //Mute audio
  const muteMusic = () => {
    setIsMuted(true)
    audioControls.volume.last = audioRef.current.volume;
    audioRef.current.volume = 0;
  }
  //Unmute audio
  const unmuteMusic = () => {
    setIsMuted(false)
    audioRef.current.volume = audioControls.volume.last;
    audioControls.volume.last = 0;
    // audioRef.current.volume = 0.4;
  }
  //Adjust audio volume
  const adjustAudioVolume = () => {
      audioRef.current.volume = audioVolumeInputRef.current.value;
      audioControls.volume.current = audioVolumeInputRef.current.value;
      setBackgroundMusicVolume(audioVolumeInputRef.current.value)
  }
  //Plays next Music from Playlist
  const playNextMusic = () => {
    try {
      if (audioIndexRef.current < playlist.length - 1) {
        audioIndexRef.current = audioIndexRef.current + 1;
      } else {
        audioIndexRef.current = 0;
      }
    } catch {

    } finally {
      changeCurrentMusic();
    }
  }
  //Replay the current music from start
  const restartCurrentMusic = () => {
    changeCurrentMusic();
  }
  //Toogle isPlaying and replay the current music from start
  const replayCurrentMusic = () => {
    setIsPlaying(true);
  }
  const playPreviousMusic = () => {
    try {
      if (audioIndexRef.current > 0) {
        audioIndexRef.current = audioIndexRef.current - 1;
      } else {
        audioIndexRef.current = playlist.length - 1;
      }
    } catch {
    } finally {
      changeCurrentMusic();
    }
  }
  //Play / Pause music control
  useEffect(() => {
    audioRef.current.volume = audioControls.volume.current;
    if (isPlaying) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    };
  }, [isPlaying, audioRef]);
  //Dynamic background color controller
  useEffect(() => {
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
  }, [])
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
          <Bat position={[-10, 1, 1]} scale={[0.05, 0.05, 0.05]} />
          <Island position={islandPosition} scale={islandScale} rotation={islandRotation}
            isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage}
          />
          <YellowSubmarine scale={yellowSubmarineScale} position={yellowSubmarinePosition}
            rotation={[0, 20, 0]} isRotating={isRotating} />
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
      <span className={`flex absolute items-center bottom-17 right-31 w-[5rem] h-[5%] z-500 gap-10 ${isVolumeControlVisible ? '' : 'hidden'}`}>
        <input type={'range'} id={'volume'} min={0} max={1} step={0.01}
          className="h-30 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
          style={
            {
              writingMode: 'vertical-lr',
              direction: 'rtl',
              appearance: 'slider-vertical',
              verticalAlign: 'bottom',
              width: '160px'
            }
          }
          ref={audioVolumeInputRef}
          value={backgroundMusicVolume}
          onChange={adjustAudioVolume}
        />
      </span>
      <span className='flex absolute items-center bottom-1 right-15 w-[22rem] h-[5%] z-500 gap-10'>
        <span onClick={stopMusic} className={`cursor-pointer ${isPlaying ? '' : 'invisible'}`}>
          <img src={stopAudioButtom} width={300} />
        </span>
        <span onClick={restartCurrentMusic} className={`cursor-pointer ${isPlaying ? '' : 'hidden'}`}>
          <img src={restartAudioButtom} width={300} />
        </span>
        <span onClick={replayCurrentMusic} className={`cursor-pointer ${isPlaying ? 'hidden' : ''}`}>
          <img src={restartAudioButtom} width={300} />
        </span>
        <span onClick={playPreviousMusic} className={`cursor-pointer`}>
          <img src={rewindAudioButtom} width={300} />
        </span>
        <span onClick={togglePlayPauseMusic} className={`cursor-pointer`}>
          <span className={`cursor-pointer ${isPlaying ? 'hidden' : ''}`}>
            <img src={playAudioButtom} width={300} />
          </span>
          <span className={`cursor-pointer ${isPlaying ? '' : 'hidden'}`}>
            <img src={pauseAudioButtom} width={300} />
          </span>
        </span>
        <span onClick={playNextMusic} className={`cursor-pointer`}>
          <img src={forwardAudioButtom} width={300} />
        </span>
        <span onClick={toggleVolumeControl} className={`cursor-pointer`}>
          <img src={volumeAudioButtom} width={300} />
        </span>
        <span>
          {isMuted ?
            <img src={unmuteAudioButtom} onClick={unmuteMusic} width={300} className={`cursor-pointer`} />
            : <img src={muteAudioButtom} onClick={muteMusic} width={300} className={`cursor-pointer`} />}
        </span>
      </span>
    </section>
  )
}
export default Home