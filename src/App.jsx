import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Tentang from "./pages/Tentang";
import PimpinanLembaga from "./pages/PimpinanLembaga";
import PanduanPenelitian from "./pages/PanduanPenelitian";
import PanduanPengabdianKepadaMasyarakat from "./pages/PanduanPengabdianKepadaMasyarakat";
import ProgramPanduanPengabdianMasyarakatMandiri from "./pages/ProgramPanduanPengabdianMasyarakatMandiri";
import InformasiPengabdianKepadaMasyarakat from "./pages/InformasiPengabdianKepadaMasyarakat";
import SKPengabdianKepadaMasyarakat from "./pages/SKPengabdianKepadaMasyarakat";
import DokumenPengabdianPadaMasyarakat from "./pages/DokumenPengabdianPadaMasyarakat";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import DokumenPenelitian from "./pages/DokumenPenelitian";
import InformasiPenelitian from "./pages/InformasiPenelitian";
import InformasiKKNUNIM from "./pages/InformasiKKNUNIM";
import SKRektor from "./pages/SKRektor";
import Sepatupage from "./pages/Sepatupage";
import Syarat from "./pages/Syarat";
import Testimonial from "./pages/Testimonial";
import Faq from "./pages/Faq";
import Footercomp from "./components/Footercomp";
import Navbarcomp from "./components/Navbarcomp";
import ProgramPengabdianMasyarakat from "./pages/ProgramPengabdianMasyarakat";
import Login from "./pages/admin/login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import RequireAuth from "./pages/admin/RequireAuth";
import { panduanPengabdianKepadaMasyarakat } from "./data/panduanPengabdianKepadaMasyarakat";

function App() {
  return (
    <Routes>
      {/* Route admin tanpa Navbar/Footer */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <DashboardAdmin />
          </RequireAuth>
        }
      />
      {/* Route publik dengan Navbar/Footer */}
      <Route
        path="*"
        element={
          <div>
            <Navbarcomp />
            <div className="main-content">
              <Routes>
                <Route path="/" Component={Homepage} />
                <Route path="/tentang" Component={Tentang} />
                <Route path="/pimpinan-lembaga" Component={PimpinanLembaga} />
                <Route
                  path="/struktur-organisasi"
                  Component={StrukturOrganisasi}
                />
                <Route
                  path="/panduan-penelitian"
                  Component={PanduanPenelitian}
                />
                <Route
                  path="/dokumen-penelitian"
                  Component={DokumenPenelitian}
                />
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
                <Route
                  path="/informasi-penelitian"
                  Component={InformasiPenelitian}
                />
                <Route
                  path="/panduan-pengabdian-kepada-masyarakat"
                  Component={PanduanPengabdianKepadaMasyarakat}
                />
                <Route
                  path="/informasi-pengabdian-pada-masyarakat"
                  Component={InformasiPengabdianKepadaMasyarakat}
                />
                <Route
                  path="/sk-pengabdian-pada-masyarakat"
                  Component={SKPengabdianKepadaMasyarakat}
                />
                <Route
                  path="/dokumen-pengabdian-pada-masyarakat"
                  Component={DokumenPengabdianPadaMasyarakat}
                />
                <Route path="/informasi-kkn" Component={InformasiKKNUNIM} />
                <Route path="/syarat" Component={Syarat} />
                <Route path="/testi" Component={Testimonial} />
                <Route path="/faq" Component={Faq} />
              </Routes>
              <Footercomp />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
