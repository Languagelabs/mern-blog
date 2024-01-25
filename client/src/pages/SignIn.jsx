import { useState , Fragment} from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';


export default function SignIn() {
  const [formData, setFormData] = useState({}); 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !formData.email || !formData.password) {
      return dispatch(signinFailure('Enter all fields required'));
    }
    
    try{ 
      dispatch(signinStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();  
      
      if(data.success === false){
        dispatch(signinFailure(data.message))
      }
       
      if(res.ok){
        dispatch(signinSuccess(data))
        navigate('/')
      }
    } catch(error){ 
        dispatch(signinFailure(error.message))
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
              ) : 'Sign in'}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Do not have and account?</span>
            <Link to={'/signup'} className='text-blue-500'>Sign up</Link>
          </div>

          {errorMessage && <Alert className='mt-3' color='failure'>{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  )
}
