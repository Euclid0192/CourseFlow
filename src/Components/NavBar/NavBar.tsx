import { Link, Outlet, useNavigate } from "react-router-dom"
import './NavBar.css'
import FlowChartIcon from "remixicon-react/FlowChartIcon"
import { UserExpert } from "grommet-icons"
import useAuthStore, { AuthState } from "../../Zustand/storeAuth"
import axiosInstance from "../../configs/axios"

const selector = (state: AuthState) => ({
  username: state.username,
  accessToken: state.accessToken,
  setUsername: state.setUsername,
  setAccessToken: state.setAccessToken,
  setRefreshToken: state.setRefreshToken
})

const NavBar = () => {

  const navigate = useNavigate()

  const { username, setUsername, setAccessToken, setRefreshToken } = useAuthStore(selector)

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout")      
      console.log("Logging out... ", response)

      navigate("/auth/login")

    } catch (err: any) {

      console.log("Error while logging out...", err)

    }

    navigate("/auth/login")     
    setUsername("")
    setAccessToken("")
    setRefreshToken("")         

  }

  /// When not logged in, show login/signup button
  const AuthButtons = () => {

    return (
      <div className="auth-btn">
        <button className="btn" onClick={() => navigate("/auth/login")}>Login</button>
        <button className="btn" onClick={() => navigate("/auth/signup")}>Sign Up</button>
      </div>
    )
  }

  /// If logged in, show account username
  const AccountInfo = () => {
    return (
      <Link className="account-info" to="/user">
        <UserExpert className="account-icon" size="30px"/>   
        <p className="account-username">{username}</p>  
        <button className="btn" onClick={logout}>Logout</button>
      </Link>
    )
  }

  console.log("username    ", username)


  return (
    <>
      <nav className="nav-bar">
          <div className="title">
              <p className="">CourseFlow</p>
              <FlowChartIcon className="title-icon" size="50px" color="#C8F578"/>
          </div>
          <Link to="/" className="nav-link">Home </Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/main" className="nav-link">Main Feature</Link>            
          {!username? <AuthButtons /> : <AccountInfo />}
      </nav>    
      <Outlet />
    </>

  )
}

export default NavBar