import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";

// Impor data Anda yang sudah diralat
import { dokumenPanduanPengabdianMasyarakatMandiriData } from "../data/dokumenPanduanPengabdianMasyarakatMandiri";

const ProgramPanduanPengabdianMasyarakatMandiri = () => {
  return (
    <div className="panduan-page">
      <Herosection title={"Pengabdian Masyarakat Mandiri"} />

      <div className="timeline-wrapper py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="fw-bold">Dokumen & Panduan</h1>
              <p className="text-muted">
                Kumpulan dokumen penting terkait pelaksanaan Pengabdian
                Masyarakat Mandiri.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="timeline-bs">
                {dokumenPanduanPengabdianMasyarakatMandiriData.map((item) => (
                  <div key={item.id} className="timeline-item">
                    <div className="timeline-content shadow-sm">
                      {/* Menampilkan kembali 'date' dan 'description' */}
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

export default ProgramPanduanPengabdianMasyarakatMandiri;
