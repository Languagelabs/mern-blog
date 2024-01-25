import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice.js';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from "react-icons/ai";

export default function OAuth() { 
    const auth = getAuth(app);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleGoogleSignin = async () => {
        const provider = new GoogleAuthProvider()
        provider.getCustomParameters({prompt: 'select-account'})

        try {
            const requestedData = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    username: requestedData.user.displayName,
                    email: requestedData.user.email,
                    profilePIC: requestedData.user.photoURL,
                }) ,
            });
            const data = await res.json();
            if(res.ok){
                dispatch(signinSuccess(data))
                navigate('/')
            }
             
        } catch (error) {
            console.log(error.message)
        }
    }
    

  return (
    <div>
        <Button gradientDuoTone='pinkToOrange' className='w-full' outline type='button' onClick={handleGoogleSignin}>
            <AiFillGoogleCircle  className='w-6 h-6 mr-4'/> Google Signin 
        </Button>
    </div>
  )
}
