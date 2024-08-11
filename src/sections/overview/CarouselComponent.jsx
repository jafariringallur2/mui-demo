import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box } from "@mui/material";

import './view/app.css';

const CarouselComponent = () => {
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
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/ce09ea52690d3695.jpeg",
      link: "#cat",
    },
    {
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/f871c3dec2984ff3.jpeg",
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
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  padding: "20px",
                  boxSizing: "border-box",
                  height: {xs :"200px",sm:"300px"},
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
                 
                  {/* <Button
                    variant="contained"
                    href={slide.link}
                    sx={{
                      backgroundColor: "#d32f2f",
                      color: "#fff",
                      borderRadius: "20px",
                      padding: "5px 15px",
                    }}
                  >
                    Claim
                  </Button> */}
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
  );
};

export default CarouselComponent;
