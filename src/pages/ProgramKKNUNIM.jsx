import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";

const ProgramKKNUNIM = () => {
  return (
    <div className="program-page">
      <Herosection title={"Program KKN UNIM"} />

      <div className="program-content py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h1 className="text-center fw-bold">
                Detail Program & Pelaksanaan
              </h1>
              <p className="text-center text-muted">
                Informasi mendalam mengenai Program Kuliah Kerja Nyata Yang
                diselenggarakan oleh P3M.
              </p>
            </Col>
          </Row>

          {/* Layout Dua Kolom Dimulai Di Sini */}
          <Row>
            {/* Kolom Kiri */}
            <Col md={6} className="text-column">
              <h3 className="fw-bold mb-3">
                {" "}
                Dasar Pelaksanaan Kuliah Kerja Nyata (KKN)
              </h3>
              <p>
                Dasar dari pelaksanaan program Kuliah Kerja Nyata (KKN) yang
                dilaksanakan di Universitas Islam Majapahit (UNIM) adalah,
                pertama, Pancasila dan UUD 1945; kedua, Undangundang No. 20
                Tahun 2003 tentang Pendidikan Nasional, pasal 20 ayat 2
                “Perguruan tinggi berkewajiban menyelenggarakan pendidikan,
                penelitian, dan pengabdian masyarakat”; ketiga, Undang-undang
                No. 12 Tahun 2012 tentang pendidikan tinggi, pasal 24 ayat 2
                “Perguruan tinggi memiliki otonomi untuk mengelola sendiri
                lembaganya sebagai pusat penyelenggaraan pendidikan tinggi,
                penelitian ilmiah, dan pengabdian masyarakat”; keempat, Statuta
                Universitas Islam Majapahit Pasal 77 ayat 7 huruf (c); kelima,
                kelima, Strategi jangka panjang Pendidikan Tinggi 2003-2010
                (HELTS 2003-2010) “Daya saing bangsa seyogyanya ditumbuhkan
                melalui pengembangan dan layanan masyarakat sebagai bagian yang
                tidak terpisahkan dari pendidikan.
              </p>

              <h3 className="fw-bold mb-3">
                Tujuan Dan Manfaat Kuliah Kerja Nyata
              </h3>
              <p>
                Tujuan adanya kegiatan Kuliah Kerja Nyata di tahun 2025 yaitu:
                <br />
                1. Sebagai bentuk penerapan ilmu pengetahuan dan teknologi serta
                sebagai wujud pengawalan Rencana Induk Penelitian dan Pengabdian
                kepada Masyarakat dengan indikator adanya peningkatan level
                keberdayaan (lampiran 1).
                <br />
                2. Mengasah critical thinking mahasiswa melalui metode BMC/MMC
                dalam penyusunan program KKN.
                <br />
                3. Mengasah kemampuan soft skill mahasiswa sehingga tumbuh
                menjadi pribadi yang komunikatif, problem solver, mempunyai jiwa
                pemimpin, adaptif, mampu bekerja dalam tim, berintegritas, mampu
                membuat keputusan, kreatif dan dapat diandalkan.
                <br />
                4. Mahasiswa Universitas Islam Majapahit (UNIM) bisa berperan
                sebagai katalisator (catalyst), pembantu proses (process
                helper), pemberi solusi (solution giver), dan penghubung sumber
                daya (sources linker) dalam masyarakat.
              </p>
              <p>
                Kuliah Kerja Nyata (KKN) Tematik 2025 memberikan manfaat timbal
                balik bagi mahasiswa, masyarakat, dan perguruan tinggi.
                <br />
                1. Bagi mahasiswa, KKN menjadi sarana untuk menerapkan ilmu
                secara langsung di lapangan, mengasah keterampilan interpersonal
                seperti komunikasi dan kepemimpinan, serta memperluas wawasan
                budaya.
                <br />
                2. Masyarakat lokal memperoleh keuntungan dari partisipasi
                mahasiswa dalam program pembangunan, transfer pengetahuan dan
                teknologi, serta munculnya inovasi baru yang meningkatkan
                kemandirian.
                <br />
                3. Sementara itu, bagi perguruan tinggi, program ini merupakan
                implementasi Tri Dharma yang efektif untuk meningkatkan reputasi
                universitas dan menjalin kemitraan strategis dengan berbagai
                pihak.
              </p>
            </Col>

            {/* Kolom Kanan */}
            <Col md={6} className="text-column">
              <h3 className="fw-bold mt-4 mb-3">
                Pengertian Kuliah Kerja Nyata (KKN)
              </h3>
              <p>
                KKN itu sendiri merupakan sebuah kegiatan kurikuler karena
                diakui dalam KRS (mempunyai bobot SKS) dan mempunyai konsekuensi
                penilaian yang terintegrasikan di dalam proses pembelajaran,
                sehingga mempunyai konsekuensi mengikat kepada semua Mahasiswa.
                Sedangkan KKN tematik merupakan sebuah kegiatan yang terjadwal
                secara akademik di universitas dan dilaksanakan dalam masyarakat
                diluar kampus dengan harapan mahasiswa dapat berlatih untuk
                meningkatkan relevansi keilmuan yang telah diperoleh selama
                duduk di bangku perkuliahan dengan perkembangan dan kebutuhan
                masyarakat yang sifatnya cenderung majemuk dan menuntut inovasi
                serta kepiawaian dalam memfasilitasi kebutuhan tersebut,
                terutama. Oleh karena itu, kegiatan Kuliah Keja Nyata (KKN)
                tematika diharapkan dapat mensadarkan dan menginisiasi
                penyelesaian permasalahan yang terjadi di masyarakat dengan
                pendekatan pasrtisipasi non aktif.
              </p>

              <h3 className="fw-bold mt-4 mb-3">
                Pentahapan Pelaksanaan Kuliah Kerja Nyata Tematik
              </h3>
              <p>
                Pentahapan yang telah dirancang oleh P3M (Penelitian, Publikasi,
                dan Pengabdian Kepada Masyarakat) dan diteruskan Panitia
                penyelenggara KKN Tematik dapat dibagi kedalam tujuh segmen,
                yakni:
                <br />
                1) Penetapan kebijakan umum tentang penyelenggaraan KKN
                (penetapan paradigma KKN yang hendak dilaksanakan),
                <br />
                2) Kegiatan administratif,
                <br />
                3) Kuliah pembekalan dan pelatihan secara luring,
                <br />
                4) Pelaksanaan kegiatan,
                <br />
                5) Pelaporan (individu),
                <br />
                6) Penilaian akademik
                <br />
                7) Skrining produk luaran program kerja
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProgramKKNUNIM;
