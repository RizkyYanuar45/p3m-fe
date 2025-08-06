import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";
import ArticleCard from "../components/ArticleCard";

const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProgramPanduanPengabdianMasyarakatMandiri = () => {
  // State untuk data dari API
  const [panduanData, setPanduanData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError("");
      try {
        // Ambil data panduan dan artikel secara bersamaan
        const [panduanRes, articlesRes] = await Promise.all([
          fetch(`${api}/files/type?type=dokumen_pengabdian_masyarakat_mandiri`),
          fetch(`${api}/article/type/informasi_pengabdian_masyarakat_mandiri`),
        ]);

        if (!panduanRes.ok || !articlesRes.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }

        const panduanResult = await panduanRes.json();
        const articlesResult = await articlesRes.json();

        setPanduanData(panduanResult);
        setArticles(articlesResult);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []); // Dependensi kosong agar hanya berjalan sekali

  const createExcerpt = (htmlContent, maxLength = 100) => {
    if (!htmlContent) return "";
    const plainText = htmlContent.replace(/<[^>]*>/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <div className="panduan-page">
      <Herosection title={"Pengabdian Masyarakat Mandiri"} />

      <div className="timeline-wrapper py-5">
        <Container>
          {/* --- BAGIAN PANDUAN --- */}
          <Row className="text-center mb-5">
            <Col>
              <h1 className="fw-bold">Dokumen & Panduan</h1>
              <p className="text-muted">
                Kumpulan dokumen penting terkait pelaksanaan Pengabdian
                Masyarakat Mandiri.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="timeline-bs">
                {loading ? (
                  <p className="text-center">Memuat panduan...</p>
                ) : error ? (
                  <p className="text-center text-danger">{error}</p>
                ) : (
                  panduanData
                    .slice()
                    .reverse()
                    .map((item) => (
                      <div key={item.id} className="timeline-item">
                        <div className="timeline-content shadow-sm">
                          <time>
                            {new Date(item.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                          <h3 className="fw-bold">{item.file_name}</h3>
                          <p>{item.file_description}</p>
                          <Button
                            variant="danger"
                            size="sm"
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: "#e85a0e",
                              borderColor: "#e85a0e",
                            }}
                          >
                            Lihat Dokumen
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </Col>
          </Row>
        </Container>

        {/* --- BAGIAN ARTIKEL --- */}
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col>
              <h1 className="text-center fw-bold">
                Informasi Pengabdian Kepada Masyarakat
              </h1>
              <p className="text-center">
                Jelajahi berbagai artikel dan informasi pengabdian kepada
                masyarakat.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {loading ? (
              <p className="text-center">Memuat artikel...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              articles.map((artikel, index) => (
                <Col lg={4} md={6} sm={12} className="mb-4" key={artikel.id}>
                  <ArticleCard
                    image={`${backendUrl}/${artikel.thumbnail.replace(
                      /\\/g,
                      "/"
                    )}`}
                    title={artikel.title}
                    author={artikel.author}
                    date={new Date(artikel.published_date).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                    excerpt={createExcerpt(artikel.content)}
                    delay={`${(index % 3) * 200}`}
                    slug={artikel.slug}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>

      <Faqcomp />
    </div>
  );
};

export default ProgramPanduanPengabdianMasyarakatMandiri;
