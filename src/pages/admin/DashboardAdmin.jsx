import { useState } from 'react';
import CrudPimpinanLembaga from './CrudPimpinanLembaga';
import CrudPanduanPenelitian from './CrudPanduanPenelitian';
import CrudProgramPanduanPengabdianMasyarakat from './CrudProgramPanduanPengabdianMasyarakat';
import CrudSKRektor from './CrudSKRektor';
import CrudDokumenPenelitian from './CrudDokumenPenelitian';
import CrudProgramPengabdianMasyarakat from './CrudProgramPengabdianMasyarakat';
// Placeholder imports for new submenus (replace with actual components if available)
import CrudInformasiPengabdian from './CrudInformasiPengabdian';
import CrudSKPengabdian from './CrudSKPengabdian';
import CrudDokumenPengabdian from './CrudDokumenPengabdian';


import CrudInformasiPenelitian from './CrudInformasiPenelitian';
import CrudProgramPanduanPengabdianMasyarakatMandiri from './CrudProgramPanduanPengabdianMasyarakatMandiri';

import CrudKelolaKKN from './CrudKelolaKKN';
import CrudInformasiKKN from './CrudInformasiKKN';

import CrudJurnalLayananMasyarakat from './CrudJurnalLayananMasyarakat';
import CrudKuisioner from './CrudKuisioner';



// Struktur menuList yang benar
const menuList = [
  {
    key: 'pimpinanLembaga',
    label: 'Profil Pimpinan',
    submenus: [
      { key: 'pimpinanLembaga', label: 'Kelola Pimpinan', component: <CrudPimpinanLembaga /> },
    ],
  },
  {
    key: 'panduan',
    label: 'Penelitian',
    submenus: [
      { key: 'panduanPenelitian', label: 'Panduan Penelitian', component: <CrudPanduanPenelitian /> },
      { key: 'informasiPenelitian', label: 'Informasi Penelitian', component: <CrudInformasiPenelitian /> },
      { key: 'dokumenPenelitian', label: 'Dokumen Penelitian', component: <CrudDokumenPenelitian /> },
      { key: 'skRektor', label: 'SK Rektor', component: <CrudSKRektor /> },
    ],
  },
  {
    key: 'program',
    label: 'Pengabdian Kepada Masyarakat',
    submenus: [
      { key: 'programPengabdian', label: 'Program Pengabdian Masyarakat', component: <CrudProgramPengabdianMasyarakat /> },
      { key: 'programPanduanPengabdian', label: 'Panduan Pengabdian Masyarakat', component: <CrudProgramPanduanPengabdianMasyarakat /> },
      { key: 'programPanduanPengabdianMandiri', label: 'Program Pengabdian Masyarakat Mandiri', component: <CrudProgramPanduanPengabdianMasyarakatMandiri /> },
      { key: 'informasiPengabdian', label: 'Informasi Pengabdian Kepada Masyarakat', component: <CrudInformasiPengabdian /> },
      { key: 'skPengabdian', label: 'SK Pengabdian Kepada Masyarakat', component: <CrudSKPengabdian /> },
      { key: 'dokumenPengabdian', label: 'Dokumen Pengabdian Kepada Masyarakat', component: <CrudDokumenPengabdian /> },
    ],
  },
  {
    key: 'kuisioner',
    label: 'Kelola Kuisioner / Komplain',
    submenus: [
      { key: 'kuisionerPenelitian', label: 'Penelitian', component: <CrudKuisioner kategori="penelitian" /> },
      { key: 'kuisionerPengabdian', label: 'Pengabdian Kepada Masyarakat', component: <CrudKuisioner kategori="pengabdian" /> },
      { key: 'kuisionerKKN', label: 'KKN', component: <CrudKuisioner kategori="kkn" /> },
    ],
  },
  {
    key: 'jurnalLayananMasyarakat',
    label: 'Kelola Jurnal Layanan Masyarakat',
    submenus: [
      { key: 'jurnalLayananMasyarakat', label: 'Link Jurnal Layanan Masyarakat', component: <CrudJurnalLayananMasyarakat /> },
    ],
  },
  {
    key: 'kkn',
    label: 'Kelola Kuliah Kerja Nyata',
    submenus: [
      { key: 'informasiKKN', label: 'Informasi KKN UNIM', component: <CrudInformasiKKN /> },
      { key: 'programKKN', label: 'Program KKN UNIM', component: <CrudKelolaKKN kategori="program" /> },
      { key: 'bukuPanduanKKN', label: 'Buku Panduan KKN BBM', component: <CrudKelolaKKN kategori="bukuPanduan" /> },
      { key: 'skKKN', label: 'SK KKN BBM UNIM', component: <CrudKelolaKKN kategori="sk" /> },
    ],
  },

];

const DashboardAdmin = () => {
  const [activeMenu, setActiveMenu] = useState(menuList[0].key);
  const [activeSubmenu, setActiveSubmenu] = useState(menuList[0].submenus[0].key);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '/admin/login';
  };

  const currentMenu = menuList.find((m) => m.key === activeMenu);
  const currentSubmenu = currentMenu?.submenus.find((s) => s.key === activeSubmenu);

  return (
    <div style={{ minHeight: '100vh', background: '#e9ecef', display: 'flex', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: '#222d32', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh', boxShadow: '2px 0 8px #0001' }}>
        <div style={{ padding: '32px 0 24px 0', textAlign: 'center', fontWeight: 700, fontSize: 24, letterSpacing: 2, background: '#1a2226', borderBottom: '2px solid #ffb300', color: '#ffb300' }}>
          Admin P3M UNIM
        </div>
        <div style={{ flex: 1, marginTop: 16 }}>
          {menuList.map((menu) => {
            // Tambahkan 'kuisioner' sebagai dropdown
            const isDropdown = menu.key === 'panduan' || menu.key === 'program' || menu.key === 'kkn' || menu.key === 'kuisioner';
            return (
              <div key={menu.key}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 32px',
                    background: activeMenu === menu.key ? '#ffb300' : 'transparent',
                    color: activeMenu === menu.key ? '#222d32' : '#b8c7ce',
                    fontWeight: 700,
                    fontSize: 17,
                    cursor: 'pointer',
                    borderLeft: activeMenu === menu.key ? '4px solid #1976d2' : '4px solid transparent',
                    borderBottom: '1px solid #232a2f',
                    transition: 'background 0.2s',
                  }}
                >
                  <span
                    onClick={() => {
                      setActiveMenu(menu.key);
                      setActiveSubmenu(menu.submenus[0].key);
                      if (isDropdown) setOpenDropdown(openDropdown === menu.key ? null : menu.key);
                    }}
                    style={{ flex: 1 }}
                  >
                    {menu.label}
                  </span>
                  {isDropdown && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === menu.key ? null : menu.key);
                        setActiveMenu(menu.key);
                        setActiveSubmenu(menu.submenus[0].key);
                      }}
                      style={{
                        marginLeft: 8,
                        background: 'none',
                        border: 'none',
                        color: activeMenu === menu.key ? '#222d32' : '#b8c7ce',
                        fontSize: 18,
                        cursor: 'pointer',
                        outline: 'none',
                        padding: 0,
                        userSelect: 'none',
                        transition: 'color 0.2s',
                      }}
                      aria-label={openDropdown === menu.key ? 'Tutup submenu' : 'Buka submenu'}
                    >
                      {openDropdown === menu.key ? '▲' : '▼'}
                    </button>
                  )}
                </div>
                {/* Submenu tampil hanya jika dropdown terbuka (untuk panduan/program/kuisioner/kkn), atau menu aktif dan bukan dropdown */}
                {menu.submenus.length > 1 && ((isDropdown && openDropdown === menu.key) || (!isDropdown && activeMenu === menu.key)) && (
                  <div style={{ background: '#263238', paddingLeft: 0 }}>
                    {menu.submenus.map((submenu) => (
                      <div
                        key={submenu.key}
                        onClick={() => setActiveSubmenu(submenu.key)}
                        style={{
                          padding: '10px 48px',
                          background: activeSubmenu === submenu.key ? '#1976d2' : 'transparent',
                          color: activeSubmenu === submenu.key ? '#fff' : '#b8c7ce',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: 15,
                          borderLeft: activeSubmenu === submenu.key ? '3px solid #ffb300' : '3px solid transparent',
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
        <div style={{ padding: 24, borderTop: '1px solid #333', textAlign: 'center', background: '#1a2226' }}>
          <button
            onClick={handleLogout}
            style={{
              background: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 20px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #0002',
              transition: 'background 0.2s',
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar/Header */}
        <div style={{ background: '#fff', borderBottom: '2px solid #e9ecef', padding: '24px 32px 16px 32px', fontSize: 22, fontWeight: 700, color: '#1976d2', letterSpacing: 2 }}>
          {currentMenu?.label} {currentSubmenu && currentMenu.submenus.length > 1 ? ' - ' + currentSubmenu.label : ''}
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: 32, minHeight: 400 }}>
          {currentSubmenu?.component}
        </div>
      </div>
    </div>
  );
};


export default DashboardAdmin;


