import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footercomp() {
  return (
    <div className="footer">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5">
            <h3 className="fw-bold">Semangat</h3>
            <p className="desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste,
              obcaecati fugiat.
            </p>
            <div className="nomer mb-1 mt-4">
              <Link className="text-decoration-none">
                <i className="fa-brands fa-whatsapp"></i>
                <p className="m-0">08819658164</p>
              </Link>
            </div>
            <div className="email">
              <Link className="text-decoration none">
                <i className="fa-regular fa-envelope"></i>
                <p className="m-0">Rizkyanuar2@gmail.com</p>
              </Link>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 mt-lg-0 mt-5">
            <h5 className="fw-bold">Menu</h5>
            <Link to="">Home</Link>
            <Link to="kelas">Kelas</Link>
            <Link to="testi">Testimonial</Link>
            <Link to="faq">FAQ</Link>
            <Link to="syarat">Syarat & Ketentuan</Link>
          </Col>
          <Col lg="4">
            <h5 className="fw-bold mt-lg-0 mt-5">Subscribe Untuk Info</h5>
            <div className="subscribe">
              <input type="text" placeholder="Masukan email"></input>
              <button
                type="submit"
                className="btn btn-md btn-outline-danger rounded-0 rounded-end m-0"
              >
                Subscribe
              </button>
            </div>
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
              <span className="fw-bold">Yanuar</span>,All right Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footercomp;
