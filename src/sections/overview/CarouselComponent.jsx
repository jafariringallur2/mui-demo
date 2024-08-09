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
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        appendDots: (dots) => (
          <Box
            sx={{
              position: "absolute",
              bottom: "20px", // Position the dots 20px above the bottom of the image
              display: "flex",
              justifyContent: "center",
              width: "100%",
              zIndex: 1, // Ensure dots appear above the image
            }}
          >
            <ul style={{ margin: "0px" }}> {dots} </ul>
          </Box>
        ),
        customPaging: (i) => (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              opacity: 0.7,
              transition: "opacity 0.3s",
              "&:hover": {
                opacity: 1,
              },
            }}
          />
        ),
      };
  
    const slides = [
      {
        image: "https://web.botire.in/botire/sliders/1_1688907404.png",
        title: "Grab our products",
        link: "#cat",
      },
      {
        image: "https://web.botire.in/botire/sliders/1_1688911390.png",
        title: "Shop online, anywhere",
        link: "#cat",
      },
    ];
  
    return (
      <section id="intro" style={{ position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <Box
                key={index}
                sx={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "60vh",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      color: "white",
                      textAlign: "center",
                      animation: "fadeInDown 1s",
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Button
                    variant="contained"
                    href={slide.link}
                    sx={{
                      mt: 2,
                      backgroundColor: "var(--secondary-color)",
                      animation: "fadeInUp 1s",
                    }}
                  >
                    Shop Now
                  </Button>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </section>
    );
  };
  
  export default CarouselComponent;
