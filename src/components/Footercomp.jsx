import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footercomp() {
  return (
    <div
      className="footer"
      style={{ background: "#f8f9fa", padding: "32px 0 0 0" }}
    >
      <Container>
        <Row className="gy-4 justify-content-between text-center text-lg-start">
          {/* Kolom 1: Info & Kontak */}
          <Col xs={12} sm={6} lg={4}>
            <h3 className="fw-bold">P3M UNIM</h3>
            <p className="desc">
              Pusat Penelitian, Publikasi dan Pengabdian kepada Masyarakat
            </p>
            <div className="nomer mb-1 mt-4 d-flex align-items-center justify-content-center justify-content-lg-start gap-2">
              <i className="fa-brands fa-whatsapp"></i>
              <a
                href="https://wa.me/628123456789"
                className="text-decoration-none text-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                08123456789
              </a>
            </div>
            <div className="email d-flex align-items-center justify-content-center justify-content-lg-start gap-2">
              <i className="fa-regular fa-envelope"></i>
              <a
                href="mailto:p3munim2025@gmail.com"
                className="text-decoration-none text-dark"
              >
                p3munim2025@gmail.com
              </a>
            </div>
          </Col>
          {/* Kolom 2: Menu */}
          <Col xs={12} sm={6} lg={4} className="mt-4 mt-lg-0">
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <h5 className="fw-bold mb-3">Menu</h5>
              <Link to="/" className="text-decoration-none text-footer mb-2">
                Home
              </Link>
              <a
                href="https://ejurnal.unim.ac.id/index.php"
                className="text-decoration-none text-footer mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                E-Jurnal
              </a>
              <Link
                to="/hubungi-kami"
                className="text-decoration-none text-footer mb-2"
              >
                Hubungi Kami
              </Link>
            </div>
          </Col>
          {/* Kolom 3: Sosmed, tampil di bawah pada mobile */}
          <Col
            xs={12}
            sm={12}
            lg={4}
            className="mt-4 mt-lg-0 d-flex flex-column align-items-center align-items-lg-start"
          >
            <h5 className="fw-bold mb-3">Sosmed</h5>
            <div className="social mt-2">
              <a
                href="https://www.youtube.com/@user-nl3vs6fw4o"
                className="text-decoration-none text-black fs-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col>
            <p
              className="text-center px-md-0 px-3 mb-0"
              style={{ fontSize: 15 }}
            >
              &copy; {new Date().getFullYear()}{" "}
              <span className="fw-bold">Universitas Islam Majapahit</span>, All
              rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footercomp;
