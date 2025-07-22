import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";
import { panduanPenelitian } from "../data/panduanPenelitian"; // Impor data panduan

const PanduanPenelitian = () => {
  return (
    <div className="panduan-page">
      <Herosection title={"Panduan & Dokumen P3M"} />

      <div className="timeline-wrapper py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="fw-bold">Panduan Penelitian & Pengabdian</h1>
              <p className="text-muted">
                Kumpulan dokumen penting terkait pelaksanaan penelitian dan
                pengabdian di lingkungan universitas.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="timeline-bs">
                {/* The .slice() method is used to create a shallow copy of the array before reversing it to avoid mutating the original data. Then, .reverse() is called to invert the order of the items. The key prop is now the last attribute of the timeline-item div. */}
                {panduanPenelitian
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div className="timeline-item" key={item.id}>
                      <div className="timeline-content shadow-sm">
                        <time>{item.date}</time>
                        <h3 className="fw-bold">{item.title}</h3>
                        <p>{item.description}</p>
                        <Button
                          variant="danger"
                          size="sm"
                          href={item.urlDrive}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Lihat Dokumen
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Faqcomp />
    </div>
  );
};

export default PanduanPenelitian;
