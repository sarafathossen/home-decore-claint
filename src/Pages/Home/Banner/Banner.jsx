import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerIMG1 from '../../../assets/banner/banner1.png'
import bannerIMG2 from '../../../assets/banner/banner2.png'
import bannerIMG3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
        <Carousel  autoPlay={true} infiniteLoop={true} >
            <div className=' h-[400px] cover'>
                <img src={bannerIMG1} />
                
            </div>
            <div className=' h-[400px] '>
                <img src={bannerIMG2} />
                
            </div>
            <div className=' h-[400px] '>
                <img src={bannerIMG3}/>
               
            </div>
        </Carousel>
    );
};

export default Banner;