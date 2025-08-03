import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Herosection from "../components/Herosection";

const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const PimpinanLembaga = () => {
  const [pimpinanImages, setPimpinanImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${api}/profile/type?type=pimpinan_lembaga`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data pimpinan lembaga.");
        }
        const data = await response.json();
        setPimpinanImages(data);
      } catch (err) {
        setError(err.message);
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

    if (pimpinanImages.length === 0) {
      return (
        <p className="text-center">
          Tidak ada gambar pimpinan lembaga yang ditemukan.
        </p>
      );
    }

    // Tampilkan semua gambar yang didapat dari API
    return pimpinanImages.map((image) => (
      <img
        key={image.id}
        // Perbaiki path gambar dari backslash (\) menjadi forward slash (/)
        src={`${backendUrl}/${image.image.replace(/\\/g, "/")}`}
        alt={image.alt}
        className="img-fluid shadow-lg rounded mb-4"
      />
    ));
  };

  return (
    <div className="pimpinan-lembaga-page">
      <Herosection title={"Pimpinan Lembaga P3M UNIM"} />
      <div className="bagan-wrapper py-5">
        <Container>
          <Row>
            <Col className="text-center">
              <h1 className="fw-bold mb-5 animate__animated animate__fadeInUp">
                Pimpinan Lembaga P3M UNIM
              </h1>
              {/* Render konten secara dinamis */}
              {renderContent()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PimpinanLembaga;
