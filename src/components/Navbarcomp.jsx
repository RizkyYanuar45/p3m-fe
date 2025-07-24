import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Accordion,
} from "react-bootstrap";
import { navLinks } from "./../data/index";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";

function Navbarcomp() {
  const [changeColor, setChangeColor] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const changeBGColor = () => {
    if (window.scrollY > 50) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBGColor();
    window.addEventListener("scroll", changeBGColor);
    return () => {
      window.removeEventListener("scroll", changeBGColor);
    };
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        className={`flex-lg-column align-items-center z-3 ${
          changeColor ? "color-active" : ""
        }`}
        sticky="top"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {/* Tata Letak & Branding tidak diubah */}
        <div className="d-none d-lg-block text-center">
          <Navbar.Brand className="navbar-logo my-2 d-inline-block">
            <NavLink
              to="/"
              className="text-decoration-none fs-3 fw-bold text-dark d-flex align-items-center justify-content-center"
            >
              <img
                src={logo}
                alt="Logo Unim"
                className="me-2"
                style={{ width: "120px" }}
              />
              <div className=" d-flex flex-column align-items-center justify-content-center">
                <h1 className="fw-bold">P3M Universitas Islam Majapahit</h1>
                <p className="fw-light">
                  Pusat Penelitian dan Pengabdian kepada Masyarakat
                </p>
              </div>
            </NavLink>
          </Navbar.Brand>
        </div>
        <div className="d-lg-none d-flex justify-content-between align-items-center w-100 px-3">
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="d-flex align-items-center"
          >
            <img
              src={logo}
              alt="Logo Unim"
              className="me-2"
              style={{ width: "70px" }}
            />
            <h1 className="fw-bold mb-0 fs-6">P3M UNIM</h1>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvas-navbar-nav"
            onClick={handleShowMenu}
          />
        </div>

        {/* --- OFFCANVAS --- */}
        <Navbar.Offcanvas
          id="offcanvas-navbar-nav"
          aria-labelledby="offcanvas-navbar-label"
          placement="end"
          responsive="lg"
          show={showMenu}
          onHide={handleCloseMenu}
        >
          <Offcanvas.Header closeButton className="d-lg-none">
            <Offcanvas.Title id="offcanvas-navbar-label">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* BLOK MENU KHUSUS MOBILE */}
            <div className="d-lg-none">
              <Nav className="justify-content-start flex-grow-1">
                {/* Kita tidak lagi membungkus semuanya dengan Accordion.
                  Accordion hanya digunakan untuk item yang punya submenu.
                */}
                {navLinks.map((data) => {
                  if (data.subMenu) {
                    return (
                      <Accordion flush key={data.id}>
                        <Accordion.Item eventKey={data.id}>
                          <Accordion.Header>{data.text}</Accordion.Header>
                          <Accordion.Body className="ps-2">
                            {data.subMenu.map((subItem) => (
                              <NavLink
                                key={subItem.id}
                                to={subItem.path}
                                onClick={handleCloseMenu}
                                className={({ isActive }) =>
                                  "d-block py-2 ps-4 text-decoration-none " +
                                  (isActive
                                    ? "text-primary fw-bold"
                                    : "text-secondary")
                                }
                              >
                                {subItem.text}
                              </NavLink>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    );
                  }
                  return (
                    // --- PERUBAHAN UTAMA DI SINI ---
                    // Item menu biasa tanpa panah
                    <NavLink
                      key={data.id}
                      to={data.path}
                      onClick={handleCloseMenu}
                      className={({ isActive }) =>
                        // Kelas padding py-3 dan px-4 ini menyamakan tingginya dengan Accordion.Header
                        "d-block py-3 px-4 text-decoration-none " +
                        (isActive ? "text-primary fw-bold" : "text-dark")
                      }
                    >
                      {data.text}
                    </NavLink>
                  );
                })}
              </Nav>
            </div>

            {/* BLOK MENU KHUSUS DESKTOP (TIDAK BERUBAH) */}
            <div className="d-none d-lg-block">
              <Nav className="mx-auto text-center">
                {navLinks.map((data) => {
                  if (data.subMenu) {
                    return (
                      <NavDropdown
                        title={data.text}
                        id={data.text.toLowerCase().replace(" ", "-")}
                        key={data.id}
                      >
                        {data.subMenu.map((subItem) => (
                          <NavDropdown.Item
                            key={subItem.id}
                            as={NavLink}
                            to={subItem.path}
                          >
                            {subItem.text}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    );
                  }
                  return (
                    <div key={data.id} className="nav-link">
                      <NavLink
                        to={data.path}
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                        end
                      >
                        {data.text}
                      </NavLink>
                    </div>
                  );
                })}
              </Nav>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  );
}

export default Navbarcomp;
