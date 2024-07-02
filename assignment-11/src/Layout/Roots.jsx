import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";

const Roots = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto font-sans">
        <Navbar></Navbar>
        <div className="mt-32">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="mt-20 font-sans">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Roots;
