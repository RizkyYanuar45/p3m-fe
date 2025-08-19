import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import ArticleCard from "../components/ArticleCard";

const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Ambil query 'q' dari URL.
  const queryFromUrl = searchParams.get("q") || "";

  const [allArticles, setAllArticles] = useState([]); // State untuk menyimpan semua artikel dari API
  const [filteredResults, setFilteredResults] = useState([]); // State untuk hasil filter
  const [searchQuery, setSearchQuery] = useState(queryFromUrl); // State untuk input form pencarian

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State untuk paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(9);

  // 1. useEffect untuk mengambil SEMUA artikel saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchAllArticles = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${api}/article`); // Mengambil semua artikel
        if (!response.ok) throw new Error("Gagal memuat artikel dari server.");
        const data = await response.json();
        setAllArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllArticles();
  }, [api]);

  // 2. useEffect untuk MEMFILTER artikel setiap kali data API atau query di URL berubah
  useEffect(() => {
    if (queryFromUrl) {
      const results = allArticles.filter(
        (artikel) =>
          (artikel.title &&
            artikel.title.toLowerCase().includes(queryFromUrl.toLowerCase())) ||
          (artikel.author &&
            artikel.author
              .toLowerCase()
              .includes(queryFromUrl.toLowerCase())) ||
          (artikel.content &&
            artikel.content.toLowerCase().includes(queryFromUrl.toLowerCase()))
      );
      setFilteredResults(results);
    } else {
      setFilteredResults(allArticles); // Tampilkan semua jika tidak ada query
    }
    setCurrentPage(1); // Selalu reset ke halaman pertama saat query berubah
    setSearchQuery(queryFromUrl); // Sinkronkan input form dengan query URL
  }, [queryFromUrl, allArticles]);

  // 3. Fungsi untuk submit pencarian dari halaman ini
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search-page?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Helper functions
  const createExcerpt = (htmlContent, maxLength = 100) => {
    if (!htmlContent) return "";
    const plainText = htmlContent.replace(/<[^>]*>/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Logika Paginasi
  const articlesToDisplay = queryFromUrl ? filteredResults : allArticles;
  const totalPages = Math.ceil(articlesToDisplay.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articlesToDisplay.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{ maxWidth: 1000, margin: "40px auto", padding: "0 16px" }}
      className="pt-5"
    >
      <h2 className="mb-4">
        {queryFromUrl
          ? `Hasil Pencarian untuk "${queryFromUrl}"`
          : "Semua Artikel"}
      </h2>
      <Form onSubmit={handleSearch} className="d-flex mb-4">
        <Form.Control
          type="search"
          placeholder="Ketik pencarian baru..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="me-2"
        />
        <Button
          type="submit"
          style={{ backgroundColor: "#e85a0e", borderColor: "#e85a0e" }}
        >
          Cari
        </Button>
      </Form>
      <Container>
        <Row>
          {loading ? (
            <p className="text-center">Memuat...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : currentArticles.length > 0 ? (
            currentArticles.map((artikel, index) => (
              <Col lg={4} md={6} sm={12} className="mb-4" key={artikel.id}>
                <ArticleCard
                  image={`${backendUrl}${artikel.thumbnail.replace(
                    /\\/g,
                    "/"
                  )}`}
                  title={artikel.title}
                  author={artikel.author}
                  date={new Date(artikel.published_date).toLocaleDateString(
                    "id-ID",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                  excerpt={createExcerpt(artikel.content)}
                  slug={artikel.slug}
                  delay={`${(index % 3) * 200}`}
                />
              </Col>
            ))
          ) : (
            <Col>
              <div className="alert alert-warning text-center">
                Tidak ada artikel yang cocok dengan pencarian Anda.
              </div>
            </Col>
          )}
        </Row>

        {/* --- Bagian Paginasi --- */}
        {totalPages > 1 && (
          <Row>
            <Col className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <a onClick={handlePrevious} href="#!" className="page-link">
                      &laquo;
                    </a>
                  </li>
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={`page-item ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      <a
                        onClick={() => setCurrentPage(number)}
                        href="#!"
                        className="page-link"
                      >
                        {number}
                      </a>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <a onClick={handleNext} href="#!" className="page-link">
                      &raquo;
                    </a>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default SearchPage;
