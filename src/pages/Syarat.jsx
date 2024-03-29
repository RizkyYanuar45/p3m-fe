import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Faqcomp from "../components/Faqcomp";
const Syarat = () => {
  return (
    <div className="syarat-page ">
      <div className="syarat min-vh-100 ">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center mb-2 animate__animated animate__fadeInUp animate__delay-1s">
                Syarat dan Ketentuan
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </Col>
          </Row>
          <Row className="pt-5">
            <Col>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Assumenda, pariatur commodi dicta ex illum adipisci quas quos
                ipsam, ad maxime, reiciendis praesentium repellat eveniet sunt?
                Nam quod molestiae delectus perspiciatis. Eligendi suscipit
                perspiciatis nobis? Rem dolore magnam quia excepturi explicabo
                non aut velit, veniam, totam veritatis deserunt possimus
                cupiditate provident!
              </p>
            </Col>
          </Row>
          <Row>
            <h4 className="fw-bold">1. Lorem</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              deserunt dicta eos temporibus fuga nostrum eveniet, unde
              recusandae ab non quasi accusamus quo maiores magnam repellat
              inventore. Minima animi illum similique sapiente dolorem.
              Molestias quisquam et animi expedita, obcaecati, omnis quaerat a
              neque consectetur sint sequi veritatis necessitatibus ratione
              dolorem.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
              eum error modi vitae ipsum distinctio ipsam, provident eius alias
              libero cumque dolores architecto natus. Laudantium hic, cupiditate
              dolore repellat praesentium quam provident impedit delectus
              aperiam ea voluptatibus! Culpa, reprehenderit sed!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laboriosam hic voluptas cumque id eius totam nam nisi nihil quo,
              reprehenderit doloribus autem, sint error, adipisci veniam cum
              laudantium laborum cupiditate necessitatibus unde molestiae
              voluptatibus! Odit explicabo ab, tempore beatae quam voluptas
              deleniti repudiandae animi? Minus impedit dignissimos nihil
              provident error. Soluta, repellat vel repellendus id odio saepe
              velit ab eos beatae? Impedit itaque quis esse tempore quaerat
              officia tenetur, fuga odit illo ullam temporibus sint nihil
              voluptate numquam vitae est?
            </p>
          </Row>
          <Row className="py-4">
            <Col>
              <h4 className="fw-bold">2. Lorem</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                quam, quidem, ex voluptas reprehenderit aliquam quae fuga est
                voluptate reiciendis doloremque voluptates earum sint illum,
                veniam aspernatur vitae autem nam ipsum eos accusamus magni
                minima. Ex reiciendis unde aut tenetur quis quia, vero similique
                veniam pariatur ipsum iure numquam, esse maiores ab minus saepe
                blanditiis eligendi laudantium quibusdam maxime earum?
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorem maxime veniam laudantium labore, temporibus cum
                recusandae quod dolores, officia molestiae totam laboriosam
                fugit. Vel rem fugit reprehenderit perferendis aut cumque.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Faqcomp />
    </div>
  );
};

export default Syarat;
