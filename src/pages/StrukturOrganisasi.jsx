import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Herosection from "../components/Herosection";

const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const StrukturOrganisasi = () => {
  const [baganStruktur, setBaganStruktur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${api}/profile/type?type=struktur_organisasi`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data bagan struktur organisasi.");
        }
        const data = await response.json();
        setBaganStruktur(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Dependency array kosong agar hanya berjalan sekali saat komponen dimuat
  const renderContent = () => {
    if (loading) {
      return <p className="text-center">Memuat data...</p>;
    }
    if (error) {
      return <p className="text-center text-danger">{error}</p>;
    }
    if (baganStruktur.length === 0) {
      return (
        <p className="text-center">
          Tidak ada bagan struktur organisasi yang ditemukan.
        </p>
      );
    }
    // Tampilkan gambar bagan struktur organisasi
    return baganStruktur.map((bagan) => (
      <img
        key={bagan.id}
        src={`${backendUrl}${bagan.image.replace(/\\/g, "/")}`}
        alt={bagan.alt || "Bagan Struktur Organisasi"}
        className="img-fluid shadow-lg rounded mb-4"
      />
    ));
  };
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

              {renderContent()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
