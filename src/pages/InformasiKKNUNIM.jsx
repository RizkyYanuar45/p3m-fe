import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Faqcomp from "../components/Faqcomp";
import ArticleCard from "../components/ArticleCard";

const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const InformasiKKNUNIM = () => {
  // State untuk menyimpan data dari API, status loading, dan error
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hook untuk mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${api}/article/type/informasi_kkn`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Dependency array kosong agar hanya berjalan sekali

  // Helper function untuk membuat kutipan singkat dari HTML
  const createExcerpt = (htmlContent, maxLength = 100) => {
    if (!htmlContent) return "";
    const plainText = htmlContent.replace(/<[^>]*>/g, ""); // Hapus semua tag HTML
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.substring(0, maxLength) + "...";
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Col>
          <p className="text-center">Memuat artikel...</p>
        </Col>
      );
    }
    if (error) {
      return (
        <Col>
          <p className="text-center text-danger">{error}</p>
        </Col>
      );
    }
    if (articles.length === 0) {
      return (
        <Col>
          <p className="text-center">Tidak ada artikel yang ditemukan.</p>
        </Col>
      );
    }

    return articles.map((artikel, index) => (
      <Col lg={4} md={6} sm={12} className="mb-4" key={artikel.id}>
        <ArticleCard
          image={`${backendUrl}${artikel.thumbnail.replace(/\\/g, "/")}`}
          title={artikel.title}
          author={artikel.author}
          slug={artikel.slug} // Tambahkan slug untuk link detail
          date={new Date(artikel.published_date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          excerpt={createExcerpt(artikel.content)}
          delay={`${(index % 3) * 200}`} // Membuat delay animasi dinamis
        />
      </Col>
    ));
  };

  return (
    <div className="artikel-page mt-5">
      <div className="artikel min-vh-100">
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__fast">
                Informasi KKN UNIM
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__fast">
                Jelajahi berbagai artikel dan informasi KKN terbaru kami.
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">{renderContent()}</Row>
        </Container>
      </div>
    </div>
  );
};

export default InformasiKKNUNIM;
