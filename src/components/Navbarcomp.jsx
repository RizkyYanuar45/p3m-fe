// src/components/Navbarcomp.js

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"; // Import NavDropdown
import { navLinks } from "./../data/index";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
function Navbarcomp() {
  const [changeColor, setChangeColor] = useState(false);

  const changeBGColor = () => {
    if (window.scrollY > 50) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  // Improved useEffect for performance and to prevent memory leaks
  useEffect(() => {
    changeBGColor();
    window.addEventListener("scroll", changeBGColor);

    // Cleanup function: removes the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", changeBGColor);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <Navbar
      expand="lg"
      className={`d-flex ${changeColor ? "color-active" : ""} `}
      fixed="top" // Added for better user experience with the scroll effect
    >
      <Navbar.Brand className="">
          <NavLink
            to="/"
            className="text-decoration-none fs-3 fw-bold text-dark d-flex align-items-center"
          >
            <img
              src={logo}
              alt="Logo Unim"
              className="me-2"
              style={{ width: "40px" }}
            />
            P3M UNIM
          </NavLink>
        </Navbar.Brand>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center">
            {navLinks.map((data) => {
              // If the nav item has a subMenu, render a NavDropdown
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
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                        end
                      >
                        {subItem.text}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                );
              }

              // Otherwise, render a regular NavLink
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
          {/* <div className="text-center">
            <button className="btn btn-outline-primary rounded-1">
              Register
            </button>
          </div> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarcomp;
