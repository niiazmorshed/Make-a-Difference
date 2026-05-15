import { NavLink, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import HomeCard from "./HomeCard";
import WeAre from "./WeAre";
import Mission from "./Mission";
import HowItWorks from "./HowItWorks";
import ImpactStats from "./ImpactStats";
import Categories from "./Categories";
import CallToAction from "./CallToAction";
import FAQ from "./FAQ";
import ScrollProgress from "./ScrollProgress";

const Home = () => {
  const cardInfo = useLoaderData();
  const featured = Array.isArray(cardInfo) ? cardInfo.slice(0, 6) : [];

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MAD — Volunteer Where It Matters</title>
        <link rel="canonical" href="https://make-a-difference-90f54.web.app" />
      </Helmet>

      <ScrollProgress />

      <div className="pt-6 pb-4">
        <Banner />
      </div>

      <Mission />

      <HowItWorks />

      <ImpactStats />

      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            data-aos="fade-up"
          >
            <div>
              <p className="text-sm tracking-[0.25em] uppercase text-emerald-600 font-semibold mb-3">
                Featured Opportunities
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Causes that need <span className="text-gradient">you</span> this
                week.
              </h2>
            </div>
            <p className="md:max-w-md md:text-right opacity-80">
              Hand-picked volunteer posts from organizers across the country.
              See something that fits? Tap in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((i) => (
              <HomeCard key={i._id} cardDetails={i} />
            ))}
          </div>

          <div className="flex justify-center mt-12" data-aos="fade-up">
            <NavLink to="/needvolunteerpage">
              <button className="btn btn-accent rounded-full px-8 text-white">
                See all opportunities
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      <Categories />

      <WeAre />

      <FAQ />

      <CallToAction />
    </div>
  );
};

export default Home;
