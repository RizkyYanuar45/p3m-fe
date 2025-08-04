import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";

const api = import.meta.env.VITE_API_URL;

const SKPengabdianKepadaMasyarakat = () => {
  // State untuk data, loading, dan error
  const [skData, setSkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${api}/files/type?type=sk_rektor_pengabdian_masyarakat`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }
        const data = await response.json();
        setSkData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Dependensi kosong agar hanya berjalan sekali

  const renderTimeline = () => {
    if (loading) {
      return <p className="text-center">Memuat data...</p>;
    }
    if (error) {
      return <p className="text-center text-danger">{error}</p>;
    }
    if (skData.length === 0) {
      return <p className="text-center">Tidak ada SK yang ditemukan.</p>;
    }

    return skData
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
            >
              Lihat Dokumen
            </Button>
          </div>
        </div>
      ));
  };

  return (
    <div className="panduan-page">
      <Herosection title={"SK Pengabdian Kepada Masyarakat"} />

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
              <div className="timeline-bs">{renderTimeline()}</div>
            </Col>
          </Row>
        </Container>
      </div>

      <Faqcomp />
    </div>
  );
};

export default SKPengabdianKepadaMasyarakat;
