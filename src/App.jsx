import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, About, Projects, Contact } from "./pages"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <main className='h-screen w-screen bg-amber-300/0'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
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
      </Router>
    </main>
  )
}

export default App