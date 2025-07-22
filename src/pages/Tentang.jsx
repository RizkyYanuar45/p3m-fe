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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl,
                eget aliquam nisl nisl sit amet nisl.
              </p>
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-3">Misi</h2>
              <ul>
                <li>
                  Misi pertama, lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </li>
                <li>
                  Misi kedua, fusce dapibus, tellus ac cursus commodo, tortor
                  mauris.
                </li>
                <li>Misi ketiga, nulla vitae elit libero, a pharetra augue.</li>
                <li>
                  Misi keempat, praesent commodo cursus magna, vel scelerisque
                  nisl.
                </li>
              </ul>
            </Col>
          </Row>
          {/* Visi & Misi Section End */}

          <hr />

          {/* Peran & Arah Section Start */}
          <Row className="py-5 align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-3">Peran & Arah Pengembangan</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
                quasi. Eum laudantium, quae beatae optio iusto unde, maxime
                debitis facilis alias laboriosam officiis! Asperiores, eius.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Donec ullamcorper nulla non metus auctor fringilla.
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
              <h2 className="fw-bold text-center mb-4">Sejarah Singkat</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Laboriosam hic voluptas cumque id eius totam nam nisi nihil quo,
                reprehenderit doloribus autem, sint error, adipisci veniam cum
                laudantium laborum cupiditate necessitatibus unde molestiae
                voluptatibus! Odit explicabo ab, tempore beatae quam voluptas
                deleniti repudiandae animi?
              </p>
              <p>
                Minus impedit dignissimos nihil provident error. Soluta,
                repellat vel repellendus id odio saepe velit ab eos beatae?
                Impedit itaque quis esse tempore quaerat officia tenetur, fuga
                odit illo ullam temporibus sint nihil voluptate numquam vitae
                est?
              </p>
            </Col>
          </Row>
          {/* Sejarah Section End */}
        </Container>
      </div>

      {/* FAQ Component Tetap Di Sini */}
      <Faqcomp />
    </div>
  );
};

export default Tentang;
