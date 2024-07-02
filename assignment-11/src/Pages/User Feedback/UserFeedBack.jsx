import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/ContextProvider";

const UserFeedBack = () => {
  const { user, loading } = useContext(AuthContext);
  const [mama, setMama] = useState([]);


  const handleSave = () => {
    const searchField = document.getElementById("search");
    const searchText = searchField.value;
    const dataInfo = {
      feedback: searchText,
      email: user?.email,
    };
    fetch("https://assignment-11-server-psi-cyan.vercel.app/feedback", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          {
            Swal.fire({
              title: "Success!",
              text: "FeedBack Sended Successfully",
              icon: "success",
              confirmButtonText: "Okay",
            });
            fetch("https://assignment-11-server-psi-cyan.vercel.app/feeds")
              .then((res) => res.json())
              .then((data) => {
                setMama(data);
              });
          }
        }
      });
  };

  useEffect(() => {
    fetch("https://assignment-11-server-psi-cyan.vercel.app/feeds")
      .then((res) => res.json())
      .then((data) => {
        setMama(data);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4 justify-center">
        <div>
          <input
            id="search"
            type="text"
            placeholder="Provide Your Feedback"
            className="input input-bordered h-24 w-96"
            
          />
        </div>
        <div>
          <button onClick={handleSave} className="btn btn-outline btn-accent">
            Save
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-6 mt-12">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className=" text-center text-xl font-semibold" >Added by</th>
              <th className=" text-center text-xl font-semibold" >FeedBack</th>
            </tr>
          </thead>
          <tbody>
            {mama.map((i, index) => (
              <tr key={i._id}>
                <th className="text-center" >{index + 1}</th>
                <td className="text-center" >{i.email}</td>
                <td className="text-center" >{i.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserFeedBack;
