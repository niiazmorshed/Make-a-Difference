import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { apiSend } from "../../api";
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

const AddVolunteerPost = () => {
  const { user } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPost = {
      Post_Title: form.post_title.value.trim(),
      Category: form.category.value,
      Location: form.location.value.trim(),
      NoOfVolunteers: parseInt(form.no_of_volunteers_needed.value, 10),
      Deadline: form.deadline.value,
      OrganizerName: form.organizer_name.value.trim(),
      OrganizerEmail: form.organizer_email.value.trim(),
      Description: form.description.value.trim(),
      Email: user?.email,
      Name: user?.displayName,
    };

    setSubmitting(true);
    apiSend("/volunteer", newPost)
      .then((data) => {
        if (data?.insertedId) {
          Swal.fire({
            title: "Posted",
            text: "Your volunteer post is now live.",
            icon: "success",
            confirmButtonText: "Okay",
          });
          form.reset();
        }
      })
      .catch(() =>
        Swal.fire("Something went wrong", "Please try again.", "error")
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="px-4 md:px-6 pb-20">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Volunteer Post | MAD</title>
      </Helmet>

      <header className="page-header">
        <p className="eyebrow">Organizer</p>
        <h1>Post a <span className="text-gradient">volunteer need</span></h1>
        <p>
          Fill in the details below. Clear, specific posts attract the right
          volunteers and fill faster.
        </p>
      </header>

      <form
        onSubmit={handleAddPost}
        className="max-w-3xl mx-auto surface-card p-6 md:p-8 space-y-5"
      >
        <div>
          <label className="field-label" htmlFor="post_title">Post title</label>
          <input
            id="post_title"
            type="text"
            name="post_title"
            placeholder="e.g. Volunteers needed for beach cleanup"
            className="field-input"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="field-label" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="field-input"
              required
              defaultValue=""
            >
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="e.g. Gulshan, Dhaka"
              className="field-input"
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="no_of_volunteers_needed">
              Number of volunteers needed
            </label>
            <input
              id="no_of_volunteers_needed"
              type="number"
              name="no_of_volunteers_needed"
              min="1"
              placeholder="e.g. 5"
              className="field-input"
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="deadline">Deadline</label>
            <input
              id="deadline"
              type="date"
              name="deadline"
              className="field-input"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="field-label" htmlFor="organizer_name">Organizer name</label>
            <input
              id="organizer_name"
              type="text"
              name="organizer_name"
              placeholder="Organization or contact name"
              className="field-input"
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="organizer_email">Organizer email</label>
            <input
              id="organizer_email"
              type="email"
              name="organizer_email"
              placeholder="contact@organization.com"
              className="field-input"
              required
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="What will volunteers do? When and where? What should they bring?"
            className="field-input field-textarea"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5 pt-2 border-t border-base-200">
          <div>
            <label className="field-label">Posted by</label>
            <input
              defaultValue={user?.displayName || ""}
              className="field-input"
              readOnly
            />
          </div>
          <div>
            <label className="field-label">Your email</label>
            <input
              defaultValue={user?.email || ""}
              className="field-input"
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
          <button
            type="reset"
            className="btn-pill-ghost btn h-12 min-h-0 px-8"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn-pill-primary btn h-12 min-h-0 px-8"
          >
            {submitting ? "Posting…" : "Publish post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVolunteerPost;
