import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import SignUp from "./pages/SignUp" 
import Projects from "./pages/Projects"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />  
        <Route path="/projects" element={<Projects />} />  
      </Routes>
    </BrowserRouter>
    )
}