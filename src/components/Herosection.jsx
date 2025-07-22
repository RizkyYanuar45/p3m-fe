import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Herosection({ title }) {
  return (
    <div className="tentang-hero d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col className="text-center text-white">
            <h1 className="fw-bold animate__animated animate__fadeInUp">
              {title}
            </h1>
            <p className="animate__animated animate__fadeInUp animate__delay-1s">
              Mengenal lebih dekat Pusat Penelitian dan Pengabdian kepada
              Masyarakat Universitas Islam Majapahit
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Herosection;
