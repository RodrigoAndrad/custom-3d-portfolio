import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='flex justify-between items-center w-full absolute top-0 bg-transparent right-0 left-0'>
      <NavLink to='/' className={'w-90 h-20 rounded-lg bg-white items-center justify-center flex font-bold shadow-md'}>
        <p className="blue-gradient_text" style={{fontFamily: "Shojumaru"}}>Rodrigo Andrade</p>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
