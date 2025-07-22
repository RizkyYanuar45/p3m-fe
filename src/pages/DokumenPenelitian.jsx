import React from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Button,
  ListGroup,
} from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";

// Impor semua data dari file dokumenPenelitian.js
import {
  PendirianP3MData,
  SOPP3MData,
  RencanaIndukPenelitianData,
  TemplateData,
  FormSPTJMData,
  DokumenPenelitianData,
  DokumenPenelitianLaporanKemajuanRisetData,
  DokumenPenelitianAkhirRisetKolaborasiData,
} from "../data/dokumenPenelitian";

// Helper function untuk merender daftar dokumen
const renderDocumentList = (data) => (
  <ListGroup variant="flush">
    {data.map((doc) => (
      <ListGroup.Item
        key={doc.id}
        className="d-flex justify-content-between align-items-center"
      >
        <span>{doc.title}</span>
        <Button
          variant="danger"
          size="sm"
          href={doc.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Dokumen
        </Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

const DokumenPenelitian = () => {
  return (
    <div className="dokumen-page">
      <Herosection title={"Pusat Dokumen P3M"} />

      <div className="dokumen-content py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h1 className="fw-bold">Dokumen Penelitian & Pengabdian</h1>
              <p className="text-muted">
                Temukan semua dokumen, template, dan form penting di sini.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* Tambahkan properti 'alwaysOpen' di sini */}
              <Accordion alwaysOpen flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>SK Pendirian P3M</Accordion.Header>
                  <Accordion.Body>
                    {renderDocumentList(PendirianP3MData)}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>SOP P3M</Accordion.Header>
                  <Accordion.Body>
                    {renderDocumentList(SOPP3MData)}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Rencana Induk Penelitian</Accordion.Header>
                  <Accordion.Body>
                    {renderDocumentList(RencanaIndukPenelitianData)}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Template</Accordion.Header>
                  <Accordion.Body>
                    {renderDocumentList(TemplateData)}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    Form SPTJM & Pernyataan Luaran
                  </Accordion.Header>
                  <Accordion.Body>
                    {renderDocumentList(FormSPTJMData)}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>Dokumen Penelitian</Accordion.Header>
                  <Accordion.Body>
                    {renderDocumentList(DokumenPenelitianData)}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                  <Accordion.Header>Laporan Kemajuan Riset</Accordion.Header>
                  <Accordion.Body>
                    {renderDocumentList(
                      DokumenPenelitianLaporanKemajuanRisetData
                    )}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="7">
                  <Accordion.Header>Akhir Riset Kolaborasi</Accordion.Header>
                  <Accordion.Body>
                    {renderDocumentList(
                      DokumenPenelitianAkhirRisetKolaborasiData
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </div>

      <Faqcomp />
    </div>
  );
};

export default DokumenPenelitian;
