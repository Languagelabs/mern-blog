import { Link , useLocation } from "react-router-dom";
import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'

export default function Header() {

  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 ">
      <Link to={'/'} className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className=" text-slate-950 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 px-2 py-1  rounded-lg">Mern</span> Blog
      </Link>
      <form>
        <TextInput 
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch} 
          className="hidden md:inline"
          style={{outline: 'none'}}
        />
      </form>
      
      <Button className="w-12 h-10 bg-gray-100 text-slate-950 md:hidden" pill>
        <AiOutlineSearch/>
      </Button> 

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill> 
          <FaMoon />
        </Button>
        <Link to={'/signin'}>
          <Button gradientDuoTone='purpleToBlue'> Sign In </Button>        
        </Link> 
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to={'/'}>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to={'/about'}>About</Link>
          </Navbar.Link>
          <Navbar.Link  active={path === '/projects'} as={'div'}>
            <Link to={'/projects'} >Projects</Link>
          </Navbar.Link> 
      </Navbar.Collapse>
    </Navbar>

  )
}
