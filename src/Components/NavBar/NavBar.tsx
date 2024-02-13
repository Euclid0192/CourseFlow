import { Link, NavLink } from "react-router-dom"
import './NavBar.css'
import { Inherit } from "grommet-icons"

const NavBar = () => {
  return (
    <nav className="nav-bar">
        <div className="title">
            <p className="">CourseFlow</p>
            <Inherit className="title-icon" size="50px" color="#C8F578"/>
        </div>
        <Link to="/" className="nav-link">Home </Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/main" className="nav-link">Main Feature</Link>
        <Link to="/auth/login" className="nav-link">Login</Link>
        <Link to="/auth/signup" className="nav-link">Sign Up</Link>
    </nav>
  )
}

export default NavBar