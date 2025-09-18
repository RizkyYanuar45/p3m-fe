import { Container, Row, Col } from "react-bootstrap";

import HomeCard from "../components/HomeCard";
import Carousel from "../components/Carousel";
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
      <Carousel />

      <HomeCard title="Informasi Penelitian" />
      <HomeCard title="Informasi Pengabdian Pada Masyarakat" />
      <HomeCard title="Informasi KKN" />
    </div>
  );
};

export default Homepage;
