import './Login.css'
import { useState } from 'react'
import axiosInstance from '../../configs/axios'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../Zustand/storeAuth'
import { AuthState } from '../../Zustand/storeAuth'

const selector = (state: AuthState) => ({
    accessToken: state.accessToken
})

const Login = () => {

  const { accessToken } = useAuthStore(selector)

  const [ username, setUsername ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ err, setErr ] = useState<string>("")

  const navigate = useNavigate()


  const submitForm = async (evt: any) => {
    evt.preventDefault()

    console.log("In submit form...")

    try {

      // const response = await axios.post(
      //   'http://localhost:3000/auth/login',
      //   { username, password },
      // )

      const response = await axiosInstance.post(
        '/auth/login',
        {username, password},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      console.log("Response from post request ", response)

      navigate('/main')

    } catch (err: any) {
      console.log("Submit error: ", err)

      const errMsg = err!.response?.data?.message
      console.log(errMsg)

      setErr(errMsg)
    } 
  }

  return (
    <div className='form-container'>
      {/* App name and log in title */}
      <div className='form-title'>
        <p className='login-title'>Log in</p>
      </div>
      {/* Actual form */}
      <form className='login-form' onSubmit={submitForm}>
        <label htmlFor='username' className='input-label'>Username <span style={{color: '#EE4B2B'}}>*</span></label>
        <input 
          type='text'
          required
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          className='login-input'
        />
        <label htmlFor='password' className='input-label'>Password <span style={{color: '#EE4B2B'}}>*</span></label>
        <input 
          type='text'
          required
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className='login-input'
        />
        <p className='err'>{err}</p>      
        <div className='btn-container'> 
          <button className='btn' type='submit'>Continue</button>
        </div>
      </form>
    </div>
  )
}

export default Login