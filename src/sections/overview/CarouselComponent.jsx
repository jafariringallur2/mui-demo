import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import './view/app.css';

const CarouselComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    responsive: [
      {
        breakpoint: 768, // Tablet or mobile view
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200, // Desktop view
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = [
    {
      desktopImage: "https://www.boat-lifestyle.com/cdn/shop/files/S750_WEB_1600x.jpg",
      mobileImage: "https://www.boat-lifestyle.com/cdn/shop/files/S750-MOB_600x.jpg",
      link: "#cat",
    },
    {
      desktopImage: "https://www.boat-lifestyle.com/cdn/shop/files/MONSOON-SALE-WEB_1_1440x.jpg",
      mobileImage: "https://www.boat-lifestyle.com/cdn/shop/files/MONSOON-SALE-MOB_1_600x.jpg",
      link: "#cat",
    },
  ];

  return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: {xs :"7px",sm : "1px"},
        }}
      >
        <Box sx={{ width:{ xs :"93%" , sm: "100%"}, maxWidth: "1200px" }}> {/* Adjust maxWidth for desktop */}
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <Box
                key={index}
                sx={{
                  backgroundImage: `url(${isMobile ? slide.mobileImage : slide.desktopImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  padding: "20px",
                  boxSizing: "border-box",
                  height: {xs :"400px",sm:"350px"},
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    height: "100%",
                    color: "white",
                  }}
                >
                  {/* Add any content here, like buttons or text */}
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
  );
};

export default CarouselComponent;
