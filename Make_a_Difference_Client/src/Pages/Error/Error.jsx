import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { NavLink, useNavigate, useRouteError } from "react-router-dom";
import errorAnim from "../../../error.json";
import { SITE_URL } from "../../site";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const status = error?.status || 404;
  const message =
    error?.statusText ||
    error?.message ||
    "We can't find the page you're looking for.";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{status} | MAD</title>
        <link rel="canonical" href={SITE_URL} />
      </Helmet>

      <div className="max-w-3xl w-full text-center">
        <div className="max-w-md mx-auto -mb-6">
          <Lottie animationData={errorAnim} loop={true} />
        </div>

        <p className="text-7xl md:text-8xl font-extrabold text-gradient leading-none">
          {status}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mt-4">
          Something&apos;s off here
        </h1>
        <p className="opacity-70 mt-3 max-w-md mx-auto">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="btn-pill-ghost btn h-12 min-h-0 px-6 gap-2"
          >
            <FaArrowLeft /> Go back
          </button>
          <NavLink to="/">
            <button className="btn-pill-primary btn h-12 min-h-0 px-6 gap-2">
              <FaHome /> Back to home
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Error;
