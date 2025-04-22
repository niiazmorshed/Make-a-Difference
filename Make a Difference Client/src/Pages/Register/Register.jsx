import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Provider/ContextProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { Helmet } from "react-helmet";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
  
  
    const handleRegister = (e) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const name = form.get("name");
      const photo = form.get("photo");
      const email = form.get("email");
      const pass = form.get("password");
      // console.log(name, email, pass);
  
  
      // Checking The Password requirements
      if (pass.length < 6) {
        toast.error("Password Can not be less then 6 charecter", {});
        return;
      } else if (!/[A-Z]/.test(pass)) {
        toast.error("Password must be one UpperCase Charecter", {});
        return;
      } else if (!/[a-z]/.test(pass)) {
        toast.error("Password must be one LowerCase Charecter", {});
        return;
      }
  
      // Creating The User by Calling The Function
      createUser(email, pass)
        .then(() => {
          e.target.reset();
          toast.success("Register Successfully");
  
          // New User Has Been Created
          // Sending The Users Data to the Database
  
          
          const user = { email };
          fetch("https://assignmint-10-server.vercel.app/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
          
  
  
            updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
          })
            .then(() => console.log("Success"))
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
          toast.error("This Mail Has Already been Used");
        });
    };





    return (
        <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register|Draw Life</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
  
        <div className=" hero min-h-screen bg-base-200">
          <div className=" hero-content flex-col md:w-96">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Register Now!</h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleRegister} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Enter Your Photo URL"
                    className="input input-bordered"
                    required
                  />
                </div>
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
                  <button className="btn btn-primary">Register</button>
                </div>
              </form>
              <p className="pb-6 mx-auto">
                Already have an Account?{" "}
                <NavLink to="/login" className="font-bold text-blue-600">
                  Login
                </NavLink>{" "}
              </p>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </div>
    );
};

export default Register;