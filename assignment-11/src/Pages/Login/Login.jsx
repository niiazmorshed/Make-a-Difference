import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/ContextProvider";

const Login = () => {
  const { logIn, googleSignIn, gitHubSignIn } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);

  const location = useLocation();
  const nevigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const mail = form.get("email");
    const pass = form.get("password");
    // console.log(mail, pass);



    
    // Loggingin With The Function Calling
    logIn(mail, pass)
      .then((result) => {
        toast.success("Login Successfully");
        const user = result.user;
        // console.log(user);
        e.target.reset();
        nevigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Please Register First");
      });





  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGitHubSignIn = () => {
    gitHubSignIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login|Draw Life</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:w-96">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Login Now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative form-control ">
                <input
                  className="input input-bordered"
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  id=""
                  required
                />
                <p
                  className="absolute top-4 right-2"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </p>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className="pb-6 mx-auto">
              Do not have an Account?{" "}
              <NavLink to="/register" className="font-semibold text-blue-600">
                Register
              </NavLink>
            </p>
            <div className="flex gap-4 justify-center mb-6 ">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-ghost btn-circle avatar rounded-full"
              >
                <FaGoogle className="text-3xl"></FaGoogle>
              </button>
              <button
                onClick={handleGitHubSignIn}
                className="btn btn-ghost btn-circle avatar"
              >
                <FaGithub className="text-3xl"></FaGithub>
              </button>
            </div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Login;
