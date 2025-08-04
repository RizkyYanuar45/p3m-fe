import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function Footercomp() {
  return (
    <div className="footer">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="4">
            <h3 className="fw-bold">P3M UNIM</h3>
            <p className="desc">
              Pusat Penelitian, Publikasi dan Pengabdian kepada Masyarakat
            </p>
            <div className="nomer mb-1 mt-4">
              <Link className="text-decoration-none">
                <i className="fa-brands fa-whatsapp"></i>
                <p className="m-0">08123456789</p>
              </Link>
            </div>
            <div className="email">
              <Link className="text-decoration none">
                <i className="fa-regular fa-envelope"></i>
                <p className="m-0"> p3munim2025@gmail.com</p>
              </Link>
            </div>
          </Col>
          <Col
            lg="6"
            className="d-flex flex-column align-items-center col-lg-2 mt-lg-0 mt-5"
          >
            <div className=" d-flex flex-column align-items-start ">
              <h5 className="fw-bold">Menu</h5>
              <Link to="/" className="text-decoration-none text-footer">
                Home
              </Link>
              <NavLink
                to={"https://ejurnal.unim.ac.id/index.php"}
                className="text-decoration-none text-footer"
              >
                E-Jurnal
              </NavLink>
              <Link to="" className="text-decoration-none text-footer">
                Hubungi Kami
              </Link>
            </div>
          </Col>
          <Col lg="2">
            <h5 className="fw-bold mt-lg-0 mt-5">Sosmed</h5>

            <div className="social mt-3">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center px-md-0 px-3">
              &copy; Copyright {new Date().getFullYear()} By{" "}
              <span className="fw-bold">Universitas Islam Majapahit</span>,All
              right Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footercomp;
