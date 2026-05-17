import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaPlus, FaRegCalendarAlt, FaTag } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { apiDelete, apiGet, apiPut } from "../../api";
import Thumbnail from "../../components/Thumbnail";
import emptyAnim from "../../No Data- 1715763454242.json";
import { AuthContext } from "../../Provider/ContextProvider";

const CATEGORIES = [
  "Healthcare",
  "Education",
  "Social Service",
  "Environmental Conservation",
  "Animal Welfare",
  "Disaster Relief",
  "Community Development",
  "Other",
];

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

const SkeletonCard = () => (
  <div className="surface-card overflow-hidden">
    <div className="skeleton-block h-44" />
    <div className="p-5 space-y-3">
      <div className="skeleton-block h-4 w-1/3" />
      <div className="skeleton-block h-5 w-3/4" />
      <div className="skeleton-block h-4 w-1/2" />
    </div>
  </div>
);

const ManageMyPost = () => {
  const { user } = useContext(AuthContext);
  const [personalData, setPersonalData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    apiGet(`/volunteer/${user.email}`)
      .then((data) => setPersonalData(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const openEdit = (post) => {
    setEditing(post);
    setTimeout(() => document.getElementById("update-modal")?.showModal(), 0);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const update = {
      Thumbnail: editing.Thumbnail || "",
      Post_Title: form.post_title.value.trim(),
      Category: form.category.value,
      Location: form.location.value.trim(),
      NoOfVolunteers: parseInt(form.no_of_volunteers_needed.value, 10),
      Deadline: form.deadline.value,
      OrganizerName: form.organizer_name.value.trim(),
      OrganizerEmail: form.organizer_email.value.trim(),
      Description: form.description.value.trim(),
      Email: editing.Email,
      Name: editing.Name,
    };

    apiPut(`/updatevol/${editing._id}`, update)
      .then((data) => {
        if (data?.modifiedCount > 0 || data?.upsertedId) {
          Swal.fire({
            title: "Updated",
            text: "Your post has been updated.",
            icon: "success",
            confirmButtonText: "Okay",
          });
          setPersonalData((prev) =>
            prev.map((p) => (p._id === editing._id ? { ...p, ...update } : p))
          );
          document.getElementById("update-modal")?.close();
        }
      })
      .catch(() => Swal.fire("Error", "Could not update the post.", "error"));
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Delete this post?",
      text: "This can't be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (!result.isConfirmed) return;
      apiDelete(`/deletevol/${_id}`)
        .then((data) => {
          if (data?.deletedCount > 0) {
            Swal.fire("Deleted", "Your post is gone.", "success");
            setPersonalData((prev) => prev.filter((p) => p._id !== _id));
          }
        })
        .catch(() => Swal.fire("Error", "Could not delete the post.", "error"));
    });
  };

  return (
    <div className="px-4 md:px-6 pb-20">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Posts | MAD</title>
      </Helmet>

      <header className="page-header">
        <p className="eyebrow">Manage</p>
        <h1>Your <span className="text-gradient">volunteer posts</span></h1>
        <p>
          Edit details, update the number of volunteers needed, or remove posts
          you&apos;ve filled.
        </p>
      </header>

      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <p className="text-sm opacity-70">
          {loading ? "Loading…" : `${personalData.length} post${personalData.length === 1 ? "" : "s"}`}
        </p>
        <NavLink to="/addvolunteerpost">
          <button className="btn-pill-primary btn h-11 min-h-0 px-5 gap-2">
            <FaPlus /> New post
          </button>
        </NavLink>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : personalData.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <div className="empty-state">
            <div className="w-48 h-48 -mb-4">
              <Lottie animationData={emptyAnim} loop={true} />
            </div>
            <h3 className="text-xl font-bold mb-1">No posts yet</h3>
            <p className="opacity-70 mb-5 max-w-md">
              Create your first volunteer post and start reaching people who care
              about the same cause.
            </p>
            <NavLink to="/addvolunteerpost">
              <button className="btn-pill-primary btn h-11 min-h-0 px-6 gap-2">
                <FaPlus /> Create a post
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {personalData.map((post) => (
            <div key={post._id} className="surface-card overflow-hidden flex flex-col">
              <div className="h-44 overflow-hidden">
                <Thumbnail
                  src={post.Thumbnail}
                  alt={post.Post_Title}
                  category={post.Category}
                  seed={post._id}
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="chip mb-3 self-start"><FaTag className="text-xs" /> {post.Category}</span>
                <h3 className="text-lg font-bold leading-snug line-clamp-2 min-h-[3rem]">
                  {post.Post_Title}
                </h3>
                <div className="mt-3 space-y-1.5">
                  <div className="meta-row"><FaLocationDot /> {post.Location || "Remote"}</div>
                  <div className="meta-row"><FaRegCalendarAlt /> {formatDate(post.Deadline)}</div>
                </div>
                <div className="mt-5 pt-4 border-t border-base-200 flex gap-2">
                  <button
                    onClick={() => openEdit(post)}
                    className="btn-soft btn-soft-accent flex-1 justify-center"
                  >
                    <FiEdit2 /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn-soft btn-soft-danger justify-center"
                    aria-label="Delete post"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update modal */}
      <dialog id="update-modal" className="modal">
        <div className="modal-box max-w-3xl p-0 rounded-2xl bg-base-100">
          <div className="p-6 md:p-8 border-b border-base-200">
            <h2 className="text-2xl font-bold">Update your post</h2>
            <p className="opacity-70 text-sm mt-1">
              Make changes below — they go live immediately.
            </p>
          </div>

          {editing && (
            <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-5">
              <div>
                <label className="field-label" htmlFor="upd-post-title">Post title</label>
                <input
                  id="upd-post-title"
                  defaultValue={editing.Post_Title}
                  name="post_title"
                  className="field-input"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="field-label" htmlFor="upd-category">Category</label>
                  <select
                    id="upd-category"
                    defaultValue={editing.Category || ""}
                    name="category"
                    className="field-input"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="upd-location">Location</label>
                  <input
                    id="upd-location"
                    defaultValue={editing.Location}
                    name="location"
                    className="field-input"
                    required
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="upd-vols">Volunteers needed</label>
                  <input
                    id="upd-vols"
                    defaultValue={editing.NoOfVolunteers}
                    name="no_of_volunteers_needed"
                    type="number"
                    min="0"
                    className="field-input"
                    required
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="upd-deadline">Deadline</label>
                  <input
                    id="upd-deadline"
                    defaultValue={editing.Deadline}
                    name="deadline"
                    type="date"
                    className="field-input"
                    required
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="upd-org-name">Organizer name</label>
                  <input
                    id="upd-org-name"
                    defaultValue={editing.OrganizerName || editing.Name}
                    name="organizer_name"
                    className="field-input"
                    required
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="upd-org-email">Organizer email</label>
                  <input
                    id="upd-org-email"
                    defaultValue={editing.OrganizerEmail || editing.Email}
                    name="organizer_email"
                    type="email"
                    className="field-input"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="field-label" htmlFor="upd-description">Description</label>
                <textarea
                  id="upd-description"
                  defaultValue={editing.Description}
                  name="description"
                  className="field-input field-textarea"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="submit" className="btn-pill-primary btn h-12 min-h-0 px-6 flex-1">
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("update-modal").close()}
                  className="btn-pill-ghost btn h-12 min-h-0 px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageMyPost;
