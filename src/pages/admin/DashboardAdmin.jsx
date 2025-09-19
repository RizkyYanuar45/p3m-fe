import { useState } from "react";
import CrudPimpinanLembaga from "./CrudPimpinanLembaga";
import CrudPanduanPenelitian from "./CrudPanduanPenelitian";
import CrudDokumenP3M from "./CrudDokumenP3M";
import CrudLuaranP3M from "./CrudLuaranP3M";

import CrudSKKKNPMM from "./CrudSKKKNPMM";
import CrudProgramPanduanPengabdianMasyarakat from "./CrudProgramPanduanPengabdianMasyarakat";
import CrudSKRektor from "./CrudSKRektor";
import CrudPanduanPengabdianMasyarakat from "./CrudPanduanPengabdianMasyarakat";
import CrudDokumenPenelitian from "./CrudDokumenPenelitian";
import CrudProgramPengabdianMasyarakat from "./CrudProgramPengabdianMasyarakat";
// Placeholder imports for new submenus (replace with actual components if available)
import CrudInformasiPengabdian from "./CrudInformasiPengabdian";
import CrudSKPengabdian from "./CrudSKPengabdian";
import CrudDokumenPengabdian from "./CrudDokumenPengabdian";

import CrudInformasiPenelitian from "./CrudInformasiPenelitian";
import CrudProgramPanduanPengabdianMasyarakatMandiri from "./CrudProgramPanduanPengabdianMasyarakatMandiri";
import CrudStrukturOrganisasi from "./CrudStrukturOrganisasi";

import CrudInformasiKKN from "./CrudInformasiKKN";

import CrudJurnalLayananMasyarakat from "./CrudJurnalLayananMasyarakat";
import CrudKuisioner from "./CrudKuisioner";
import CrudProgramKKNUnim from "./CrudProgramKKNUnim";
import CrudBukuPanduanKKNPMM from "./CrudBukuPanduanKKNPMM";
import CrudBukuPanduanKKNTematik from "./CrudBukuPanduanKKNTematik";
import CrudSKKKNTematik from "./CrudSKKKNTematik";

// Struktur menuList yang benar
const menuList = [
  {
    key: "profil",
    label: "Profil",
    submenus: [
      {
        key: "strukturOrganisasi",
        label: "Struktur Organisasi",
        component: <CrudStrukturOrganisasi />,
      },
      {
        key: "dokumenP3M",
        label: "Dokumen P3M",
        component: <CrudDokumenP3M />,
      },
      {
        key: "luaranP3M",
        label: "Luaran P3M",
        component: <CrudLuaranP3M />,
      },
    ],
  },
  {
    key: "panduan",
    label: "Penelitian",
    submenus: [
      {
        key: "panduanPenelitian",
        label: "Panduan Penelitian",
        component: <CrudPanduanPenelitian />,
      },
      {
        key: "informasiPenelitian",
        label: "Informasi Penelitian",
        component: <CrudInformasiPenelitian />,
      },
      {
        key: "dokumenPenelitian",
        label: "Dokumen Penelitian",
        component: <CrudDokumenPenelitian />,
      },
      { key: "skRektor", label: "SK Rektor", component: <CrudSKRektor /> },
    ],
  },
  {
    key: "program",
    label: "Pengabdian Kepada Masyarakat",
    submenus: [
      {
        key: "programPanduanPengabdianMandiri",
        label: "Program Pengabdian Masyarakat Mandiri",
        component: <CrudProgramPanduanPengabdianMasyarakatMandiri />,
      },
      {
        key: "informasiPengabdian",
        label: "Informasi Pengabdian Kepada Masyarakat",
        component: <CrudInformasiPengabdian />,
      },
      {
        key: "skPengabdian",
        label: "SK Pengabdian Kepada Masyarakat",
        component: <CrudSKPengabdian />,
      },
      {
        key: "dokumenPengabdian",
        label: "Dokumen Pengabdian Kepada Masyarakat",
        component: <CrudDokumenPengabdian />,
      },
      {
        key: "panduanPengabdianMasyarakat",
        label: "Panduan Pengabdian Masyarakat",
        component: <CrudPanduanPengabdianMasyarakat />,
      },
    ],
  },

  {
    key: "kkn",
    label: "Kelola Kuliah Kerja Nyata",
    submenus: [
      {
        key: "informasiKKN",
        label: "Informasi KKN UNIM",
        component: <CrudInformasiKKN />,
      },
      {
        key: "bukupanduankkntematik",
        label: "Buku Panduan KKN Tematik",
        component: <CrudBukuPanduanKKNTematik />,
      },
      {
        key: "skKKNTematik",
        label: "SK KKN Tematik UNIM",
        component: <CrudSKKKNTematik />,
      },
      {
        key: "bukupanduankknpmm",
        label: "Buku Panduan KKN PMM",
        component: <CrudBukuPanduanKKNPMM />,
      },
      {
        key: "skKKNPMM",
        label: "SK KKN PMM UNIM",
        component: <CrudSKKKNPMM />,
      },
    ],
  },
];

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(menuList[0].key);
  const [activeSubmenu, setActiveSubmenu] = useState(
    menuList[0].submenus[0].key
  );
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "/admin/login";
  };

  const currentMenu = menuList.find((m) => m.key === activeMenu);
  const currentSubmenu = currentMenu?.submenus.find(
    (s) => s.key === activeSubmenu
  );

  return (
    <>
      <style>{`
        .dashboard-admin { min-width: 320px; min-height: 100vh; overflow-x: auto; }
        .dashboard-sidebar { min-width: 220px; max-width: 100vw; overflow-y: auto; }
        .dashboard-content { min-width: 320px; }
        @media (max-width: 900px) {
          .dashboard-admin { flex-direction: column !important; }
          .dashboard-sidebar { width: 100vw !important; min-height: unset !important; position: relative !important; box-shadow: none !important; border-bottom: 2px solid #ffb300 !important; }
          .dashboard-content { padding: 16px !important; }
        }
        @media (max-width: 600px) {
          .dashboard-admin { flex-direction: column !important; }
          .dashboard-sidebar { width: 100vw !important; min-height: unset !important; position: fixed !important; left: 0; top: 0; z-index: 1000; height: 100vh !important; transform: translateX(-100vw); transition: transform 0.3s; overflow-y: auto; }
          .dashboard-sidebar.open { transform: translateX(0); }
          .dashboard-content { padding: 8px !important; }
          .dashboard-topbar { font-size: 16px !important; padding: 12px 8px 8px 8px !important; }
          .dashboard-hamburger { display: block !important; position: fixed; right: 16px; top: 16px; z-index: 1100; background: #ffb300; border: none; border-radius: 4px; width: 40px; height: 40px; justify-content: center; align-items: center; }
        }
        .dashboard-hamburger { display: none; }
      `}</style>
      <div
        className="dashboard-admin"
        style={{
          minHeight: "100vh",
          background: "#e9ecef",
          display: "flex",
          fontFamily: "Segoe UI, Arial, sans-serif",
          overflowX: "auto",
        }}
      >
        {/* Hamburger menu for mobile */}
        <button
          className="dashboard-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            right: 16,
            left: "unset",
            top: 16,
            position: "fixed",
            zIndex: 1100,
            background: "#ffb300",
            border: "none",
            borderRadius: 4,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            display: window.innerWidth <= 600 ? "flex" : "none",
          }}
        >
          <span style={{ fontSize: 28, color: "#222d32" }}>&#9776;</span>
        </button>
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              background: "#0008",
              zIndex: 999,
            }}
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        {/* Sidebar */}
        <div
          className={`dashboard-sidebar${sidebarOpen ? " open" : ""}`}
          style={{
            width: 260,
            background: "#222d32",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            boxShadow: "2px 0 8px #0001",
            overflowY: "auto",
            maxWidth: "100vw",
          }}
        >
          {/* Close button for mobile sidebar */}
          <button
            style={{
              display: "none",
              position: "absolute",
              right: 16,
              top: 16,
              background: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 24,
              zIndex: 1101,
            }}
            className="dashboard-close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>
          <div
            style={{
              padding: "32px 0 24px 0",
              textAlign: "center",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: 2,
              background: "#1a2226",
              borderBottom: "2px solid #ffb300",
              color: "#ffb300",
            }}
          >
            Admin P3M UNIM
          </div>
          <div style={{ flex: 1, marginTop: 16 }}>
            {menuList.map((menu) => {
              // Tambahkan 'kuisioner' sebagai dropdown
              const isDropdown =
                menu.key === "profil" ||
                menu.key === "panduan" ||
                menu.key === "program" ||
                menu.key === "kkn" ||
                menu.key === "kuisioner";
              return (
                <div key={menu.key}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "14px 32px",
                      background:
                        activeMenu === menu.key ? "#ffb300" : "transparent",
                      color: activeMenu === menu.key ? "#222d32" : "#b8c7ce",
                      fontWeight: 700,
                      fontSize: 17,
                      cursor: "pointer",
                      borderLeft:
                        activeMenu === menu.key
                          ? "4px solid #1976d2"
                          : "4px solid transparent",
                      borderBottom: "1px solid #232a2f",
                      transition: "background 0.2s",
                    }}
                  >
                    <span
                      onClick={() => {
                        setActiveMenu(menu.key);
                        setActiveSubmenu(menu.submenus[0].key);
                        if (isDropdown)
                          setOpenDropdown(
                            openDropdown === menu.key ? null : menu.key
                          );
                        // Tutup sidebar jika di mobile untuk menu tanpa dropdown
                        if (
                          (menu.key === "pimpinanLembaga" ||
                            menu.key === "jurnalLayananMasyarakat") &&
                          window.innerWidth <= 600
                        )
                          setSidebarOpen(false);
                      }}
                      style={{ flex: 1 }}
                    >
                      {menu.label}
                    </span>
                    {isDropdown && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(
                            openDropdown === menu.key ? null : menu.key
                          );
                          setActiveMenu(menu.key);
                          setActiveSubmenu(menu.submenus[0].key);
                        }}
                        style={{
                          marginLeft: 8,
                          background: "none",
                          border: "none",
                          color:
                            activeMenu === menu.key ? "#222d32" : "#b8c7ce",
                          fontSize: 18,
                          cursor: "pointer",
                          outline: "none",
                          padding: 0,
                          userSelect: "none",
                          transition: "color 0.2s",
                        }}
                        aria-label={
                          openDropdown === menu.key
                            ? "Tutup submenu"
                            : "Buka submenu"
                        }
                      >
                        {openDropdown === menu.key ? "▲" : "▼"}
                      </button>
                    )}
                  </div>
                  {/* Submenu tampil hanya jika dropdown terbuka (untuk panduan/program/kuisioner/kkn), atau menu aktif dan bukan dropdown */}
                  {menu.submenus.length > 1 &&
                    ((isDropdown && openDropdown === menu.key) ||
                      (!isDropdown && activeMenu === menu.key)) && (
                      <div style={{ background: "#263238", paddingLeft: 0 }}>
                        {menu.submenus.map((submenu) => (
                          <div
                            key={submenu.key}
                            onClick={() => {
                              setActiveSubmenu(submenu.key);
                              // Tutup sidebar jika di mobile
                              if (window.innerWidth <= 600)
                                setSidebarOpen(false);
                            }}
                            style={{
                              padding: "10px 48px",
                              background:
                                activeSubmenu === submenu.key
                                  ? "#1976d2"
                                  : "transparent",
                              color:
                                activeSubmenu === submenu.key
                                  ? "#fff"
                                  : "#b8c7ce",
                              cursor: "pointer",
                              fontWeight: 500,
                              fontSize: 15,
                              borderLeft:
                                activeSubmenu === submenu.key
                                  ? "3px solid #ffb300"
                                  : "3px solid transparent",
                            }}
                          >
                            {submenu.label}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
          <div
            style={{
              padding: 24,
              borderTop: "1px solid #333",
              textAlign: "center",
              background: "#1a2226",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                background: "#e53935",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 20px",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px #0002",
                transition: "background 0.2s",
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div
          style={{
            flex: 1,
            minHeight: "100vh",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            minWidth: "320px",
          }}
        >
          {/* Topbar/Header */}
          <div
            className="dashboard-topbar"
            style={{
              background: "#fff",
              borderBottom: "2px solid #e9ecef",
              padding: "24px 32px 16px 32px",
              fontSize: 22,
              fontWeight: 700,
              color: "#1976d2",
              letterSpacing: 2,
            }}
          >
            {currentMenu?.label}{" "}
            {currentSubmenu && currentMenu.submenus.length > 1
              ? " - " + currentSubmenu.label
              : ""}
          </div>
          {/* Content */}
          <div style={{ flex: 1, padding: 32, minHeight: 400 }}>
            {currentSubmenu?.component}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
