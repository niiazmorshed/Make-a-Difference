import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/ContextProvider";

import review from "../../No Data- 1715763454242.json";

const MyVolReqPost = () => {
  const { user } = useContext(AuthContext);
  const [personalData, setPersonalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5174/myreq/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPersonalData(data);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const handleCancel = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5174/deletereq/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Post has been deleted.", "success");
              fetch(`http://localhost:5174/myreq/${user?.email}`)
                .then((res) => res.json())
                .then((data) => {
                  setLoading(false);
                  setPersonalData(data);
                });
            }
          });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-10 p-4">
        <h1 className="font-semibold text-4xl">My Request</h1>
      </div>
      <div className="overflow-x-auto">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Volunteer Post Request| MAD</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {personalData.length > 0 ? (
          <table className="table md:table-lg">
            <thead>
              <tr>
                <th></th>
                <th className=" text-3xl font-semibold text-center">
                  User Name
                </th>
                <th className=" text-3xl font-semibold text-center">
                  User Email
                </th>
                <th className=" text-3xl font-semibold text-center">
                  Post Title
                </th>
              </tr>
            </thead>
            <tbody>
              {personalData.map((i) => (
                <tr key={i._id}>
                  <th></th>
                  <td className=" text-xl text-center">{i.Name}</td>
                  <td className=" text-xl text-center">{i.Email}</td>
                  <td className=" text-xl text-center">{i.Post_Title}</td>
                  <Link>
                    {" "}
                    <td>
                      <button
                        onClick={() => handleCancel(i._id)}
                        className="btn btn-outline btn-error"
                      >
                        Cancel
                      </button>
                    </td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className=" lg:flex lg: justify-center  ">
            <Lottie animationData={review} loop={true}></Lottie>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVolReqPost;
