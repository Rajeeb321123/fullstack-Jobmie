// infinite react  carousel slider 

import React from "react";



import Slider from "react-slick";


import "./Slide.scss";





const Slide = ({ children, slidesToShow, title  }) => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
    speed: 400,
    // slidesToScroll:arrowsScroll,
  };
  return (
    <div className="slide">
      <div className="container" >
        <dvi className="title1">{title}</dvi>
        <Slider
          {...settings}
        >
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;