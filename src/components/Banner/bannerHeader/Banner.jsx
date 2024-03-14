
import React from "react";
import "./Banner.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../../assets/images";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

// Banner component
const Banner = () => {
  // Render the Slider component with linked images
  return (
    <div className="slider">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={30}
        isPlaying={true}
        totalSlides={3}
        lockOnWindowScroll={true}
      >
        <Slider>
          <Slide index={0}>
            <Link to="/offer">
              <div className="slider-item">
                <img src={bannerImgOne} loading="lazy" />
              </div>
            </Link>
          </Slide>
          <Slide index={1}>
            <Link to="/offer">
              <div className="slider-item">
                <img src={bannerImgTwo} loading="lazy" />
              </div>
            </Link>
          </Slide>
          <Slide index={2}>
            <Link to="/offer">
              <div className="slider-item">
                <img src={bannerImgThree} loading="lazy" />
              </div>
            </Link>
          </Slide>
        </Slider>

      </CarouselProvider>
    </div>
  );
};

export default Banner;
