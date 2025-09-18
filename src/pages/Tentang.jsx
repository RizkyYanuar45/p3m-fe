import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";

import HeroImage from "../assets/img/foto/gedungAlhambra.jpg";

const Tentang = () => {
  return (
    <div className="tentang-page">
      {/* Hero Section Start */}
      <Herosection title={"Tentang P3M UNIM"} />
      {/* Hero Section End */}

      <div className="tentang-content">
        <Container>
          {/* Visi & Misi Section Start */}
          <Row className="py-5">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">Visi</h2>
              <p>
                Mewujudkan Universitas Islam Majapahit yang unggul, berbudaya,
                bermartabat dan rahmatan lil’alamin.
              </p>
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-3">Misi</h2>
              <ul>
                <li>
                  Misi pertama, Membangun infrastruktur pendidikan yang
                  bercirikan budaya Majapahit dan Islam yang meliputi: budaya
                  akademik, corporate culture, seni dan bangunan.
                </li>
                <li>
                  Misi kedua, Mengembangkan keunggulan pendidikan, tenaga
                  kependidikan, akademik, proses pembelajaran, sarana prasarana
                  dan lulusan.
                </li>
                <li>
                  Misi ketiga,Menghasilkan kinerja Tridharma Perguruan Tinggi
                  yang berkontribusi terhadap kemajuan peradapan dan kelestarian
                  kehidupan.
                </li>
              </ul>
            </Col>
          </Row>
          {/* Visi & Misi Section End */}

          <hr />

          {/* Peran & Arah Section Start */}
          <Row className="py-5 align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-3">Tujuan</h2>
              <p>
                1. Mengembangkan penelitian yang mengeksplorasi kearifan budaya
                Majapahit dan nilai-nilai Islam dalam berbagai bidang ilmu,
                termasuk sosial, seni, dan pendidikan, untuk memperkuat
                identitas unik universitas.
              </p>
              <p>
                2. Menyediakan penelitian yang mendukung pengembangan metode dan
                teknologi pembelajaran inovatif yang dapat meningkatkan kualitas
                tenaga pendidik, pembelajaran, dan fasilitas pendidikan di
                lingkungan universitas.
              </p>
              <p>
                3. Melakukan penelitian yang mendukung kontribusi universitas
                terhadap peradaban modern dan pelestarian lingkungan, terutama
                yang sesuai dengan kebutuhan dan tantangan masyarakat sekitar,
                untuk keberlanjutan kehidupan sosial dan alam.
              </p>
              <p>
                4. Mengarahkan penelitian pada peningkatan kompetensi lulusan
                agar siap bersaing secara global dan mampu berkontribusi secara
                positif di masyarakat, khususnya di bidang keahlian yang relevan
                dengan kebutuhan lokal dan nasional.
              </p>
            </Col>
            <Col md={6}>
              {/* Ganti dengan gambar yang relevan */}
              <img
                src={HeroImage}
                alt="Ilustrasi Peran dan Arah"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
          {/* Peran & Arah Section End */}

          <hr />

          {/* Sejarah Section Start */}
          <Row className="py-5">
            <Col>
              <h2 className="fw-bold text-center mb-4">Sasaran</h2>
              <p>
                1. Meningkatkan kualitas visi, misi, tujuan, sasaran strategis,
                serta rencana pengembangan.
              </p>
              <p>
                2. Mengoptimalkan tata kelola, penjaminan mutu, dan kolaborasi.
              </p>
              <p>
                3. Meningkatkan kualitas sumber daya manusia, sarana prasarana,
                dan sistem informasi.
              </p>
              <p>4. Meningkatkan kualitas dan jumlah sumber daya manusia.</p>
              <p>
                5. Memperbaiki pengelolaan keuangan serta sarana dan prasarana.
              </p>
              <p>6. Meningkatkan mutu pendidikan dan proses pembelajaran.</p>
              <p>7. Meningkatkan kualitas dan jumlah penelitian.</p>
              <p>
                8. Memperkuat kualitas kegiatan pengabdian kepada masyarakat.
              </p>
              <p>9. Meningkatkan kualitas luaran dan publikasi ilmiah.</p>
            </Col>
          </Row>
          {/* Sejarah Section End */}
        </Container>
      </div>

      {/* FAQ Component Tetap Di Sini */}
    </div>
  );
};

export default Tentang;
