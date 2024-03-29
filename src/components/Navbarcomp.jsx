import { Navbar, Container, Nav } from "react-bootstrap";
import { navLinks } from "./../data/index";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbarcomp() {
  let [changeColor, setChangeColor] = useState(false);
  let changeBGColor = () => {
    if (window.scrollY > 50) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };
  useEffect(() => {
    changeBGColor();
    window.addEventListener("scroll", changeBGColor);
  });

  return (
    <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
      <Container>
        <Navbar.Brand href="#home" className="fs-3 fw-bold">
          Semangat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center">
            {navLinks.map((data) => {
              return (
                <div key={data.id} className="me-3 nav-link">
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
          <div className="text-center">
            <button className="btn btn-outline-primary rounded-1">
              Register
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarcomp;
