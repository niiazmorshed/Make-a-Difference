import { NavLink, useLoaderData } from "react-router-dom";
import Banner from "../Banner/Banner";
import HomeCard from "./HomeCard";
import { Helmet } from "react-helmet";
import WeAre from "./WeAre";
const Home = () => {
  const cardInfo = useLoaderData();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home|MAD</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Banner></Banner>
      <div className="text-center mt-12 mb-12 sm :p-4">
        <h1 className="text-4xl font-semibold">Our Services</h1>
        <p className="text-2xl font-normal pt-4">
        Discover the power of giving back with MAD (Make a Difference)! Our volunteer platform connects you with local opportunities tailored to your interests. Whether you are passionate about environmental conservation, education, or social justice, there is a place for you here. Join our diverse community of changemakers and start making a difference in just 20 minutes a day. Together, lets create positive change, one action at a time!
        </p>
      </div>
      <div className="md:grid md: grid-cols-2 md:gap-10 md: mt-20">
        {cardInfo.map((i) => (
          <HomeCard key={i._id} cardDetails={i}></HomeCard>
        ))}
      </div>
      <div className="flex justify-center items-center mt-12">
        <NavLink to="/needvolunteerpage">
          <button className="btn btn-xs btn-accent sm:btn-sm md:btn-md lg:btn-lg">
            Show All
          </button>
        </NavLink>
      </div>
      <WeAre></WeAre>
    </div>
  );
};

export default Home;
