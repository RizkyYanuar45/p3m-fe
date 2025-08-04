import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Accordion,
  Form,
  Button,
} from "react-bootstrap";
import { navLinks } from "./../data/index";
import { NavLink, useNavigate } from "react-router-dom"; // Impor useNavigate
import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";

function Navbarcomp() {
  const [changeColor, setChangeColor] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk input pencarian
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  // Fungsi untuk menangani submit form pencarian
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search-page?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Kosongkan input setelah submit
      handleCloseMenu(); // Tutup offcanvas jika di mobile
    }
  };

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
        {/* === Branding Desktop === */}
        <div className="d-none d-lg-block text-center">
          <Navbar.Brand className="navbar-logo my-2 d-inline-block">
            <NavLink
              to="/"
              className="text-decoration-none text-dark d-flex align-items-center justify-content-center"
            >
              <img
                src={logo}
                alt="Logo Unim"
                className="me-3"
                style={{ width: "90px" }}
              />
              <div className="d-flex flex-column align-items-center text-center align-middle justify-content-center">
                <h1 className="fw-bold fs-4 mb-0">
                  P3M Universitas Islam Majapahit
                </h1>
                <p className="fw-light fs-6 text-start mb-0">
                  Pusat Penelitian, Publikasi dan Pengabdian kepada Masyarakat
                </p>
              </div>
            </NavLink>
          </Navbar.Brand>
        </div>

        {/* === Search Bar Desktop (Sudah Fungsional) === */}
        <div className="d-none d-lg-block w-75 px-4 mt-2 mb-3">
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Cari Artikel Atau Informasi"
              className="me-2 rounded-4 "
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Cari
            </Button>
          </Form>
        </div>

        {/* === Branding Mobile === */}
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
            <h1 className="fw-bold mb-0 fs-6">
              P3M <span className=" d-block">Universitas </span>
              <span className=" d-block">Islam Majapahit</span>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvas-navbar-nav"
            onClick={handleShowMenu}
          />
        </div>

        {/* === Offcanvas Menu Mobile === */}
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
              <div className="px-3 mb-3">
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Ketik pencarian..."
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    Cari
                  </Button>
                </Form>
              </div>
              <Nav className="justify-content-start flex-grow-1 z-3">
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
                    <NavLink
                      key={data.id}
                      to={data.path}
                      onClick={handleCloseMenu}
                      className={({ isActive }) =>
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

            {/* BLOK MENU KHUSUS DESKTOP */}
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
