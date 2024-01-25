import { Link , useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'

export default function Header() {

  const path = useLocation().pathname;
  const {currentUser} = useSelector((state) => state.user)
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
        {currentUser ? (
          <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={currentUser.picture} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{currentUser.username}</span>
            <span className="block truncate text-sm font-medium">{currentUser.email}</span>
          </Dropdown.Header>
          <Dropdown.Item >
           <Link to={'/dashboard?tab=profile'}> Profile </Link> 
          </Dropdown.Item> 
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        ) : (
          <Link to={'/signin'}>
            <Button gradientDuoTone='purpleToBlue' outline> Sign In </Button>        
          </Link> 
        )}
        

        
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
