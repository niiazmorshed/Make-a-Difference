import { RxLapTimer } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const HomeCard = ({ cardDetails }) => {
  const { _id, Thumbnail, Post_Title, Category, Deadline } = cardDetails;
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2000"
      className="sm: p-4 sm: m-4 card bg-base-100 shadow-lg"
    >
      <figure className=" max-h-72  min-w-72">
        <img src={Thumbnail} />
      </figure>
      <div>
        <div className="pl-4 my-4  max-h-30 ">
          <h2 className="text-3xl font-semibold">{Post_Title}</h2>
          <div className="flex justify-between mt-4"></div>
        </div>
        <div className="flex p-4 justify-between ">
          <div className="text-xl font-normal">
            <p> {Category}</p>
          </div>
          <div className="flex items-center gap-2 align-middle">
            <RxLapTimer className="text-xl"></RxLapTimer>
            <p className="font-bold">{Deadline}</p>
          </div>
        </div>
        <hr className="border-dashed" />
      </div>
      <div className="flex items-center justify-center p-4">
        <NavLink to={`/volunteerneedpostdetails/${_id}`}>
          <button className="btn btn-outline btn-accent">View Details</button>
        </NavLink>
      </div>
      
    </div>
  );
};

export default HomeCard;
