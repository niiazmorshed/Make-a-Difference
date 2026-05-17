import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaRegCalendarAlt, FaSearch, FaTag } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { apiDelete, apiGet } from "../../api";
import Thumbnail from "../../components/Thumbnail";
import emptyAnim from "../../No Data- 1715763454242.json";
import { AuthContext } from "../../Provider/ContextProvider";

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

const statusChip = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("approv")) return "chip chip-emerald";
  if (s.includes("reject") || s.includes("cancel")) return "chip chip-rose";
  return "chip chip-amber";
};

const MyVolReqPost = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    apiGet(`/myreq/${user.email}`)
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleCancel = (_id) => {
    Swal.fire({
      title: "Cancel this request?",
      text: "You can apply again later if you change your mind.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "Keep it",
    }).then((result) => {
      if (!result.isConfirmed) return;
      apiDelete(`/deletereq/${_id}`)
        .then((data) => {
          if (data?.deletedCount > 0) {
            Swal.fire("Cancelled", "Your request was withdrawn.", "success");
            setRequests((prev) => prev.filter((p) => p._id !== _id));
          }
        })
        .catch(() => Swal.fire("Error", "Could not cancel the request.", "error"));
    });
  };

  return (
    <div className="px-4 md:px-6 pb-20">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Requests | MAD</title>
      </Helmet>

      <header className="page-header">
        <p className="eyebrow">My applications</p>
        <h1>Your <span className="text-gradient">volunteer requests</span></h1>
        <p>Track the opportunities you&apos;ve applied to. Withdraw any time.</p>
      </header>

      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : requests.length === 0 ? (
          <div className="empty-state">
            <div className="w-48 h-48 -mb-4">
              <Lottie animationData={emptyAnim} loop={true} />
            </div>
            <h3 className="text-xl font-bold mb-1">No requests yet</h3>
            <p className="opacity-70 mb-5 max-w-md">
              Browse opportunities and apply to the ones that fit your time and
              skills.
            </p>
            <NavLink to="/needvolunteerpage">
              <button className="btn-pill-primary btn h-11 min-h-0 px-6 gap-2">
                <FaSearch /> Find opportunities
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="surface-card overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden">
                  <Thumbnail
                    src={req.Thumbnail}
                    alt={req.Post_Title}
                    category={req.Category}
                    seed={req._id}
                  />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="chip"><FaTag className="text-xs" /> {req.Category}</span>
                    <span className={statusChip(req.Status)}>{req.Status || "Requested"}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug mb-2">
                    {req.Post_Title}
                  </h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    <div className="meta-row"><FaLocationDot /> {req.Location || "Remote"}</div>
                    <div className="meta-row"><FaRegCalendarAlt /> {formatDate(req.Deadline)}</div>
                  </div>
                  {req.Suggestion && req.Suggestion !== "Enter Your Suggestions" && (
                    <p className="text-sm opacity-70 mt-3 italic">
                      &ldquo;{req.Suggestion}&rdquo;
                    </p>
                  )}
                </div>
                <div className="p-5 sm:border-l sm:border-base-200 flex sm:items-center">
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="btn-soft btn-soft-danger w-full sm:w-auto justify-center"
                  >
                    <FiX /> Cancel request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVolReqPost;
