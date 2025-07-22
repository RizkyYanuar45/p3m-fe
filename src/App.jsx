import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Tentang from "./pages/Tentang";
import PimpinanLembaga from "./pages/PimpinanLembaga";
import PanduanPenelitian from "./pages/PanduanPenelitian";
import ProgramPanduanPengabdianMasyarakatMandiri from "./pages/ProgramPanduanPengabdianMasyarakatMandiri";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import DokumenPenelitian from "./pages/DokumenPenelitian";
import SKRektor from "./pages/SKRektor";
import Sepatupage from "./pages/Sepatupage";
import Syarat from "./pages/Syarat";
import Testimonial from "./pages/Testimonial";
import Faq from "./pages/Faq";
import Footercomp from "./components/Footercomp";
import Navbarcomp from "./components/Navbarcomp";
import ProgramPengabdianMasyarakat from "./pages/ProgramPengabdianMasyarakat";

function App() {
  return (
    <div>
      <Navbarcomp />
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/tentang" Component={Tentang} />
        <Route path="/pimpinan-lembaga" Component={PimpinanLembaga} />
        <Route path="/struktur-organisasi" Component={StrukturOrganisasi} />
        <Route path="/panduan-penelitian" Component={PanduanPenelitian} />
        <Route path="/dokumen-penelitian" Component={DokumenPenelitian} />
        <Route
          path="/program-pengabdian-masyarakat"
          Component={ProgramPengabdianMasyarakat}
        />
        <Route
          path="/program-panduan-pengabdian-masyarakat-mandiri"
          Component={ProgramPanduanPengabdianMasyarakatMandiri}
        />
        <Route path="/sk-rektor" Component={SKRektor} />
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
