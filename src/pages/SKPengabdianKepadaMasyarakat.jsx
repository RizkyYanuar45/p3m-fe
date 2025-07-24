import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";
import { skRektor } from "./../data/skRektor";

const SKPengabdianKepadaMasyarakat = () => {
  return (
    <div className="panduan-page">
      <Herosection title={"SK Pengabdian Kepada Masyarakat<"} />

      <div className="timeline-wrapper py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="fw-bold">SK Pengabdian Kepada Masyarakat</h1>
              <p className="text-muted">
                Kumpulan dokumen SK Pengabdian Kepada Masyarakat
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="timeline-bs">
                {skRektor.map((item) => (
                  <div key={item.id} className="timeline-item">
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

export default SKPengabdianKepadaMasyarakat;
