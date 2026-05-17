import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import { FiGrid, FiList, FiSearch, FiX } from "react-icons/fi";
import NeedVolunteerCard from "./NeedVolunteerCard";

const NeedVolunteer = () => {
  const data = useLoaderData();
  const allPosts = Array.isArray(data) ? data : [];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [layout, setLayout] = useState("grid");

  const categories = useMemo(() => {
    const set = new Set(allPosts.map((p) => (p.Category || "").trim()).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [allPosts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts.filter((p) => {
      const matchesCategory =
        category === "All" || (p.Category || "").trim() === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        (p.Post_Title || "").toLowerCase().includes(q) ||
        (p.Location || "").toLowerCase().includes(q) ||
        (p.Category || "").toLowerCase().includes(q)
      );
    });
  }, [allPosts, query, category]);

  return (
    <div className="px-4 md:px-6 pb-20">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Opportunities | MAD</title>
      </Helmet>

      <header className="page-header">
        <p className="eyebrow">Volunteer Opportunities</p>
        <h1>
          Find a cause that <span className="text-gradient">moves you</span>
        </h1>
        <p>
          Browse open needs from organizers across the country. Filter by
          category, search by title or location, and apply in one click.
        </p>
      </header>

      <div className="surface-card p-4 md:p-5 max-w-5xl mx-auto -mt-2 mb-10">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, location, or category…"
              className="field-input pl-10 pr-10"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
              >
                <FiX />
              </button>
            )}
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="field-input md:w-56"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="hidden md:flex items-center gap-1 border border-base-300 rounded-lg p-1">
            <button
              onClick={() => setLayout("grid")}
              aria-label="Grid view"
              className={`w-9 h-9 rounded-md flex items-center justify-center transition ${
                layout === "grid" ? "bg-sky-600 text-white" : "hover:bg-base-200"
              }`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setLayout("list")}
              aria-label="List view"
              className={`w-9 h-9 rounded-md flex items-center justify-center transition ${
                layout === "list" ? "bg-sky-600 text-white" : "hover:bg-base-200"
              }`}
            >
              <FiList />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="opacity-70">
            Showing <span className="font-semibold">{filtered.length}</span> of{" "}
            <span className="font-semibold">{allPosts.length}</span> opportunities
          </span>
          {(query || category !== "All") && (
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="text-sky-600 font-semibold hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
            <FiSearch className="text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-1">No opportunities match your search</h3>
          <p className="opacity-70 max-w-md">
            Try a different keyword, change the category, or clear filters to
            see everything that&apos;s available.
          </p>
        </div>
      ) : (
        <div
          className={
            layout === "grid"
              ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filtered.map((post) => (
            <NeedVolunteerCard
              key={post._id}
              needCard={post}
              layout={layout}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NeedVolunteer;
