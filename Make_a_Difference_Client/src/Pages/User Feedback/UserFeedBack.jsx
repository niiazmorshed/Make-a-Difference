import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaQuoteLeft, FaRegCommentDots, FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { apiGet, apiSend } from "../../api";
import { AuthContext } from "../../Provider/ContextProvider";
import { canonicalFor } from "../../site";

const UserFeedBack = () => {
  const { user, loading } = useContext(AuthContext);
  const [feeds, setFeeds] = useState([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchFeeds = () => {
    setFetching(true);
    apiGet("/feeds")
      .then((data) => setFeeds(Array.isArray(data) ? data.reverse() : []))
      .finally(() => setFetching(false));
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (!user?.email) {
      Swal.fire("Sign in needed", "Please sign in to leave feedback.", "info");
      return;
    }

    setSubmitting(true);
    apiSend("/feedback", { feedback: text.trim(), email: user.email })
      .then((data) => {
        if (data?.insertedId) {
          Swal.fire({
            title: "Thanks!",
            text: "Your feedback was sent.",
            icon: "success",
            confirmButtonText: "Okay",
            timer: 1800,
            showConfirmButton: false,
          });
          setText("");
          fetchFeeds();
        }
      })
      .catch(() => Swal.fire("Error", "Could not send feedback.", "error"))
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 pb-20">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Feedback | MAD</title>
        <link rel="canonical" href={canonicalFor("/userfeedback")} />
      </Helmet>

      <header className="page-header">
        <p className="eyebrow">We&apos;re listening</p>
        <h1>Help us <span className="text-gradient">make it better</span></h1>
        <p>
          Tell us what&apos;s working, what isn&apos;t, or what you wish existed.
          Every note shapes what we build next.
        </p>
      </header>

      <div className="max-w-3xl mx-auto surface-card p-6 md:p-8 mb-12">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="field-label">Your feedback</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts, ideas, or anything we should know…"
              className="field-input field-textarea"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs opacity-70">
              Posted as <strong>{user?.email || "guest"}</strong>
            </p>
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="btn-pill-primary btn h-11 min-h-0 px-6 gap-2"
            >
              <FaRegCommentDots /> {submitting ? "Sending…" : "Send feedback"}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl font-bold">Recent feedback</h2>
          <span className="text-sm opacity-70">{feeds.length} note{feeds.length === 1 ? "" : "s"}</span>
        </div>

        {fetching ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : feeds.length === 0 ? (
          <div className="empty-state">
            <FaRegCommentDots className="text-4xl opacity-50 mb-3" />
            <h3 className="text-lg font-bold">Be the first to share</h3>
            <p className="opacity-70 max-w-md mt-1">
              No feedback yet — yours will be the first.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {feeds.map((f) => (
              <article
                key={f._id}
                className="surface-card p-5"
              >
                <FaQuoteLeft className="text-xl text-sky-500/60 mb-3" />
                <p className="opacity-85 leading-relaxed">{f.feedback}</p>
                <div className="mt-4 pt-4 border-t border-base-200 flex items-center gap-2 text-sm opacity-70">
                  <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                    <FaUserAlt className="text-xs" />
                  </span>
                  <span className="truncate">{f.email}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFeedBack;
