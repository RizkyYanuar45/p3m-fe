import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
//agar langsung ke atas halaman di set pada main jsx

const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
export default ScrollTop;
