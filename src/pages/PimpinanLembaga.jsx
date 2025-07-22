import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap"; // Impor komponen Card
import { pimpinanLembaga } from "../data/pimpinanLembaga"; // Impor data pimpinan
import Faqcomp from "../components/Faqcomp";
import Herosection from "../components/Herosection";

const PimpinanLembaga = () => {
  return (
    // Mengganti class agar lebih sesuai

    <div className="pimpinan-page">
      <Herosection title={"Pimpinan Lembaga P3M UNIM"} />
      <div className="pimpinan py-5">
        <Container>
          <Row className="mb-5">
            <Col>
              <h1 className="text-center fw-bold animate__animated animate__fadeInUp">
                Struktur Pimpinan Lembaga
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                Kenali lebih dekat tim pimpinan kami yang berdedikasi.
              </p>
            </Col>
          </Row>
          <Row xs={1} md={2} lg={3} className="g-4">
            {pimpinanLembaga.map((pimpinan) => {
              return (
                <Col key={pimpinan.id} className="mb-4">
                  <Card className="pimpinan-card h-100 shadow-sm text-center animate__animated animate__fadeInUp">
                    <div className="p-4">
                      <Card.Img
                        variant="top"
                        src={pimpinan.image}
                        className="pimpinan-img"
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold">
                        {pimpinan.name}
                      </Card.Title>
                      <Card.Text className="fw-semibold text-muted">
                        {pimpinan.position}
                      </Card.Text>
                      <a
                        href={`mailto:${pimpinan.email}`}
                        className="email-link"
                      >
                        {pimpinan.email}
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <Faqcomp />
    </div>
  );
};

export default PimpinanLembaga;
