import "./styles.css";
import Nav from "./components/Nav/Nav";
import Intro from "./components/Intro/Intro";
import Contact from "./components/Contact/Contact";
import Service from "./components/Service/service";
import About from "./components/About/About";
import Error404 from "./components/Error404/Error404";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route index element={<Intro />} />
        <Route path="contact" element={<Contact />} />
        <Route path="service" element={<Service />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
