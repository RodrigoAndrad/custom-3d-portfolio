import { useState, useRef, useEffect } from 'react'

import ToogleButton from "../ToogleButton";
// Images
import playAudioButtom from '../../assets/images/play.png'
import stopAudioButtom from '../../assets/images/stop.png'
import pauseAudioButtom from '../../assets/images/pause.png'
import restartAudioButtom from '../../assets/images/restart.png'
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
        highRes: [
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
    const audioControls = {
        volume: {
            current: 0.4,
            last: 0.4
        }
    }
    const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);
    const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(audioControls.volume.current)
    const audioVolumeInputRef = useRef(audioControls.volume.current)
    //initialize ref for use first music of playlist on first load using arbitrary values
    const audioIndexRef = useRef(0);
    //loads audio file
    const audioRef = useRef(new Audio(isHiResSound ? playlist.highRes[audioIndexRef.current].file : playlist.lowRes[audioIndexRef.current].file));
    // Sets audio config to play next music on the end of each track
    isHiResSound ? audioRef.current.loop = false : audioRef.current.loop = true;
    audioRef.current.onended = () => {
        playNextMusic();
    }
    /* Audio Functions */
    // Function for play music setting onEnding events pausing music before make the switch and sets volume to current
    const changeCurrentMusic = () => {
        audioRef.current.pause()
        audioRef.current = new Audio(isHiResSound ? playlist.highRes[audioIndexRef.current].file : playlist.lowRes[audioIndexRef.current].file)
        isHiResSound ? audioRef.current.onended = () => { playNextMusic(); } : audioRef.current.loop = true
        setIsPlaying(true)
        audioRef.current.volume = audioVolumeInputRef.current.volume.current;
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
        audioRef.current = new Audio(isHiResSound ? playlist.highRes[audioIndexRef.current].file : playlist.lowRes[audioIndexRef.current].file)
        isHiResSound ? audioRef.current.onended = () => { playNextMusic(); } : audioRef.current.loop = true
        audioRef.current.volume = audioVolumeInputRef.current.volume.current;
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
        audioControls.volume.current = 0;
    }
    //Unmute audio
    const unmuteMusic = () => {
        setIsMuted(false)
        audioRef.current.volume = audioControls.volume.last;
        audioControls.volume.current = audioControls.volume.last;
        audioControls.volume.last = 0;
        // audioRef.current.volume = 0.4;
    }
    //Adjust audio volume
    const adjustAudioVolume = () => {
        // Checks if its muted to prevent unmute when changing slider value
        // As it it disabled on UI when is muted, doesn't need to have this enabled.
        // if(!isMuted){
        audioRef.current.volume = audioVolumeInputRef.current.value;
        audioControls.volume.current = audioVolumeInputRef.current.value;
        setBackgroundMusicVolume(audioVolumeInputRef.current.value)
        // }
    }
    //Plays next Music from Playlist
    const playNextMusic = () => {
        try {
            if (audioIndexRef.current < (isHiResSound ? playlist.highRes.length - 1 : playlist.lowRes.length - 1)) {
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
                audioIndexRef.current = isHiResSound ? playlist.highRes.length - 1 : playlist.lowRes.length - 1;
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
    }, [isPlaying, audioRef, isHiResSound]);
    return (
        <>
            <span className={`flex absolute items-center bottom-17 right-31 w-[5rem] h-[5%] z-500 gap-10 ${isVolumeControlVisible ? '' : 'hidden'} select-none`}>
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
            <ToogleButton isHiResSound={isHiResSound} setIsHiResSound={setIsHiResSound} />
        </>
    )
}

export default MusicPlayer