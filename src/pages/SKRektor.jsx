import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";
import { skRektor } from "./../data/skRektor";

const SKRektor = () => {
  return (
    <div className="panduan-page">
      <Herosection title={"SK Rektor Penelitian Universitas Islam Majapahit"} />

      <div className="timeline-wrapper py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="fw-bold">
                SK Rektor Pelaksanaan Penelitian Universitas Islam Majapahit
              </h1>
              <p className="text-muted">
                Kumpulan dokumen SK Rektor Pelaksanaan Penelitian
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="timeline-bs">
                {skRektor
                  .slice()
                  .reverse()
                  .map((item) => (
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

export default SKRektor;
