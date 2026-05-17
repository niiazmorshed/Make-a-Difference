import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FiChevronDown, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/ContextProvider";
import Dark from "../Dark Mode/Dark";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/needvolunteerpage", label: "Opportunities" },
  { to: "/myvolreqpost", label: "My Requests" },
  { to: "/review", label: "Reviews" },
  { to: "/userfeedback", label: "Feedback" },
];

const profileLinks = [
  { to: "/addvolunteerpost", label: "Add Volunteer Post" },
  { to: "/managemypost", label: "Manage My Posts" },
];

const linkClass = ({ isActive }) =>
  `nav-link inline-block${isActive ? " active" : ""}`;

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  // Close menus on route change — instant, no animation lag.
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Click-outside for profile dropdown — no setTimeout delay.
  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  // Close mobile menu / dropdown on Escape.
  useEffect(() => {
    if (!mobileOpen && !profileOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen, profileOpen]);

  const handleLogOut = useCallback(() => {
    logOut()
      .then(() => toast.success("Signed out"))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        toast.error("Sign-out failed");
      });
  }, [logOut]);

  return (
    <header className="sticky top-0 z-50 bg-base-100/85 backdrop-blur-md border-b border-base-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg md:text-xl font-extrabold tracking-tight"
        >
          <span className="hidden sm:inline">
            Make a Difference<span className="text-amber-500">.</span>
          </span>
          <span className="sm:hidden">MAD</span>
        </NavLink>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}

          {user && (
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                className="nav-link inline-flex items-center gap-1"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                My Profile <FiChevronDown className="text-sm" />
              </button>
              {profileOpen && (
                <ul
                  role="menu"
                  className="absolute right-0 mt-2 w-56 bg-base-100 border border-base-200 rounded-xl shadow-lg overflow-hidden py-1"
                >
                  {profileLinks.map((l) => (
                    <li key={l.to} role="none">
                      <NavLink
                        to={l.to}
                        role="menuitem"
                        className="block px-4 py-2 text-sm hover:bg-base-200 transition"
                      >
                        {l.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          <Dark />

          {user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <div
                title={user.displayName || user.email}
                className="w-10 h-10 rounded-full ring-2 ring-sky-500/30 overflow-hidden shrink-0"
              >
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/k4mkCVQ/photo-2023-02-28-19-26-32-2.jpg"
                  }
                  alt={user.displayName || "Profile"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <button
                type="button"
                onClick={handleLogOut}
                className="btn-nav btn-nav-outline hidden sm:inline-flex"
              >
                <FiLogOut /> Logout
              </button>
              <button
                type="button"
                onClick={handleLogOut}
                aria-label="Logout"
                className="btn-nav btn-nav-outline sm:hidden w-10 p-0 justify-center"
              >
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <NavLink to="/login" className="btn-nav btn-nav-outline">
                Login
              </NavLink>
              <NavLink to="/register" className="btn-nav btn-nav-solid">
                Register
              </NavLink>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="lg:hidden btn-nav btn-nav-outline w-10 p-0 justify-center"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-base-200 bg-base-100">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className="px-4 py-3 rounded-lg hover:bg-base-200 font-semibold"
              >
                {l.label}
              </NavLink>
            ))}
            {user &&
              profileLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="px-4 py-3 rounded-lg hover:bg-base-200 font-semibold"
                >
                  {l.label}
                </NavLink>
              ))}
            {!user && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                <NavLink
                  to="/login"
                  className="btn-nav btn-nav-outline w-full justify-center"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn-nav btn-nav-solid w-full justify-center"
                >
                  Register
                </NavLink>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
