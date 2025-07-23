import { Container, Row, Col } from "react-bootstrap";
import Faqcomp from "../components/Faqcomp";
import ArticleCard from "../components/ArticleCard"; // Impor komponen ArticleCard

// --- Data Artikel (tetap di sini sesuai permintaan Anda) ---
const semuaArtikel = [
  {
    id: 1,
    image: "../../assets/img/kelas/kelas-1.jpg",
    title: "Inovasi Terbaru dalam Energi Terbarukan",
    author: "Dr. Budi Santoso",
    date: "15 Juli 2025",
    excerpt: "Artikel ini membahas terobosan mutakhir dalam teknologi energi surya dan dampaknya terhadap keberlanjutan global.",
    delay: "300",
  },
  {
    id: 2,
    image: "../../assets/img/kelas/kelas-1.jpg",
    title: "Peran AI dalam Pengembangan Obat Baru",
    author: "Prof. Siti Aminah",
    date: "10 Juli 2025",
    excerpt: "Bagaimana kecerdasan buatan merevolusi proses penemuan dan pengembangan obat, mempercepat terobosan medis.",
    delay: "600",
  },
  {
    id: 3,
    image: "../../assets/img/kelas/kelas-1.jpg",
    title: "Analisis Dampak Perubahan Iklim di Asia Tenggara",
    author: "Dr. Ling Ling",
    date: "01 Juli 2025",
    excerpt: "Studi mendalam mengenai efek perubahan iklim, termasuk kenaikan permukaan air laut dan cuaca ekstrem, di wilayah Asia Tenggara.",
    delay: "900",
  },
  {
    id: 4,
    image: "../../assets/img/kelas/kelas-1.jpg",
    title: "Evolusi Teknologi Blockchain Beyond Cryptocurrency",
    author: "Ahmad Riyadi, M.Kom.",
    date: "28 Juni 2025",
    excerpt: "Melampaui mata uang kripto, artikel ini mengeksplorasi aplikasi blockchain dalam rantai pasok, keamanan data, dan lebih banyak lagi.",
    delay: "300",
  },
  {
    id: 5,
    image: "../../assets/img/kelas/kelas-1.jpg",
    title: "Psikologi Digital: Dampak Media Sosial pada Kesehatan Mental",
    author: "Dra. Fitriani",
    date: "20 Juni 2025",
    excerpt: "Sebuah tinjauan komprehensif tentang bagaimana penggunaan media sosial mempengaruhi kesejahteraan psikologis individu di era digital.",
    delay: "600",
  },
  {
    id: 6,
    image: "../../assets/img/kelas/kelas-1.jpg",
    title: "Pertanian Vertikal: Solusi Pangan Masa Depan?",
    author: "Ir. Joko Susilo",
    date: "12 Juni 2025",
    excerpt: "Menjelajahi potensi pertanian vertikal sebagai metode inovatif untuk memproduksi pangan secara efisien di perkotaan.",
    delay: "900",
  },
];
// --- Akhir Data Artikel ---

const InformasiPenelitian = () => {
  return (
    <div className="artikel-page mt-5">
      <div className="artikel min-vh-100">
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__fast">
                Informasi Penelitian & Artikel
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__fast">
                Jelajahi berbagai artikel dan informasi penelitian terbaru kami.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {/* Menggunakan komponen ArticleCard di sini */}
            {semuaArtikel.map((artikel) => (
              <ArticleCard
                key={artikel.id}
                image={artikel.image}
                title={artikel.title}
                author={artikel.author}
                date={artikel.date}
                excerpt={artikel.excerpt}
                delay={artikel.delay}
              />
            ))}
          </Row>
        </Container>
      </div>
      <Faqcomp />
    </div>
  );
};

export default InformasiPenelitian;