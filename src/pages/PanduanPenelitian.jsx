import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";

const api = import.meta.env.VITE_API_URL;

const PanduanPenelitian = () => {
  const [panduanData, setPanduanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${api}/files/type?type=panduan_penelitian`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }
        const data = await response.json();
        setPanduanData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Dependency array kosong agar hanya berjalan sekali

  const renderTimeline = () => {
    if (loading) {
      return <p className="text-center">Memuat data...</p>;
    }
    if (error) {
      return <p className="text-center text-danger">{error}</p>;
    }
    if (panduanData.length === 0) {
      return <p className="text-center">Tidak ada panduan yang ditemukan.</p>;
    }

    return panduanData
      .slice()
      .reverse()
      .map((item) => (
        <div className="timeline-item" key={item.id}>
          <div className="timeline-content shadow-sm">
            <time>
              {new Date(item.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h3 className="fw-bold">{item.file_name}</h3>
            <p>{item.file_description}</p>
            <Button
              variant="danger"
              size="sm"
              href={item.file_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#e85a0e", borderColor: "#e85a0e" }}
            >
              Lihat Dokumen
            </Button>
          </div>
        </div>
      ));
  };

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
              <div className="timeline-bs">{renderTimeline()}</div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PanduanPenelitian;
