import "reactflow/dist/style.css";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import MainFeature from "./Components/MainFeature/MainFeature";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import About from "./Components/About/About";

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainFeature />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>

  );
};

export default App;
