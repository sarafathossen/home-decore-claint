import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png'
import amazon_Vector from '../../../assets/brands/amazon_vector.png'
import Casio from '../../../assets/brands/casio.png'
import MoonStar from '../../../assets/brands/moonstar.png'
import RanStad from '../../../assets/brands/randstad.png'
import Star from '../../../assets/brands/star.png'
import Start_People from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';


const brandLogos = [amazon, amazon_Vector, Casio, MoonStar, RanStad, Star, Start_People]


const Brands = () => {
    return (
        <Swiper
            loop={true}
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            modules={[Autoplay]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
        >
            {
                brandLogos.map((logo, index) => <SwiperSlide key={index}> <img src={logo} alt="" /> </SwiperSlide>)
            }



        </Swiper>
    );
};

export default Brands;