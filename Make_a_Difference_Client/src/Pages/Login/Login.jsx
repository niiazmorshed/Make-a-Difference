import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/ContextProvider";
import { canonicalFor } from "../../site";

const Login = () => {
  const { logIn, googleSignIn, gitHubSignIn } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const redirectAfterAuth = () => {
    const target =
      typeof location.state === "string" && location.state ? location.state : "/";
    navigate(target, { replace: true });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const mail = form.get("email");
    const pass = form.get("password");
    setSubmitting(true);
    logIn(mail, pass)
      .then(() => {
        toast.success("Welcome back!");
        e.target.reset();
        redirectAfterAuth();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid email or password");
      })
      .finally(() => setSubmitting(false));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Welcome!");
        redirectAfterAuth();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google sign-in failed");
      });
  };

  const handleGitHubSignIn = () => {
    gitHubSignIn()
      .then(() => {
        toast.success("Welcome!");
        redirectAfterAuth();
      })
      .catch((error) => {
        console.error(error);
        toast.error("GitHub sign-in failed");
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | MAD</title>
        <link rel="canonical" href={canonicalFor("/login")} />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-base-100 rounded-2xl border border-base-200 shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-sm opacity-70 mt-2">
              Sign in to continue making a difference.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="••••••••"
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
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-pill-primary btn w-full h-12 min-h-0 mt-2"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-base-300"></div>
            <span className="text-xs uppercase tracking-wider opacity-60">
              or continue with
            </span>
            <div className="flex-1 h-px bg-base-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="btn-pill-ghost btn h-11 min-h-0 gap-2"
            >
              <FaGoogle /> Google
            </button>
            <button
              onClick={handleGitHubSignIn}
              className="btn-pill-ghost btn h-11 min-h-0 gap-2"
            >
              <FaGithub /> GitHub
            </button>
          </div>

          <p className="text-center text-sm mt-6 opacity-80">
            New to MAD?{" "}
            <NavLink
              to="/register"
              className="font-semibold text-sky-600 hover:underline"
            >
              Create an account
            </NavLink>
          </p>
        </div>

      </div>
    </>
  );
};

export default Login;
