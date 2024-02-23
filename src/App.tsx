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
import Account from "./Components/Account/Account";

const App = () => {

  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          
          <Route path="main" element={<Outlet />}>
            <Route index element={<MainFeature />} />
            <Route path=":flowId" element={<MainFeature />} />
          </Route>

          <Route path="auth" element={<Outlet />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="user" element={<Account />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>

  );
};

export default App;
