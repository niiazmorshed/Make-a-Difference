import { useContext } from "react";
import { Helmet } from "react-helmet";
import {
  FaArrowLeft,
  FaEnvelope,
  FaRegCalendarAlt,
  FaTag,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiSend } from "../../api";
import Thumbnail from "../../components/Thumbnail";
import { AuthContext } from "../../Provider/ContextProvider";
import { canonicalFor } from "../../site";

const formatDate = (d) => {
  if (!d) return "Flexible";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const VolunteerNeedPostDetails = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const info = Array.isArray(data) ? data.find((i) => i._id === id) : null;

  if (!info) {
    return (
      <div className="px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Post not found</h1>
        <p className="opacity-70 mb-6">
          This opportunity may have been removed or filled.
        </p>
        <NavLink to="/needvolunteerpage">
          <button className="btn-pill-primary btn h-11 min-h-0 px-6">
            Back to opportunities
          </button>
        </NavLink>
      </div>
    );
  }

  const spotsLeft = Number(info.NoOfVolunteers) || 0;

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const newRequest = {
      _id: id,
      Thumbnail: info.Thumbnail,
      Post_Title: info.Post_Title,
      Category: info.Category,
      Location: info.Location,
      NoOfVolunteers: spotsLeft,
      Deadline: info.Deadline,
      OrganizerName: info.Name,
      OrganizerEmail: info.Email,
      Description: info.Description,
      Email: user?.email,
      Name: user?.displayName,
      Suggestion: form.suggestion.value,
      Status: "Requested",
    };

    apiSend("/request", newRequest)
      .then((data) => {
        if (data?.insertedId) {
          document.getElementById("modal")?.close();
          Swal.fire({
            title: "You're in!",
            text: "Your request was sent to the organizer.",
            icon: "success",
            confirmButtonText: "Great",
          });
        }
      })
      .catch(() =>
        Swal.fire("Something went wrong", "Please try again in a moment.", "error")
      );
  };

  return (
    <div className="px-4 md:px-6 py-10 md:py-14">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{info.Post_Title} | MAD</title>
        <link rel="canonical" href={canonicalFor(`/volunteerneedpostdetails/${id}`)} />
      </Helmet>

      <button
        onClick={() => navigate(-1)}
        className="btn-soft mb-6 inline-flex items-center"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="surface-card overflow-hidden">
            <div className="w-full h-72 md:h-[420px]">
              <Thumbnail
                src={info.Thumbnail}
                alt={info.Post_Title}
                category={info.Category}
                seed={info._id}
              />
            </div>
          </div>

          <div className="surface-card p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="chip"><FaTag className="text-xs" /> {info.Category}</span>
              <span className="chip chip-amber">
                <FaLocationDot className="text-xs" /> {info.Location || "Remote"}
              </span>
              <span className="chip chip-emerald">
                <FaRegCalendarAlt className="text-xs" /> {formatDate(info.Deadline)}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3">
              {info.Post_Title}
            </h1>
            <p className="opacity-80 leading-relaxed whitespace-pre-line">
              {info.Description}
            </p>
          </div>

          <div className="surface-card p-6 md:p-8">
            <h2 className="text-lg font-bold mb-4">Organizer</h2>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl">
                <FaUserAlt />
              </div>
              <div>
                <p className="font-semibold text-lg">{info.Name}</p>
                <a
                  href={`mailto:${info.Email}`}
                  className="meta-row text-sky-600 hover:underline"
                >
                  <FaEnvelope /> {info.Email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky apply card */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="surface-card p-6 md:p-7 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] opacity-60 font-semibold mb-1">
                Volunteers needed
              </p>
              <p className="text-4xl font-extrabold">
                {spotsLeft}
                <span className="text-base opacity-60 font-medium"> open spot{spotsLeft === 1 ? "" : "s"}</span>
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-base-200">
              <div className="meta-row"><FaRegCalendarAlt /> Deadline: <strong className="ml-1">{formatDate(info.Deadline)}</strong></div>
              <div className="meta-row"><FaLocationDot /> {info.Location || "Remote"}</div>
              <div className="meta-row"><FaTag /> {info.Category}</div>
              <div className="meta-row"><FaUsers /> Organized by {info.Name}</div>
            </div>

            {spotsLeft > 0 ? (
              <button
                onClick={() => document.getElementById("modal").showModal()}
                className="btn-pill-primary btn w-full h-12 min-h-0"
              >
                Be a volunteer
              </button>
            ) : (
              <div className="text-center py-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold">
                All spots filled — check back soon
              </div>
            )}

            <p className="text-xs opacity-60 text-center">
              Free to apply. The organizer will reach out via email.
            </p>
          </div>
        </aside>
      </div>

      {/* Apply modal */}
      <dialog id="modal" className="modal">
        <div className="modal-box max-w-2xl bg-base-100 p-0 rounded-2xl">
          <div className="p-6 md:p-8 border-b border-base-200">
            <h2 className="text-2xl font-bold">Confirm your application</h2>
            <p className="opacity-70 text-sm mt-1">
              You&apos;re applying to <strong>{info.Post_Title}</strong>. Add a short note
              for the organizer below.
            </p>
          </div>

          <form onSubmit={handleRequest} className="p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="field-label">Your name</label>
                <input
                  defaultValue={user?.displayName || ""}
                  name="username"
                  className="field-input"
                  readOnly
                />
              </div>
              <div>
                <label className="field-label">Your email</label>
                <input
                  defaultValue={user?.email || ""}
                  name="email"
                  className="field-input"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="field-label">Suggestion / note to organizer</label>
              <textarea
                name="suggestion"
                placeholder="Anything you'd like the organizer to know? (optional)"
                className="field-input field-textarea"
                defaultValue=""
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="btn-pill-primary btn h-12 min-h-0 px-6 flex-1"
              >
                Submit request
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("modal").close()}
                className="btn-pill-ghost btn h-12 min-h-0 px-6"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default VolunteerNeedPostDetails;
