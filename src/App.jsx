import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { Home, About, Projects, Contact } from "./pages"
import Navbar from "./components/Navbar"
import MusicPlayer from './components/music-player/MusicPlayer';

const App = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false);
  const [isHiResSound, setIsHiResSound] = useState(true);
  const [bgColorStage, setBgColorStage] = useState(0);
  return (
    <main className='h-screen w-screen'>
      <Router basename="/custom-3d-portifolio/">
        <Navbar isRotating={isRotating} bgColorStage={bgColorStage} setBgColorStage={setBgColorStage} />
        <Routes>
          <Route path='/' element={
            <Home
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              bgColorStage={bgColorStage}
              setBgColorStage={setBgColorStage} />}
          />
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/contact' element={<Contact />} />
                </Routes>
              </>
            }
          />
        </Routes>
        <MusicPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isHiResSound={isHiResSound}
          // isHiResSound={false}
          setIsHiResSound={setIsHiResSound}
        />
      </Router>
    </main>
  )
}

export default App