import { NavLink } from "react-router-dom";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const slides = [
  {
    image: "https://i.ibb.co/xJBV4kN/13554-1.jpg",
    eyebrow: "Volunteer • Community • Impact",
    title: "Small actions. Real change.",
    description:
      "Make a Difference connects everyday people with local volunteer opportunities — from feeding programs to clean-up drives.",
    primaryCta: { label: "Find Opportunities", to: "/needvolunteerpage" },
    secondaryCta: { label: "How It Works", to: "#how-it-works" },
  },
  {
    image: "https://i.ibb.co/vjyn5LD/larm-rmah-AEa-TUnvneik-unsplash-1.jpg",
    eyebrow: "For Organizers",
    title: "Post a need. Find the right hands.",
    description:
      "Running a community drive or a tree-planting day? Share what you need and reach volunteers who genuinely care.",
    primaryCta: { label: "Post a Need", to: "/addvolunteerpost" },
    secondaryCta: { label: "Learn More", to: "#mission" },
  },
  {
    image: "https://i.ibb.co/FKc70T3/roman-synkevych-5w-J2-Gi-YSif-A-unsplash-1.jpg",
    eyebrow: "Built for Everyone",
    title: "No experience needed. Just willingness.",
    description:
      "Whether you have a free Saturday or a few evenings, there is a place for you. Browse causes that fit your time.",
    primaryCta: { label: "Get Started", to: "/register" },
    secondaryCta: { label: "Browse Causes", to: "#categories" },
  },
];

const Banner = () => {
  return (
    <div className="relative px-4 md:px-0">
      <Swiper
        modules={[Pagination, A11y, EffectFade, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        loop
        speed={1200}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="rounded-3xl overflow-hidden banner-swiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[480px] md:h-[600px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-end md:items-center justify-start p-6 md:p-12">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-xl shadow-xl">
                  <p className="text-xs tracking-[0.25em] uppercase text-sky-700 font-semibold mb-3">
                    {slide.eyebrow}
                  </p>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-3">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-base text-slate-700 mb-5">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {slide.primaryCta.to.startsWith("#") ? (
                      <a
                        href={slide.primaryCta.to}
                        className="btn btn-sm md:btn-md bg-sky-600 hover:bg-sky-700 text-white border-none rounded-full px-5"
                      >
                        {slide.primaryCta.label}
                      </a>
                    ) : (
                      <NavLink
                        to={slide.primaryCta.to}
                        className="btn btn-sm md:btn-md bg-sky-600 hover:bg-sky-700 text-white border-none rounded-full px-5"
                      >
                        {slide.primaryCta.label}
                      </NavLink>
                    )}
                    {slide.secondaryCta.to.startsWith("#") ? (
                      <a
                        href={slide.secondaryCta.to}
                        className="btn btn-sm md:btn-md btn-ghost rounded-full px-5 text-slate-900"
                      >
                        {slide.secondaryCta.label}
                      </a>
                    ) : (
                      <NavLink
                        to={slide.secondaryCta.to}
                        className="btn btn-sm md:btn-md btn-ghost rounded-full px-5 text-slate-900"
                      >
                        {slide.secondaryCta.label}
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
