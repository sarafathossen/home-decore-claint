import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewsCard from './ReviewsCard';

const Reviews = ({ reviewsPrommise }) => {
    const reviews = use(reviewsPrommise)
    console.log(reviews)
    return (
        <div className="my-24">
            <div className="text-center mb-24">
                <h3 className='text-3xl text-center font-bold my-8 '>Review</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, consectetur exercitationem, perferendis quisquam architecto, possimus voluptas labore vitae minus error a laudantium dignissimos! Asperiores adipisci voluptas, quas aliquam quis ipsam!</p>
            </div>

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'3'}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <ReviewsCard review={review} ></ReviewsCard>
                    </SwiperSlide>)
                }

            </Swiper>

        </div>
    );
};

export default Reviews;