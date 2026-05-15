import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Provider/ContextProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { Helmet } from "react-helmet";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const pass = form.get("password");

    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(pass)) {
      toast.error("Password must contain an uppercase letter");
      return;
    }
    if (!/[a-z]/.test(pass)) {
      toast.error("Password must contain a lowercase letter");
      return;
    }

    setSubmitting(true);
    createUser(email, pass)
      .then(() => {
        e.target.reset();
        toast.success("Account created!");

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        }).catch((error) => console.error(error));

        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error("This email is already in use");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <Helmet>
        <title>Register | MAD</title>
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-base-100 rounded-2xl border border-base-200 shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="text-sm opacity-70 mt-2">
              It takes less than a minute. Free, always.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium opacity-80">Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="input input-bordered w-full mt-1 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium opacity-80">
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                placeholder="https://…"
                className="input input-bordered w-full mt-1 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium opacity-80">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                className="input input-bordered w-full mt-1 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium opacity-80">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="At least 6 characters"
                  className="input input-bordered w-full rounded-xl pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="text-xs opacity-60 mt-1">
                Use 6+ characters with at least one uppercase and one lowercase
                letter.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-pill-primary btn w-full h-12 min-h-0 mt-2"
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 opacity-80">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-semibold text-sky-600 hover:underline"
            >
              Sign in
            </NavLink>
          </p>
        </div>

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default Register;
