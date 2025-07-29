import React, { useState, useEffect } from "react";
import dummyImage from "./../assets/img/kelas/kelas-1.jpg";
import ArticleCard from "../components/ArticleCard";
import { Row, Col, Container } from "react-bootstrap";

const semuaArtikel = [
  // ... (data dummy Anda tetap sama)
  {
    id: 1,
    image: dummyImage,
    title: "Inovasi Terbaru dalam Energi Terbarukan",
    author: "Dr. Budi Santoso",
    date: "15 Juli 2025",
    excerpt:
      "Artikel ini membahas terobosan mutakhir dalam teknologi energi surya dan dampaknya terhadap keberlanjutan global.",
    delay: "100",
  },
  {
    id: 2,
    image: dummyImage,
    title: "Peran AI dalam Pengembangan Obat Baru",
    author: "Prof. Siti Aminah",
    date: "10 Juli 2025",
    excerpt:
      "Bagaimana kecerdasan buatan merevolusi proses penemuan dan pengembangan obat, mempercepat terobosan medis.",
    delay: "200",
  },
  {
    id: 3,
    image: dummyImage,
    title: "Analisis Dampak Perubahan Iklim di Asia Tenggara",
    author: "Dr. Ling Ling",
    date: "01 Juli 2025",
    excerpt:
      "Studi mendalam mengenai efek perubahan iklim, termasuk kenaikan permukaan air laut dan cuaca ekstrem, di wilayah Asia Tenggara.",
    delay: "300",
  },
  {
    id: 4,
    image: dummyImage,
    title: "Evolusi Teknologi Blockchain Beyond Cryptocurrency",
    author: "Ahmad Riyadi, M.Kom.",
    date: "28 Juni 2025",
    excerpt:
      "Melampaui mata uang kripto, artikel ini mengeksplorasi aplikasi blockchain dalam rantai pasok, keamanan data, dan lebih banyak lagi.",
    delay: "100",
  },
  {
    id: 5,
    image: dummyImage,
    title: "Psikologi Digital: Dampak Media Sosial pada Kesehatan Mental",
    author: "Dra. Fitriani",
    date: "20 Juni 2025",
    excerpt:
      "Sebuah tinjauan komprehensif tentang bagaimana penggunaan media sosial mempengaruhi kesejahteraan psikologis individu di era digital.",
    delay: "200",
  },
  {
    id: 6,
    image: dummyImage,
    title: "Pertanian Vertikal: Solusi Pangan Masa Depan?",
    author: "Ir. Joko Susilo",
    date: "12 Juni 2025",
    excerpt:
      "Menjelajahi potensi pertanian vertikal sebagai metode inovatif untuk memproduksi pangan secara efisien di perkotaan.",
    delay: "300",
  },
  {
    id: 7,
    image: dummyImage,
    title: "Quantum Computing: Babak Baru Komputasi",
    author: "Dr. Albert",
    date: "10 Juni 2025",
    excerpt: "Memahami dasar-dasar komputasi kuantum dan potensinya.",
    delay: "100",
  },
  {
    id: 8,
    image: dummyImage,
    title: "Mikroplastik di Lautan Kita",
    author: "Dr. Anisa",
    date: "05 Juni 2025",
    excerpt: "Investigasi sumber dan dampak mikroplastik bagi ekosistem laut.",
    delay: "200",
  },
  {
    id: 9,
    image: dummyImage,
    title: "Sejarah Rute Rempah Nusantara",
    author: "Prof. Sejarah",
    date: "01 Juni 2025",
    excerpt:
      "Menelusuri kembali jejak perdagangan rempah yang membentuk dunia.",
    delay: "300",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
  {
    id: 10,
    image: dummyImage,
    title: "Artikel Halaman Kedua",
    author: "Penulis Tes",
    date: "30 Mei 2025",
    excerpt: "Ini adalah artikel contoh untuk halaman kedua paginasi.",
    delay: "100",
  },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(9);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    const filtered = semuaArtikel.filter(
      (artikel) =>
        artikel.title.toLowerCase().includes(query.toLowerCase()) ||
        artikel.author.toLowerCase().includes(query.toLowerCase()) ||
        artikel.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setCurrentPage(1);

    setLoading(false);
  };

  const articlesToPaginate = query ? results : semuaArtikel;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articlesToPaginate.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const pageNumbers = [];
  const totalPages = Math.ceil(articlesToPaginate.length / articlesPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 16px" }}>
      <h2 className="mb-4">Cari Artikel</h2>
      <form onSubmit={handleSearch} className="d-flex mb-4">
        {/* ... form tidak berubah ... */}
        <input
          type="text"
          className="form-control me-2"
          placeholder="Ketik judul, penulis, atau kata kunci artikel..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Mencari..." : "Cari"}
        </button>
      </form>
      <Container>
        <Row>
          {/* ... mapping artikel tidak berubah ... */}
          {currentArticles.length > 0 ? (
            currentArticles.map((artikel) => (
              <Col lg={4} md={6} sm={12} className="mb-4" key={artikel.id}>
                <ArticleCard
                  image={artikel.image}
                  title={artikel.title}
                  author={artikel.author}
                  date={artikel.date}
                  excerpt={artikel.excerpt}
                  delay={artikel.delay}
                />
              </Col>
            ))
          ) : (
            <Col>
              <div className="alert alert-warning text-center">
                Tidak ada artikel ditemukan.
              </div>
            </Col>
          )}
        </Row>

        {/* --- MODIFIKASI BAGIAN PAGINASI --- */}
        {totalPages > 1 && (
          <Row>
            <Col className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  {/* Tombol Previous */}
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <a onClick={handlePrevious} href="#!" className="page-link">
                      &laquo;
                    </a>
                  </li>

                  {/* Tombol Nomor Halaman */}
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={`page-item ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      <a
                        onClick={() => handlePaginate(number)}
                        href="#!"
                        className="page-link"
                      >
                        {number}
                      </a>
                    </li>
                  ))}

                  {/* Tombol Next */}
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
