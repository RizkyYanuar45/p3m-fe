import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/img/hero.png";
import { kelasTerbaru, dataSwiper } from "../data/index";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import Faqcomp from "../components/Faqcomp";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center overflow-hidden">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6">
              <h1 className="mb-4 animate__animated animate__fadeInUp animate__fast">
                Temukan <br />
                <span>Bakat</span> <br />
                Lets GO
              </h1>
              <p className="mb-4 animate__animated animate__fadeInLeft animate_fast">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis iste voluptatem magni quidem, exercitationem eos.
              </p>
              <button
                className="me-3 btn btn-lg btn-danger rounded-1 mb-xs-0 mb-0 animate__animated animate__lightSpeedInLeft animate__fast"
                onClick={() => {
                  navigate("/kelas");
                }}
              >
                Lihat Kelas
              </button>
              <button className=" btn btn-lg btn-outline-danger rounded-1 animate__animated animate__lightSpeedInLeft animate__fast">
                Lihat Promo
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img
                src={HeroImage}
                alt="Gambar"
                className="animate__animated animate__fadeInUp animate__fast"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="kelas w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold fs-2">Kelas Terbaru</h1>
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </Col>
          </Row>
          <Row>
            {kelasTerbaru.map((kelas) => {
              return (
                <Col
                  key={kelas.id}
                  className="shadow-sm "
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={kelas.delay}
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
          <Row>
            <Col
              className="d-flex justify-content-center my-5 "
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <button
                className="btn btn-success btn-lg rounded-5"
                data-aos="fade-up"
                data-aos-duration="1000"
                onClick={() => {
                  navigate("/kelas");
                }}
              >
                Lihat semua kelas
                <i className="fa-solid fa-chevron-right ms-2"></i>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="testimonial">
        <Container>
          <Row>
            <Col className="text-center pb-5">
              <h1 className="mb-4">Testimonial</h1>
            </Col>
          </Row>
          <Row>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {dataSwiper.map((e) => {
                return (
                  <SwiperSlide
                    key={e.id}
                    className="shadow-md d-flex flex-column p-3"
                  >
                    <p className="desc text-start">{e.desc}</p>
                    <div className="people">
                      <img src={e.image} />
                      <div>
                        <h5 className="mb-1">{e.name}</h5>
                        <p className="m-0 fw-bold">{e.skill}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Row>
        </Container>
      </div>
      <Faqcomp />
    </div>
  );
};

export default Homepage;
