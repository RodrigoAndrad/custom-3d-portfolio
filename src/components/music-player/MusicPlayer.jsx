import { useState, useRef, useEffect } from 'react'

import ToogleButton from "../ToogleButton";
// Images
import playAudioButtom from '../../assets/images/play.png'
import stopAudioButtom from '../../assets/images/stop.png'
import pauseAudioButtom from '../../assets/images/pause.png'
import replayAudioButtom from '../../assets/images/restart.png'
import rewindAudioButtom from '../../assets/images/rrw.png'
import forwardAudioButtom from '../../assets/images/ffw.png'
import volumeAudioButtom from '../../assets/images/volume.png'
import muteAudioButtom from '../../assets/images/mute.png'
import unmuteAudioButtom from '../../assets/images/unmute.png'
// Audios
//hiigh res
import audioBg1Hi from '../../assets/audios/musics-high-res/Michael Shynes - Calling All the People.mp3'
import audioBg2Hi from '../../assets/audios/musics-high-res/Ian Post - Breathe - Instrumental Version.mp3'
import audioBg3Hi from '../../assets/audios/musics-high-res/SLPSTRM - Do the Math.mp3'
import audioBg4Hi from '../../assets/audios/musics-high-res/Sora Shima - Glass Coffins.mp3'
import audioBg5Hi from '../../assets/audios/musics-high-res/Tiko Tiko - Solar Flares - No Backing Vocals.mp3'
import audioBg6Hi from '../../assets/audios/musics-high-res/Wheres LuLu - Hell Yeah.mp3'
//low res
import audioBg1Low from '../../assets/audios/musics-low-res/80s-Space-Game-Loop_v002.mp3'
import audioBg2Low from '../../assets/audios/musics-low-res/Future-RPG.mp3'
import audioBg3Low from '../../assets/audios/musics-low-res/Futureopolis.mp3'
import audioBg4Low from '../../assets/audios/musics-low-res/Mystical-Ocean-Puzzle-Game.mp3'
import audioBg5Low from '../../assets/audios/musics-low-res/Spooky-Island.mp3'
import audioBg6Low from '../../assets/audios/musics-low-res/Tiko Tiko - Solar Flares - No Backing Vocals.mp3'

const MusicPlayer = ({ isPlaying, setIsPlaying, isMuted, setIsMuted, isHiResSound, setIsHiResSound }) => {
    const playlist =
    {
        hiRes: [
            {
                trakNumber: 0,
                name: 'audioBg1Hi',
                file: audioBg1Hi
            },
            {
                trakNumber: 1,
                name: 'audioBg2Hi',
                file: audioBg2Hi
            },
            {
                trakNumber: 2,
                name: 'audioBg3Hi',
                file: audioBg3Hi
            },
            {
                trakNumber: 3,
                name: 'audioBg4Hi',
                file: audioBg4Hi
            },
            {
                trakNumber: 4,
                name: 'audioBg5Hi',
                file: audioBg5Hi
            },
            {
                trakNumber: 5,
                name: 'audioBg6Hi',
                file: audioBg6Hi
            },
        ],
        lowRes: [
            {
                trakNumber: 0,
                name: 'audioBg1Low',
                file: audioBg1Low
            },
            {
                trakNumber: 1,
                name: 'audioBg2Low',
                file: audioBg2Low
            },
            {
                trakNumber: 2,
                name: 'audioBg3Low',
                file: audioBg3Low
            },
            {
                trakNumber: 3,
                name: 'audioBg4Low',
                file: audioBg4Low
            },
            {
                trakNumber: 4,
                name: 'audioBg5Low',
                file: audioBg5Low
            },
            {
                trakNumber: 5,
                name: 'audioBg6Low',
                file: audioBg6Low
            },
        ],
    }
    let defaultBgMusicVolume = 0.4; //Assumes new defaults as user selects values on the inpit
    const [isVolumeSwitchVisible, setIsVolumeSwitchVisible] = useState(false);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
    const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(defaultBgMusicVolume)
    const audioVolumeInputRef = useRef();
    // Setup the first music to be played
    // It must be done to have a ref to use on the start
    const currentMusicRef = useRef(new Audio(playlist.hiRes[currentMusicIndex].file));
    currentMusicRef.current.loop = false;

    const loadMusic = () => {
        if (isHiResSound) {
            currentMusicRef.current = new Audio(playlist.hiRes[currentMusicIndex].file);
            currentMusicRef.current.loop = false;
            currentMusicRef.current.onended = () => {
                playNextMusic();
            }
        }
        else {
            currentMusicRef.current = new Audio(playlist.lowRes[currentMusicIndex].file);
            currentMusicRef.current.loop = true;
        }
    }

    const playMusic = () => {
        setIsPlaying(true);
        currentMusicRef.current.play();
    }

    const pauseMusic = () => {
        setIsPlaying(false);
        currentMusicRef.current.pause();
    }

    const stopMusic = () => {
        setIsPlaying(false);
        currentMusicRef.current.pause();
        loadMusic();
    }

    const replayMusic = () => {
        currentMusicRef.current.pause();
        loadMusic();
        playMusic();
    }

    const playNextMusic = () => {
        if (isHiResSound) {
            if (currentMusicIndex < playlist.hiRes.length - 1) {
                setCurrentMusicIndex(currentMusicIndex + 1);
            } else {
                setCurrentMusicIndex(0);
            }
        } else {
            if (currentMusicIndex < playlist.lowRes.length - 1) {
                setCurrentMusicIndex(currentMusicIndex + 1);
            } else {
                setCurrentMusicIndex(0);
            }
        }
        isPlaying && currentMusicRef.current.pause();
        loadMusic();
        isPlaying && playMusic();
    }

    const playPreviousMusic = () => {
        if (currentMusicIndex > 0) {
            setCurrentMusicIndex(currentMusicIndex - 1);
        } else {
            setCurrentMusicIndex(playlist.hiRes.length - 1);
        }
        currentMusicRef.current.pause();
        loadMusic();
        if (isPlaying) {
            playMusic();
        }
    }

    const volumeSwitchToggle = () => {
        setIsVolumeSwitchVisible(!isVolumeSwitchVisible);
    }

    const muteMusic = () => {
        setIsMuted(true);
    }

    const unmuteMusic = () => {
        setIsMuted(false);
    }

    const adjustAudioVolume = () => {
        // Checks if its muted to prevent unmute when changing slider value
        // As it it disabled on UI when is muted, doesn't need to have this enabled.
        // if(!isMuted){
        currentMusicRef.current.volume = audioVolumeInputRef.current.value;
        defaultBgMusicVolume = audioVolumeInputRef.current.value;
        setBackgroundMusicVolume(audioVolumeInputRef.current.value)
        // }
    }

    currentMusicRef.current.onended = () => {
        playNextMusic();
    }

    useEffect(() => {
        isMuted ? currentMusicRef.current.volume = 0 : currentMusicRef.current.volume = backgroundMusicVolume;
    }, [isMuted])

    useEffect(() => {
        isPlaying && currentMusicRef.current.pause();
        loadMusic();
        isPlaying && currentMusicRef.current.play();
    }, [isHiResSound])

    useEffect(() => {
        currentMusicRef.current.volume = backgroundMusicVolume;
    }, [currentMusicRef.current.file])

    return (
        <>
            <span className={`flex absolute items-center bottom-17 right-31 w-[5rem] h-[5%] z-500 gap-10 ${isVolumeSwitchVisible ? '' : 'hidden'} select-none`}>
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
                    disabled={isMuted}
                />
            </span>
            <span className='flex absolute items-center bottom-1 right-15 w-[22rem] h-[5%] z-500 gap-10 select-none'>
                <span onClick={stopMusic} className={`cursor-pointer ${isPlaying ? '' : 'invisible'}`}>
                    <img src={stopAudioButtom} width={300} />
                </span>
                <span onClick={replayMusic} className={`cursor-pointer`}>
                    <img src={replayAudioButtom} width={300} />
                </span>
                <span onClick={playPreviousMusic} className={`cursor-pointer`}>
                    <img src={rewindAudioButtom} width={300} />
                </span>
                <span className={`cursor-pointer`}>
                    <span onClick={playMusic} className={`cursor-pointer ${isPlaying ? 'hidden' : ''}`}>
                        <img src={playAudioButtom} width={300} />
                    </span>
                    <span onClick={pauseMusic} className={`cursor-pointer ${isPlaying ? '' : 'hidden'}`}>
                        <img src={pauseAudioButtom} width={300} />
                    </span>
                </span>
                <span onClick={playNextMusic} className={`cursor-pointer`}>
                    <img src={forwardAudioButtom} width={300} />
                </span>
                <span onClick={volumeSwitchToggle} className={`cursor-pointer`}>
                    <img src={volumeAudioButtom} width={300} />
                </span>
                <span>
                    {isMuted ?
                        <img src={unmuteAudioButtom} onClick={unmuteMusic} width={300} className={`cursor-pointer`} />
                        : <img src={muteAudioButtom} onClick={muteMusic} width={300} className={`cursor-pointer`} />}
                </span>
            </span>
            <ToogleButton isHiResSound={isHiResSound} setIsHiResSound={setIsHiResSound} />
        </>
    )
}

export default MusicPlayer