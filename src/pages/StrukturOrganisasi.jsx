import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Herosection from "../components/Herosection";

// Impor gambar struktur organisasi Anda di sini
import BaganStruktur from "../assets/img/foto/gedungAlhambra.jpg";

const StrukturOrganisasi = () => {
  return (
    <div className="struktur-organisasi-page">
      <Herosection title={"Struktur Organisasi P3M UNIM"} />

      <div className="bagan-wrapper py-5">
        <Container>
          <Row>
            <Col className="text-center">
              <h1 className="fw-bold mb-5 animate__animated animate__fadeInUp">
                Bagan Struktur Organisasi
              </h1>
              {/* Gambar bagan struktur organisasi */}
              <img
                src={BaganStruktur} // Gunakan gambar yang diimpor
                alt="Bagan Struktur Organisasi P3M UNIM"
                className="img-fluid shadow-lg rounded"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
