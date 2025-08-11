import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const api = import.meta.env.VITE_API_URL;

const LuaranP3M = () => {
  const [youtubeData, setYoutubeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${api}/youtube/`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data video.");
        }
        const data = await response.json();
        setYoutubeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) return <p className="text-center">Memuat video...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;
    if (youtubeData.length === 0)
      return <p className="text-center">Tidak ada video ditemukan.</p>;

    return youtubeData.map((item) => (
      <Col lg={4} md={6} sm={12} className="mb-4" key={item.id}>
        <Card
          className="h-100 shadow"
          style={{
            borderRadius: 12,
            overflow: "hidden",
            transition: "transform 0.2s",
          }}
        >
          <div className="ratio ratio-16x9">
            <iframe
              src={item.link}
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <Card.Body>
            <Card.Title className="fw-bold" style={{ color: "#e85a0e" }}>
              {item.title}
            </Card.Title>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="badge bg-danger">YouTube</span>
              <span className="text-muted" style={{ fontSize: 14 }}>
                {new Date(item.updatedAt).getFullYear()}
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        padding: "0 16px",
        minHeight: "80vh",
      }}
      className="pt-5"
    >
      <h2 className="mb-4 fw-bold text-center" style={{ letterSpacing: 2 }}>
        Luaran P3M Universitas Islam Majapahit
      </h2>
      <p className="mb-5 text-center" style={{ color: "#555" }}>
        Berikut adalah beberapa luaran hasil penelitian, publikasi, dan
        pengabdian yang telah dihasilkan oleh P3M UNIM.
      </p>
      <Container>
        <Row className="justify-content-center">{renderContent()}</Row>
      </Container>
    </div>
  );
};

export default LuaranP3M;
