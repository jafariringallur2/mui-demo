import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { getSliders } from "src/services/apiService";

import './app.css';

const CarouselComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await getSliders();
        if (data) {
          const { mobile, desktop } = data;
          if (isMobile) {
            setSlides(mobile || []);
          } else {
            setSlides(desktop || []);
          }
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSliders();
  }, [isMobile]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots) => (
      <Box
        sx={{
          position: "absolute",
          bottom: "10px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ul style={{ margin: "0px", padding: "0px", display: "flex" }}>
          {dots}
        </ul>
      </Box>
    ),
  };

  if (slides.length === 0) return null;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "7px", sm: "1px" },
      }}
    >
      <Box sx={{ width: { xs: "93%", sm: "100%" }, maxWidth: "1200px" }}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <Box
              key={index}
              component="div"
              onClick={() => {
                if (slide.link) {
                  window.open(slide.link, "_blank"); // Open in a new tab if link exists
                }
              }}
              sx={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                padding: "20px",
                boxSizing: "border-box",
                height: { xs: "400px", sm: "350px" },
                cursor: slide.link ? "pointer" : "default", // Show pointer cursor only if clickable
              }}
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default CarouselComponent;
