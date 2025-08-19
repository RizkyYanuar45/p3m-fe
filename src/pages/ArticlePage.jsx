import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom"; // 1. Impor useParams

const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ArticlePage = () => {
  // 2. Ambil parameter 'slug' dari URL
  const { slug } = useParams();

  // 3. State untuk menyimpan data artikel, status loading, dan error
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 4. useEffect untuk mengambil data berdasarkan slug
  useEffect(() => {
    if (!slug) return; // Jangan lakukan apa-apa jika tidak ada slug

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${api}/article/slug/${slug}`);
        if (!response.ok) {
          throw new Error(
            "Artikel tidak ditemukan atau terjadi kesalahan server."
          );
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Efek ini akan berjalan lagi jika slug berubah

  // 5. Tampilan kondisional berdasarkan state
  if (loading) {
    return (
      <Container className="my-5 text-center">
        <p>Memuat artikel...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container className="my-5 text-center">
        <p>Artikel tidak ditemukan.</p>
      </Container>
    );
  }

  // 6. Tampilan utama jika data berhasil dimuat
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Judul Artikel */}
          <h1 className="text-center mb-3 fw-bold">{article.title}</h1>

          {/* Meta Info: Penulis dan Tanggal Terbit */}
          <div className="text-center text-muted mb-4">
            <span>
              Oleh: <strong>{article.author}</strong>
            </span>
            <span className="mx-2">|</span>
            <span>
              Diterbitkan pada:{" "}
              {new Date(article.published_date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Thumbnail Artikel */}
          <Image
            src={`${backendUrl}${article.thumbnail.replace(/\\/g, "/")}`}
            alt={article.title}
            fluid
            rounded
            className="mb-4 shadow-sm"
          />

          {/* Konten Artikel */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ArticlePage;
