import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import your carousel data
import { carouselData } from "../data/carousel";

function Carousel() {
  let navigate = useNavigate(); // Initialize navigate

  return (
    <header className="w-100 min-vh-100 d-flex align-items-center overflow-hidden ">
      {/* Swiper component for the background */}
      <Swiper
        className="swiper-container-hero"
        modules={[Autoplay, Pagination, EffectFade]} // Add modules here
        effect="fade" // Set the transition effect
        loop={true}
        autoplay={{
          delay: 3500, // Time in ms between slides
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {carouselData.map((data) => (
          <SwiperSlide key={data.id}>
            <img src={data.image} alt="Carousel background" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Your original content, now layered on top */}
      {/* <Container>
        <Row className="header-box d-flex align-items-center">
          <Col lg="6" className=" bg-yellow-transparent">
            <h1 className="mb-4 animate__animated animate__fadeInUp animate__fast bg-transparent-yellow">
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
        </Row>
      </Container> */}
    </header>
  );
}

export default Carousel;
