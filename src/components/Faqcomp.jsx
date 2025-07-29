import React from "react";
import { Accordion, Row, Col, Container } from "react-bootstrap";
import { faq } from "../data/index";

function Faqcomp() {
  return (
    <div className="faq z-0">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center fw-bold animate__animated animate__fadeInUp animate__delay-1s">
              Pertanyaan yang sering ditanyakan
            </h2>
          </Col>
        </Row>
        <Row className="row-cols-lg-2 row-cols-lg-1 g-4 rounded-3 pt-5">
          {faq.map((data) => {
            return (
              <Accordion className="shadow-sm">
                <Accordion.Item eventKey={data.eventKey} key={data.id}>
                  <Accordion.Header>{data.title}</Accordion.Header>
                  <Accordion.Body>{data.desc}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Faqcomp;
