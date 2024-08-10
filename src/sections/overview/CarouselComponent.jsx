import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, Button, Typography } from "@mui/material";

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
      image: "https://web.botire.in/botire/sliders/1_1688907404.png",
      title: "Get Special Offer",
      description: "All Services Available | T&C Applied",
      offer: "Up to 40%",
      link: "#cat",
    },
    {
      image: "https://web.botire.in/botire/sliders/1_1688911390.png",
      title: "Shop online, anywhere",
      description: "All Services Available | T&C Applied",
      offer: "Up to 40%",
      link: "#cat",
    },
  ];

  return (
    <section id="intro" style={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box sx={{ width: "90%", maxWidth: "1200px" }}> {/* Adjust maxWidth for desktop */}
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
                  height: "200px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "10px",
                    padding: "5px 10px",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    Limited time!
                  </Typography>
                </Box>
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
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#d32f2f",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    {slide.offer}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: "20px",
                    }}
                  >
                    {slide.description}
                  </Typography>
                  <Button
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
                  </Button>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </section>
  );
};

export default CarouselComponent;
