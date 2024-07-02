import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import review from "../../Animation - 1714467221537.json";
import { IoStarSharp } from "react-icons/io5";

const Review = () => {
  return (
<div className="md: flex flex-col justify-center items-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Review|MAD</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="md: w-[500px] ">
        <Lottie animationData={review} loop={true}></Lottie>
      </div>
      {/* Card --- */}
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="md: grid md:grid-cols-3 md: gap-4 mt-20 sm:grid-cols-1"
      >
        <div className="card md:w-96 bg-base-100 shadow-xl">
          <figure className=" rounded-full ">
            <img src="https://i.ibb.co/9b7XsgL/wallpaperflare-com-wallpaper-2.jpg" />
          </figure>
          <div className="card-body">
            <h1 className="text-center text-xl font-bold">Thomas Shelby</h1>
            <div className="flex justify-center items-center">
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
            </div>
            <div>
              <p>
                I am Thomas Shelby <br />
                I stumbled upon MAD while searching for volunteer opportunities in my area, and I am so glad I did! The website is incredibly user-friendly, making it easy to find volunteer opportunities that match my interests and schedule. The variety of projects available is impressive, and the registration process was seamless. I have already participated in several events and met wonderful people along the way. Thank you for providing such a valuable platform for community engagement!.
              </p>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className=" rounded-full ">
            <img src="https://i.ibb.co/N64tgkY/HD-wallpaper-robert-pattinson-batman-3d-model.jpg" />
          </figure>
          <div className="card-body">
            <h1 className="text-center text-xl font-bold">Bruce Wayne</h1>
            <div className="flex justify-center items-center">
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
            </div>
            <div>
              <p>
                I am Bruce Wayne <br />
                As someone deeply invested in community development, I have had the pleasure of collaborating with MAD on various initiatives. Their website serves as a hub for bringing together volunteers and organizations in need, streamlining the process of organizing and participating in community projects. The team behind the platform is dedicated and responsive, ensuring that both volunteers and organizations receive the support they need. MAD has become an indispensable tool in our efforts to create a stronger, more connected community.
              </p>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className=" rounded-full ">
            <img src="https://i.ibb.co/HVsyCjh/wallpaperflare-com-wallpaper-1-1.jpg" />
          </figure>
          <div className="card-body">
            <h1 className="text-center text-xl font-bold">King Ragnar</h1>
            <div className="flex justify-center items-center">
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
              <IoStarSharp />
            </div>
            <div>
              <p>
                I am Ragnar Lothbrok <br />
                I recently decided to start volunteering but did not know where to begin. Thankfully, I came across MAD website, and it has been a game-changer for me. The website is so intuitive, guiding me through the process of finding volunteer opportunities that match my interests and availability. I love how I can track my volunteer hours and connect with other volunteers through the platform. It has been an enriching experience so far, and I am excited to continue my journey with MAD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
