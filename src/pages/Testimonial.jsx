import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { testimonial } from "../data/index";
import Faqcomp from "../components/Faqcomp";

const Testimonial = () => {
  return (
    <div className="testimonial-page">
      <div className="testimonial">
        <Container>
          <Row className="mb-5">
            <Col>
              <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__fast animate__delay-1s">
                Semua Testimonial
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__fast animate__delay-1s">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                voluptate?
              </p>
            </Col>
          </Row>
          <Row className="row-cols-lg-3 row-cols-1">
            {testimonial.map((e) => {
              return (
                <Col key={e.id} className="d-flex flex-column p-3">
                  <p className="desc text-start shadow-sm">{e.desc}</p>
                  <div className="people">
                    <img src={e.image} />
                    <div>
                      <h5 className="mb-1">{e.name}</h5>
                      <p className="m-0 fw-bold">{e.skill}</p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Testimonial;
