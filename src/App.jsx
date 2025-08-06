import { Routes, Route, Outlet } from "react-router-dom";
// Import komponen React-Bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Homepage from "./pages/Homepage";
import Tentang from "./pages/Tentang";
import PimpinanLembaga from "./pages/PimpinanLembaga";
import PanduanPenelitian from "./pages/PanduanPenelitian";
import PanduanPengabdianKepadaMasyarakat from "./pages/PanduanPengabdianKepadaMasyarakat";
import ProgramPanduanPengabdianMasyarakatMandiri from "./pages/ProgramPanduanPengabdianMasyarakatMandiri";
import InformasiPengabdianKepadaMasyarakat from "./pages/InformasiPengabdianKepadaMasyarakat";
import SKPengabdianKepadaMasyarakat from "./pages/SKPengabdianKepadaMasyarakat";
import BukuPanduanKKNTematik from "./pages/BukuPanduanKKNTematik";
import AllInformasiKKNUNIM from "./pages/AllInformasiKKNUNIM";
import AllInformasiPengabdianKepadaMasyarakat from "./pages/AllInformasiPengabdianKepadaMasyarakat";
import AllInformasiPenelitian from "./pages/AllInformasiPenelitian";

import BukuPanduanKKNPMM from "./pages/BukuPanduanKKNPMM";
import SKKKNTematikUNIM from "./pages/SKKKNTematikUNIM";
import SKKKNPMMUNIM from "./pages/SKKKNPMMUNIM";
import ProgramKKNUNIM from "./pages/ProgramKKNUNIM";
import DokumenPengabdianPadaMasyarakat from "./pages/DokumenPengabdianPadaMasyarakat";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import DokumenPenelitian from "./pages/DokumenPenelitian";
import InformasiPenelitian from "./pages/InformasiPenelitian";
import InformasiKKNUNIM from "./pages/InformasiKKNUNIM";
import SKRektor from "./pages/SKRektor";

import Faq from "./pages/Faq";
import Footercomp from "./components/Footercomp";
import Navbarcomp from "./components/Navbarcomp";
import ProgramPengabdianMasyarakat from "./pages/ProgramPengabdianMasyarakat";
import Login from "./pages/admin/login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import RequireAuth from "./pages/admin/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlePage from "./pages/ArticlePage";
import SearchPage from "./pages/SearchPage";

// Komponen Layout untuk halaman publik yang memiliki Navbar dan Footer
const PublicLayout = () => {
  return (
    <div>
      <Navbarcomp />
      <main className="main-content">
        {/* Komponen anak (halaman) akan dirender di sini */}
        <Outlet />
      </main>
      <Footercomp />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <DashboardAdmin />
          </RequireAuth>
        }
      />

      {/* Grup Rute Publik (semua yang ada di sini akan memiliki Navbar & Footer) */}
      <Route element={<PublicLayout />}>
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

        <Route path="/informasi-penelitian" Component={InformasiPenelitian} />
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
        {/* Sub-menu KKN */}
        <Route path="/informasi-kkn" Component={InformasiKKNUNIM} />
        <Route path="/program-kkn-unim" Component={ProgramKKNUNIM} />
        <Route
          path="/buku-panduan-kkn-tematik"
          Component={BukuPanduanKKNTematik}
        />
        <Route path="/sk-kkn-tematik-unim" Component={SKKKNTematikUNIM} />
        <Route path="/buku-panduan-kkn-pmm" Component={BukuPanduanKKNPMM} />
        <Route path="/sk-kkn-pmm-unim" Component={SKKKNPMMUNIM} />
        {/* akhir sub menu kkn */}
        <Route path="/article/:slug" Component={ArticlePage} />
        <Route path="/search-page" Component={SearchPage} />

        <Route path="/faq" Component={Faq} />

        <Route path="/all-informasi-kkn-unim" Component={AllInformasiKKNUNIM} />
        <Route
          path="/all-informasi-pengabdian-kepada-masyarakat"
          Component={AllInformasiPengabdianKepadaMasyarakat}
        />
        <Route
          path="/all-informasi-penelitian"
          Component={AllInformasiPenelitian}
        />
      </Route>

      {/* Rute Catch-all untuk halaman 404 Not Found. Diletakkan di paling akhir. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
