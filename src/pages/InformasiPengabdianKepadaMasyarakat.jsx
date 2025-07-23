
import { Container, Row, Col } from "react-bootstrap";
import { semuaKelas } from "../data/index";
import Faqcomp from "../components/Faqcomp";

const InformasiPengabdianKepadaMasyarakat = () => {
  return (
    <div className="kelas-page">
      <div className="kelas min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__fast">
                Semua Kelas
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__fast">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
                nobis corporis provident doloribus fugiat alias!
              </p>
            </Col>
          </Row>
          <Row>
            {semuaKelas.map((kelas) => {
              return (
                <Col
                  key={kelas.id}
                  className="shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={kelas.delay}
                  data-aos-duration="1000"
                >
                  <img
                    src={kelas.image}
                    alt="unsplash.com"
                    className="rounded-top-3"
                  />
                  <div className="star mb-2 d-flex justify-content-center mt-2">
                    <i className={kelas.star1}></i>
                    <i className={kelas.star2}></i>
                    <i className={kelas.star3}></i>
                    <i className={kelas.star4}></i>
                    <i className={kelas.star5}></i>
                  </div>
                  <h6 className="mb-5 px-3 fs-4">{kelas.title}</h6>
                  <div className="ket d-flex justify-content-between align-items-center px-3 pb-3 ">
                    <div className="m-0 text-primary fw-bold">
                      {kelas.price}
                    </div>
                    <button className="btn btn-md btn-danger rounded-1">
                      {kelas.buy}
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <Faqcomp />
    </div>
  );
};

export default InformasiPengabdianKepadaMasyarakat;
