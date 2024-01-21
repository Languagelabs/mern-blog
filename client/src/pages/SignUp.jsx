import { useState , Fragment} from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Enter all fields');
    }
    
    try{ 
      setErrorMessage(null);
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();  
      
      if(data.success === false){
        setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/signin')
      }
    } catch(error){ 
        setErrorMessage(error.message)
        setLoading(false)
    }
  }
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
          <form className='flex flex-col gap-4 mt-3 md:mt-0' onSubmit={handleSubmit}>
            <div className=''>
              <Label value='Your Username'/>
              <TextInput placeholder='Username' id='username' type='text' onChange={handleChange} />
            </div>
            <div className=''>
              <Label value='Your Email'/>
              <TextInput placeholder='johndoe@gmail.com' id='email' type='email' onChange={handleChange} />
            </div>
            <div className=''>
              <Label value='Your Password'/>
              <TextInput placeholder='password' id='password' type='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <Fragment>
                  <Spinner size='sm'/>
                  <span className='ml-2'>Loading...</span>
                </Fragment>
              ) : 'Sign up'}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have and account?</span>
            <Link to={'/signin'} className='text-blue-500'>Sign in</Link>
          </div>

          {errorMessage && <Alert className='mt-3' color='failure'>{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  )
}
