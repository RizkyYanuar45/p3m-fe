import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeCard = ({ showViewAllButton = true, title = "null" }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Tentukan tipe artikel berdasarkan judul (title)
    let articleType = "informasi_pengabdian_masyarakat"; // Default
    if (title === "Informasi Penelitian") {
      articleType = "informasi_penelitian";
    } else if (title === "Informasi KKN") {
      articleType = "informasi_kkn";
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${api}/article/type/${articleType}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data artikel.");
        }
        const data = await response.json();
        // Ambil 3 artikel terbaru
        setNews(data.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]); // Jalankan ulang efek jika title berubah

  // Fungsi untuk menangani klik tombol Lihat Semua
  const handleViewAllClick = () => {
    let path = "/all-informasi-pengabdian-kepada-masyarakat"; // Path default
    if (title === "Informasi Penelitian") {
      path = "/all-informasi-penelitian";
    } else if (title === "Informasi KKN") {
      path = "/all-informasi-kkn-unim";
    }
    navigate(path);
  };

  const renderContent = () => {
    if (loading) return <p className="text-center">Memuat berita...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;
    if (news.length === 0)
      return <p className="text-center">Tidak ada berita ditemukan.</p>;

    return news.map((item) => {
      const publishedDate = new Date(item.published_date);
      const day = publishedDate.getDate();
      const month = publishedDate.toLocaleString("id-ID", { month: "short" });

      return (
        <Col key={item.id} xl={4} lg={4} md={6} sm={10} xs={12}>
          <Card
            className="h-100 news-card border-0 shadow-sm mx-auto"
            onClick={() => navigate(`/article/${item.slug}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="position-relative news-image-container">
              <Card.Img
                variant="top"
                src={`${backendUrl}${item.thumbnail.replace(/\\/g, "/")}`}
                alt={item.title}
                className="news-image"
              />
              <div className="news-overlay"></div>
              <div className="date-badge position-absolute z-0 top-0 start-0 m-3">
                <div className="date-number fw-bold">{day}</div>
                <div className="date-month fw-semibold">{month}</div>
              </div>
            </div>
            <Card.Body className="d-flex flex-column news-card-body">
              <Card.Title className="mb-3 flex-grow-1 news-title">
                {item.title}
              </Card.Title>
              <Button
                variant="warning"
                size="sm"
                className="align-self-start fw-semibold selengkapnya-btn"
              >
                Selengkapnya
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  return (
    <>
      <section
        className="berita-section py-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4 berita-title">{title}</h2>
          </div>
          <Row className="g-4 mb-4 justify-content-center">
            {renderContent()}
          </Row>
          {showViewAllButton && (
            <div className="text-center">
              <Button
                variant="warning"
                size="lg"
                className="fw-semibold lihat-semua-btn"
                onClick={handleViewAllClick}
              >
                Lihat Semua
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Custom CSS Styles */}
      <style jsx>{`
        .berita-title {
          color: #231942;
          font-size: 3rem;
          font-family: "Poppins", serif;
        }

        .news-card {
          border-radius: 15px !important;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          max-width: 350px;
          min-height: 400px;
          max-height: 450px;
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15) !important;
        }

        .news-image-container {
          height: 180px;
          overflow: hidden;
        }

        .news-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .news-card:hover .news-image {
          transform: scale(1.03);
        }

        .news-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .date-badge {
          background-color: #fbbf24;
          border-radius: 8px;
          padding: 8px 12px;
          text-align: center;
          min-width: 60px;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .date-number {
          font-size: 1.3rem;
          line-height: 1;
          color: #1f2937;
        }

        .date-month {
          font-size: 0.75rem;
          line-height: 1;
          color: #1f2937;
          margin-top: 2px;
        }

        .news-card-body {
          background-color: #e85a0e !important;
          color: white;
          height: 220px;
          padding: 1.25rem !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .news-title {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.4;
          color: white !important;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 1rem;
        }

        .selengkapnya-btn {
          background-color: #fbbf24 !important;
          border-color: #fbbf24 !important;
          color: #1f2937 !important;
          border-radius: 20px !important;
          padding: 6px 16px !important;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          width: fit-content;
        }

        .selengkapnya-btn:hover {
          background-color: #f59e0b !important;
          border-color: #f59e0b !important;
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(251, 191, 36, 0.3);
        }

        .lihat-semua-btn {
          background-color: #fbbf24 !important;
          border-color: #fbbf24 !important;
          color: #1f2937 !important;
          border-radius: 25px !important;
          padding: 12px 35px !important;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.25);
          transition: all 0.3s ease;
        }

        .lihat-semua-btn:hover {
          background-color: #f59e0b !important;
          border-color: #f59e0b !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(251, 191, 36, 0.35);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .news-card {
            max-width: 320px;
          }
        }

        @media (max-width: 992px) {
          .berita-title {
            font-size: 2.5rem !important;
          }

          .news-card {
            max-width: 300px;
            min-height: 380px;
            max-height: 420px;
          }

          .news-image-container {
            height: 160px;
          }

          .news-card-body {
            height: 200px;
          }
        }

        @media (max-width: 768px) {
          .berita-title {
            font-size: 2.2rem !important;
          }

          .news-card {
            max-width: 280px;
            min-height: 360px;
            max-height: 400px;
          }

          .news-image-container {
            height: 150px;
          }

          .news-card-body {
            height: 180px;
            padding: 1rem !important;
          }

          .news-title {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 576px) {
          .berita-title {
            font-size: 2rem !important;
          }

          .news-card {
            max-width: 100%;
            min-height: 340px;
            max-height: 380px;
          }

          .date-badge {
            padding: 6px 10px;
            min-width: 50px;
          }

          .date-number {
            font-size: 1.1rem;
          }

          .date-month {
            font-size: 0.7rem;
          }

          .news-card-body {
            height: 160px;
            padding: 0.9rem !important;
          }

          .news-title {
            font-size: 0.9rem;
            -webkit-line-clamp: 2;
          }

          .selengkapnya-btn {
            font-size: 0.8rem;
            padding: 5px 14px !important;
          }
        }

        @media (max-width: 400px) {
          .news-card {
            min-height: 320px;
            max-height: 360px;
          }

          .news-image-container {
            height: 140px;
          }

          .news-card-body {
            height: 150px;
          }
        }
      `}</style>
    </>
  );
};

export default HomeCard;
