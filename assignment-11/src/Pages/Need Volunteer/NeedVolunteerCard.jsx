import { BsStopwatch } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const NeedVolunteerCard = ({ needCard }) => {
  const { _id, Thumbnail, Post_Title, Category, Deadline,Location } = needCard;
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2000"
      className=" sm: p-4 sm: m-4 card bg-base-100 shadow-lg shadow-red-700/50"
    >
      <figure>
        <img src={Thumbnail} />
      </figure>
      <div>
        <div className="pl-4 my-2 ">
          <h2 className="text-2xl font-semibold">{Post_Title}</h2>
          <p className="text-yellow-800 font-medium ">{Category}</p>
        </div>
        <div className="flex p-4 justify-between">
          <div className="flex items-center align-middle">
          <BsStopwatch className="text-xl mr-2"></BsStopwatch>
            <p className="font-bold">{Deadline}</p>
          </div>
          <div className="flex items-center align-middle">
            <FaLocationDot></FaLocationDot>
            <p className="font-bold">{Location}</p>
          </div>
        </div>
        <hr className="border-dashed" />
      </div>
      <div className="flex justify-center  p-4">
        <NavLink to={`/volunteerneedpostdetails/${_id}`}>
          <button className="btn btn-outline btn-accent">View Details</button>
        </NavLink>
      </div>
    </div>
  );
};

export default NeedVolunteerCard;
