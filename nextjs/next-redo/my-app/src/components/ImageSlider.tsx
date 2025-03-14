'use client'

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ImageSlider = () => {
    const settings = {
        dots: true,
      };

    return (
    <div className="image-slider-container">
      <Slider {...settings}>
        <div>
          <img src="/imgs/curry.jpg" />
        </div>
        <div>
          <img src="/imgs/noodles.jpg" />
        </div>
        <div>
          <img src="/imgs/stew.jpg" />
        </div>
        <div>
          <img src="/imgs/curry.jpg" />
        </div>
      </Slider>
    </div>
    )
}