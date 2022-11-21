import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Slider.css";

// import required modules
import { Pagination } from "swiper";

//import images
import Summer from '../image/Summer.png';
import Winter from '../image/Winter.png';
import Accessories from '../image/Accessories.png';
import Sale from '../image/sale.png';
import Logo from '../image/Logo.jpg';
import { Link } from "react-router-dom";

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slider-text">
            <h1>Welcome to Revelation!</h1>
            <h4>Scroll down to shop</h4>
          </div>
          <img src={Logo} alt={"picture"} className={'images'}/>
          </SwiperSlide>
        <SwiperSlide>
          <div className="slider-text">
            <h1>Summer Collection</h1>
            <p>Shop our summer range. We have all the gear you'll need to keep you cool, colourful and stylish all summer long.</p>
            <button><Link to='/summer' className="shoplink">Shop Summer</Link></h5>
          </div>
          <img src={Summer} alt={"picture"} className={'images'}/>
          </SwiperSlide>
        <SwiperSlide>
          <div className="slider-text">
          <h1>Winter Collection</h1>
            <p>Shop our winter range. We have all the gear you'll need to keep you warm.comfortable and stylish throughout the winter season.</p>
            <h5><Link to='/winter' className="shoplink">Shop Winter</Link></h5>
          </div>
          <img src={Winter} alt={"picture"}/>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-text">
          <h1>Accessories Collection</h1>
            <p>Shop our accessories range, for the latest shades, bags, head gear and more.</p>
            <h5><Link to='/accessories' className="shoplink">Shop Accessories</Link></h5>
          </div>
          <img src={Accessories} alt={"picture"} className={'images'} />
        </SwiperSlide>
        
      </Swiper>
    </>
  );
}
