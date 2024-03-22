import React from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return <BrowserRouter>

  <Header />

  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/sign-in" element={<Signin />}/>
    <Route path="/sign-up" element={<SignUp />}/>
    <Route path="/about" element={<About />}/>

    {/* --------- protected route ------------ */}

    <Route element={<PrivateRoute/>}> 
    <Route path="/profile" element={<Profile />}/>
    </Route>
    
  </Routes>
  </BrowserRouter>
}

export default App
