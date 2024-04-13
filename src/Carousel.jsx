import React from 'react';
import "./Carosel.css";
import Slider from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css'
import Product from './Product';
import Category from './Category'
const Carousel = () => {
  return (
    <>
       <Slider>
        <div className="slide"><img
            src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/9/13/e8513080-e17c-43fb-85ac-6ebf4d3c93e81663064503420-Prebuzz-Banner_DK_2.jpg"
            alt="img"
            style={{width:"100%"}}
          /></div>
        <div className="slide"><img
            src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/8/1/70a3d1a4-f16a-45ca-9bb4-64dc2315352b1659297228544-Desktop-Banners_unisex-with-kids.jpg"
            alt="img"
            style={{width:"100%"}}
          /></div>
        <div className="slide"> <img
            src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/b656a7f4-4688-4997-bb7c-54b78793981e1658752386588-Western-Wear_Desk.jpg"
            alt="img"
            style={{width:"100%"}}
          /></div>
    </Slider>
    <Category/>
    <Product/>
    </>
  );
};
export default Carousel;