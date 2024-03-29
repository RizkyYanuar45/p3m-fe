import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Sepatupage from "./pages/Sepatupage";
import Syarat from "./pages/Syarat";
import Testimonial from "./pages/Testimonial";
import Faq from "./pages/Faq";
import Footercomp from "./components/Footercomp";
import Navbarcomp from "./components/Navbarcomp";

function App() {
  return (
    <div>
      <Navbarcomp />
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/kelas" Component={Sepatupage} />
        <Route path="/syarat" Component={Syarat} />
        <Route path="/testi" Component={Testimonial} />
        <Route path="/faq" Component={Faq} />
      </Routes>
      <Footercomp />
    </div>
  );
}

export default App;
