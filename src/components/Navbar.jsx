import { NavLink } from "react-router-dom";
import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import TunaFish from '../models/TunaFish';
import { useNavigate } from 'react-router-dom'


const Navbar = ({isRotating, bgColorStage, ...props}) => {
  const navigate = useNavigate();
  
  const handleKeyDown = (e) => {
    if (e.key === 's' || e.key === 'S'){
      navigate('/about')
    } else if (e.key === 'p' || e.key === 'P'){
      navigate('/projects')
    } else if (e.key === 'h' || e.key === 'H'){
      navigate('/')
    } else if (e.key === 'm' || e.key === 'M'){
      navigate('/mail-me')
    } else if (e.key === 'l' || e.key === 'L'){
      navigate('/linkedin')
    } else if (e.key === 'g' || e.key === 'G'){
      navigate('/github')
    } else if (e.key === 'd' || e.key === 'D'){
      navigate('/download-cv-form')
    }
  }

  useEffect(()=>{
    document.addEventListener('keydown', handleKeyDown);
    return ()=>{
      document.removeEventListener('keydown', handleKeyDown);
    }
  },[handleKeyDown])
  

  return (
    <header className='flex justify-between items-center w-full absolute top-0 bg-transparent right-0 left-0 z-110'>
      <NavLink to='/' className={`mt-4 ml-4 w-[15%] h-20 rounded-lg ${(bgColorStage === 0) ? 'bg-amber-300/20' : 'bg-white'} items-center justify-center flex font-bold shadow-lg`}>
        <Canvas className={`z-110 w-[55%] h-screen bg-transparent`}
          camera={{ near: 0.1, far: 1000 }}
        >
          <Suspense fallback={<Loader size={10}/>} >
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            {<hemisphereLight skyColor={'#b1e1ff'} groundColor={'#000000'} intensity={1} />}
            <TunaFish className scale={[1, 1, 1]} position={[0,0,0]}
              rotation={[0, 29.45, 0]} isRotating={isRotating} />
          </Suspense>
        </Canvas>
        <p className="blue-gradient_text mr-5" style={{ fontFamily: "Shojumaru" }}>Rodrigo Andrade</p>
      </NavLink>
      <nav className='inline-block text-lg gap-27 font-medium w-full items-center text-right' style={{ fontFamily: 'Shojumaru' }}>
        <NavLink to='/about' className={`ml-20 mr-10 ${({ isActive }) => isActive ? "text-blue-600" : "text-black"}`}>
          Sobre
        </NavLink>
        <NavLink to='/projects' className={`ml-10 mr-30 ${({ isActive }) => isActive ? "text-blue-600" : "text-black"}`}>
          Projetos
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
