import React, { useEffect } from 'react'
import { REQUEST_URL } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ isAuthenticated }) => {

    const navigate = useNavigate()

    const handleLogin = async () => {
        window.open(`${REQUEST_URL}/google_login`, "_self")
    }

    useEffect(() => {
      if(isAuthenticated){
        navigate("/")
      }
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [navigate, isAuthenticated])

  return (
    <div className='flex justify-center items-center w-full h-[100vh]'>
      <button className='px-10 p-5 bg-red-500 text-white font-bold rounded-full mb-10 uppercase' onClick={handleLogin}>Sign in</button>
    </div>
  )
}

export default LoginPage
