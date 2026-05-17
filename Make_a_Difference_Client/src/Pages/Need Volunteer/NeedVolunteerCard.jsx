import { FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Thumbnail from "../../components/Thumbnail";
import { placeholderGradient, placeholderLabel } from "../../utils/thumbnail";

const formatDate = (d) => {
  if (!d) return "Flexible";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Compact relative-deadline pill. Returns null if no parseable deadline.
const deadlineState = (d) => {
  if (!d) return null;
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const days = Math.round((target - today) / (1000 * 60 * 60 * 24));

  if (days < 0) return { label: "Closed", variant: "expired" };
  if (days === 0) return { label: "Closes today", variant: "urgent" };
  if (days === 1) return { label: "1 day left", variant: "urgent" };
  if (days <= 7) return { label: `${days} days left`, variant: "urgent" };
  if (days <= 30) return { label: `${days} days left`, variant: "" };
  return { label: formatDate(d), variant: "" };
};

const NeedVolunteerCard = ({ needCard, layout = "grid" }) => {
  const {
    _id,
    Thumbnail: thumb,
    Post_Title,
    Category,
    Deadline,
    Location,
    NoOfVolunteers,
    Description,
    OrganizerName,
    Name,
  } = needCard;

  const organizer = OrganizerName || Name || "Organizer";
  const deadline = deadlineState(Deadline);
  const isClosed = deadline?.variant === "expired" || NoOfVolunteers === 0;
  const avatarStyle = {
    background: placeholderGradient(organizer),
  };
  const avatarInitials = placeholderLabel(organizer);

  if (layout === "list") {
    return (
      <NavLink
        to={`/volunteerneedpostdetails/${_id}`}
        data-aos="fade-up"
        className={`opp-card flex-col sm:flex-row ${isClosed ? "is-closed" : ""}`}
      >
        <div className="opp-card-media sm:!h-auto sm:w-64 shrink-0">
          <Thumbnail src={thumb} alt={Post_Title} category={Category} seed={_id} />
          <div className="opp-card-badges">
            <span className="opp-card-cat">{Category}</span>
            {NoOfVolunteers > 0 ? (
              <span className="opp-card-spots">
                {NoOfVolunteers} spot{NoOfVolunteers === 1 ? "" : "s"}
              </span>
            ) : (
              <span className="opp-card-spots full">Full</span>
            )}
          </div>
          {deadline && (
            <span className={`opp-card-deadline ${deadline.variant}`}>
              <FaRegCalendarAlt /> {deadline.label}
            </span>
          )}
        </div>
        <div className="opp-card-body flex-1">
          <h3 className="opp-card-title">{Post_Title}</h3>
          {Description && <p className="opp-card-desc">{Description}</p>}
          <div className="meta-row mt-3"><FaLocationDot /> {Location || "Remote"}</div>
          <div className="opp-card-divider" />
          <div className="flex items-center justify-between gap-3">
            <div className="opp-card-organizer min-w-0">
              <span className="opp-avatar" style={avatarStyle}>{avatarInitials}</span>
              <div className="min-w-0">
                <p className="opp-card-organizer-label">Organizer</p>
                <p className="opp-card-organizer-name">{organizer}</p>
              </div>
            </div>
            <span className="opp-card-cta w-auto px-5">
              View <FaArrowRightLong className="opp-card-cta-arrow" />
            </span>
          </div>
        </div>
      </NavLink>
    );
  }

  return (
    <NavLink
      to={`/volunteerneedpostdetails/${_id}`}
      data-aos="fade-up"
      data-aos-duration="700"
      className={`opp-card ${isClosed ? "is-closed" : ""}`}
    >
      <div className="opp-card-media">
        <Thumbnail src={thumb} alt={Post_Title} category={Category} seed={_id} />
        <div className="opp-card-badges">
          <span className="opp-card-cat">{Category}</span>
          {NoOfVolunteers > 0 ? (
            <span className="opp-card-spots">
              {NoOfVolunteers} spot{NoOfVolunteers === 1 ? "" : "s"}
            </span>
          ) : (
            <span className="opp-card-spots full">Full</span>
          )}
        </div>
        {deadline && (
          <span className={`opp-card-deadline ${deadline.variant}`}>
            <FaRegCalendarAlt /> {deadline.label}
          </span>
        )}
      </div>

      <div className="opp-card-body">
        <h3 className="opp-card-title">{Post_Title}</h3>
        {Description && <p className="opp-card-desc">{Description}</p>}

        <div className="meta-row mt-4">
          <FaLocationDot /> {Location || "Remote"}
        </div>

        <div className="opp-card-divider" />

        <div className="opp-card-organizer">
          <span className="opp-avatar" style={avatarStyle}>{avatarInitials}</span>
          <div className="min-w-0">
            <p className="opp-card-organizer-label">Organizer</p>
            <p className="opp-card-organizer-name">{organizer}</p>
          </div>
        </div>

        <span className="opp-card-cta">
          View details <FaArrowRightLong className="opp-card-cta-arrow" />
        </span>
      </div>
    </NavLink>
  );
};

export default NeedVolunteerCard;
