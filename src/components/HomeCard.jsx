import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeCard = ({ newsItems, showViewAllButton = true, title = "null" }) => {
  // Data default jika tidak ada props newsItems
  const defaultNews = [
    {
      id: 1,
      date: "28",
      month: "Jul",
      title: "UNAIR Bersama Empat PTN-BH Lakukan Penanaman Pohon",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop&auto=format",
      category: "Lingkungan",
    },
    {
      id: 2,
      date: "02",
      month: "Jul",
      title: "Penandatanganan Kontrak Penelitian JATIMPRO dan UNAIR",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop&auto=format",
      category: "Kerjasama",
    },
    {
      id: 3,
      date: "22",
      month: "Jul",
      title: "LPPM UNAIR Gelar HITEX 2025 Showcase Inovasi Terdepan",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop&auto=format",
      category: "Inovasi",
    },
  ];

  const news = newsItems || defaultNews;

  return (
    <>
      <section
        className="berita-section py-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Container>
          {/* Header */}
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4 berita-title">{title}</h2>
          </div>

          {/* News Cards */}
          <Row className="g-4 mb-4 justify-content-center">
            {news.slice(0, 3).map((item) => (
              <Col key={item.id} xl={4} lg={4} md={6} sm={10} xs={12}>
                <Card className="h-100 news-card border-0 shadow-sm mx-auto">
                  <div className="position-relative news-image-container">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      alt={item.title}
                      className="news-image"
                    />
                    {/* Overlay biru */}
                    <div className="news-overlay"></div>

                    {/* Date Badge */}
                    <div className="date-badge position-absolute z-0 top-0 start-0 m-3">
                      <div className="date-number fw-bold">{item.date}</div>
                      <div className="date-month fw-semibold">{item.month}</div>
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
            ))}
          </Row>

          {/* View All Button */}
          {showViewAllButton && (
            <div className="text-center">
              <Button
                variant="warning"
                size="lg"
                className="fw-semibold lihat-semua-btn"
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
          color: #e85a0e;
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
