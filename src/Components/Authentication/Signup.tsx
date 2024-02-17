import './Signup.css'
import { useState } from 'react'
import axiosInstance from '../../configs/axios'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../Zustand/storeAuth'
import { AuthState } from '../../Zustand/storeAuth'

const selector = (state: AuthState) => ({
    accessToken: state.accessToken
})

const Signup = () => {

  const { accessToken } = useAuthStore(selector)

  const [ username, setUsername ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ confirmPassword, setConfirmPassword ] = useState<string>("")
  const [ err, setErr ] = useState<string>("")

  const navigate = useNavigate()


  const submitForm = async (evt: any) => {
    evt.preventDefault()

    console.log("In submit form...")

    /// Check password match
    if (password != confirmPassword)
    {
      return setErr("Confirm password does not match")
    }

    /// If match
    try {

      const response = await axiosInstance.post(
        '/auth/signup',
        { username, password },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      console.log("Response from post request ", response)
      console.log("Signup successfully!")

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
        <p className='signup-title'>Create new account</p>
      </div>
      {/* Actual form */}
      <form className='signup-form' onSubmit={submitForm}>
        <label htmlFor='username' className='input-label'>Username <span style={{color: '#EE4B2B'}}>*</span></label>
        <input 
          type='text'
          required
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          className='signup-input'
        />
        <label htmlFor='password' className='input-label'>Password <span style={{color: '#EE4B2B'}}>*</span></label>
        <input 
          type='text'
          required
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className='signup-input'
        />
        <label htmlFor='retype-password' className='input-label'>Confirm Password <span style={{color: '#EE4B2B'}}>*</span></label>
        <input 
          type='text'
          required
          value={confirmPassword}
          onChange={(evt) => setConfirmPassword(evt.target.value)}
          className='signup-input'
        />
        <p className='err'>{err}</p>      
        <div className='btn-container'> 
          <button className='btn' type='submit'>Continue</button>
        </div>
      </form>
    </div>
  )
}

export default Signup