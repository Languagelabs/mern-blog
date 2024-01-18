import { Button, Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        {/*left div */}
        <div className="flex-1">
          <Link to={'/'} className=" font-bold dark:text-white text-4xl">
            <span className=" text-slate-950 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 px-2 py-1  rounded-lg">Mern</span> Blog
          </Link>
          <p className='text-sm mt-5'>Welcome to a my blog designed with MERN. Welcome to a my blog designed with MERN. Welcome to a my blog designed with MERN. </p>
        </div>
        {/*right div */}
        <div className="flex-1"> 
          <form className='flex flex-col gap-4 mt-3 md:mt-0'>
            <div className=''>
              <Label value='Your Username'/>
              <TextInput placeholder='Username' id='username' type='text' />
            </div>
            <div className=''>
              <Label value='Your Email'/>
              <TextInput placeholder='johndoe@gmail.com' id='email' type='email' />
            </div>
            <div className=''>
              <Label value='Your Password'/>
              <TextInput placeholder='password' id='password' type='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have and account?</span>
            <Link to={'/signin'} className='text-blue-500'>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
