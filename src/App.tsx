import "reactflow/dist/style.css";
import "./App.css"
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import MainFeature from "./Components/MainFeature/MainFeature";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import About from "./Components/About/About";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";

const App = () => {

  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/main" element={<MainFeature />} /> */}
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="main" element={<MainFeature />} />
          <Route path="auth" element={<Outlet />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>

  );
};

export default App;
