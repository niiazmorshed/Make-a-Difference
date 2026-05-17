import { FaRegCalendarAlt, FaTag } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Thumbnail from "../../components/Thumbnail";

const HomeCard = ({ cardDetails }) => {
  const { _id, Thumbnail: thumb, Post_Title, Category, Deadline } = cardDetails;
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="900"
      className="lift-on-hover card bg-base-100 border border-base-200 shadow-md overflow-hidden"
    >
      <figure className="h-52 overflow-hidden">
        <Thumbnail
          src={thumb}
          alt={Post_Title}
          category={Category}
          seed={_id}
          className="transition-transform duration-500 hover:scale-105"
        />
      </figure>
      <div className="p-6">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-sky-600 bg-sky-100 rounded-full px-3 py-1">
          <FaTag /> {Category}
        </span>
        <h3 className="text-xl font-bold mt-4 line-clamp-2 min-h-[3.5rem]">
          {Post_Title}
        </h3>
        <div className="flex items-center gap-2 mt-3 text-sm opacity-80">
          <FaRegCalendarAlt />
          <span>Deadline: {Deadline}</span>
        </div>
        <div className="mt-5">
          <NavLink to={`/volunteerneedpostdetails/${_id}`}>
            <button className="btn btn-outline btn-accent btn-sm rounded-full px-5">
              View Details
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
