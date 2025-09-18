import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";

const ProgramPengabdianMasyarakat = () => {
  return (
    <div className="program-page">
      <Herosection title={"Program Pengabdian Masyarakat"} />

      <div className="program-content py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h1 className="text-center fw-bold">
                Detail Program & Pelaksanaan
              </h1>
              <p className="text-center text-muted">
                Informasi mendalam mengenai program pengabdian kepada masyarakat
                yang diselenggarakan oleh P3M.
              </p>
            </Col>
          </Row>

          {/* Layout Dua Kolom Dimulai Di Sini */}
          <Row>
            {/* Kolom Kiri */}
            <Col md={6} className="text-column">
              <h3 className="fw-bold mb-3">Latar Belakang & Tujuan</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor. Cras elementum ultrices diam.
                Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                Proin porttitor, orci nec nonummy molestie, enim est eleifend
                mi, non fermentum diam nisl sit amet erat. Duis semper. Duis
                arcu massa, scelerisque vitae, consequat in, pretium a, enim.
                Pellentesque congue. Ut in risus volutpat libero pharetra
                tempor.
              </p>
              <p>
                Cras vestibulum bibendum augue. Praesent egestas leo in pede.
                Praesent blandit odio eu enim. Pellentesque sed dui ut augue
                blandit sodales. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris
                ac mauris sed pede pellentesque fermentum. Maecenas adipiscing
                ante non diam.
              </p>

              <h3 className="fw-bold mt-4 mb-3">Lingkup Program</h3>
              <p>
                Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
                porttitor, facilisis luctus, metus. Phasellus ultrices nulla
                quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate
                sem tristique cursus. Nam nulla quam, gravida non, commodo a,
                sodales sit amet, nisi. Pellentesque fermentum dolor. Aliquam
                quam lectus, facilisis auctor, ultrices ut, elementum vulputate,
                nunc.
              </p>
            </Col>

            {/* Kolom Kanan */}
            <Col md={6} className="text-column">
              <h3 className="fw-bold mb-3">Metodologi & Pelaksanaan</h3>
              <p>
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
                euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
                consequat. Praesent dapibus, neque id cursus faucibus, tortor
                neque egestas auguae, eu vulputate magna eros eu erat. Aliquam
                erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
                facilisis luctus, metus.
              </p>
              <p>
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
                consectetuer ligula vulputate sem tristique cursus. Nam nulla
                quam, gravida non, commodo a, sodales sit amet, nisi.
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc. Sed adipiscing
                ornare risus. Morbi est est, blandit sit amet, sagittis vel,
                suscipit vel, purus.
              </p>
              <h3 className="fw-bold mt-4 mb-3">Kriteria & Evaluasi</h3>
              <p>
                Donec consectetuer ligula vulputate sem tristique cursus. Nam
                nulla quam, gravida non, commodo a, sodales sit amet, nisi.
                Pellentesque fermentum dolor. Aliquam quam lectus, facilisis
                auctor, ultrices ut, elementum vulputate, nunc. Sed adipiscing
                ornare risus. Morbi est est, blandit sit amet, sagittis vel,
                suscipit vel, purus.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProgramPengabdianMasyarakat;
