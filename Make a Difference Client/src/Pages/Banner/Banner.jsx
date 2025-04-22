import "animate.css";
import {
  A11y,
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const Banner = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      effect="fade"
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide >
        <section className="banner1 ">
          <section className="pt-32">
            <div className="md: flex flex-col justify-center text-center items-center gap-6 md:pt-6">
              <h1 className="animate__animated animate__zoomIn md:text-5xl sm: text-lg text-white font-extrabold md: w-3/5 text-center leading-snug">
                Discover Explore And Wonder with MAD
              </h1>
              <p className="animate__animated animate__lightSpeedInRight font-normal text-white md:text-lg md:w-1/2">
                Join Us in Making a Difference Through Volunteerism!
              </p>
              <div className="animate__animated animate__lightSpeedInLeft flex gap-6">
                <button className="btn btn-success rounded-2xl">
                  Explore And Now
                </button>
                <button className="btn btn-outline btn-primary rrounded-2xl">
                  Our Feedback
                </button>
              </div>
            </div>
          </section>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="banner2">
          <section className="pt-24">
            <div className="md: flex flex-col justify-center text-center items-center gap-6 md:pt-6">
              <h1 className="animate__animated animate__zoomIn md:text-5xl sm: text-lg text-white font-extrabold md: w-3/5 text-center leading-snug">
                Discover Explore And Wonder with MAD
              </h1>
              <p className="animate__animated animate__lightSpeedInRight font-normal text-white md:text-lg md:w-1/2">
                Join Us in Making a Difference Through Volunteerism!
              </p>
              <div className="animate__animated animate__lightSpeedInLeft flex gap-6">
                <button className="btn btn-success rounded-2xl">
                  Explore And Now
                </button>
                <button className="btn btn-outline btn-primary rrounded-2xl">
                  Our Feedback
                </button>
              </div>
            </div>
          </section>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="banner3">
          <section className="pt-24">
            <div className="md: flex flex-col justify-center text-center items-center gap-6 md:pt-6">
              <h1 className="animate__animated animate__zoomIn md:text-5xl sm: text-lg text-white font-extrabold md: w-3/5 text-center leading-snug">
                Discover Explore And Wonder with MAD
              </h1>
              <p className="animate__animated animate__lightSpeedInRight font-normal text-white md:text-lg md:w-1/2">
                Join Us in Making a Difference Through Volunteerism!
              </p>
              <div className="animate__animated animate__lightSpeedInLeft flex gap-6">
                <button className="btn btn-success rounded-2xl">
                  Explore And Now
                </button>
                <button className="btn btn-outline btn-primary rrounded-2xl">
                  Our Feedback
                </button>
              </div>
            </div>
          </section>
        </section>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
