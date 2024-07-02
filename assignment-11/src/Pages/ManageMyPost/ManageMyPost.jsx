import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import review from "../../No Data- 1715763454242.json";
import { AuthContext } from "../../Provider/ContextProvider";

const ManageMyPost = () => {
  const { user } = useContext(AuthContext);
  const [personalData, setPersonalData] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [vol, setVol] = useState(personalData);

  useEffect(() => {
    fetch(`http://localhost:5174/volunteer/${user.email}`)
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const Thumbnail = form.thumbnail.value;
    const Post_Title = form.post_title.value;
    const Category = form.category.value;
    const Location = form.location.value;
    const NoOfVolunteers = form.no_of_volunteers_needed.value;
    const Deadline = form.deadline.value;
    const OrganizerName = form.organizer_name.value;
    const OrganizerEmail = form.organizer_email.value;
    const Description = form.description.value;
    const Email = form.email.value;
    const Name = form.username.value;

    const newUpdate = {
      Thumbnail,
      Post_Title,
      Category,
      Location,
      NoOfVolunteers,
      Deadline,
      OrganizerName,
      OrganizerEmail,
      Description,
      Email,
      Name,
    };

    // Sending Data to the server for Update
    fetch(`http://localhost:5174/updatevol/${personal._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUpdate),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Post Updated Successfully",
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetch(`http://localhost:5174/volunteer/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              setPersonalData(data);
            });
        }
      });
    form.reset();
  };

  const handleDataFetch = (id) => {
    fetch(`http://localhost:5174/vol/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPersonal(data);
      });
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5174/deletevol/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Post has been deleted.", "success");
              fetch(`http://localhost:5174/volunteer/${user.email}`)
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
        <h1 className="font-semibold text-4xl">My Post</h1>
      </div>
      <div className="overflow-x-auto">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Post| MAD</title>
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
            <tbody className="">
              {personalData.map((i) => (
                <tr className="" key={i._id}>
                  <th></th>
                  <td className=" text-xl text-center">{i.Name}</td>
                  <td className=" text-xl text-center">{i.Email}</td>
                  <td className=" text-xl text-center">{i.Post_Title}</td>
                  <Link>
                    {" "}
                    <td className="">
                      <button
                        onClick={() => {
                          document.getElementById("modal").showModal();
                          handleDataFetch(i._id);
                        }}
                        className="btn btn-outline btn-accent"
                      >
                        Update
                      </button>
                    </td>
                  </Link>
                  <Link>
                    {" "}
                    <td>
                      <button
                        onClick={() => handleDelete(i._id)}
                        className="btn btn-outline btn-error"
                      >
                        Delete
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
      {/* Modal Starts */}
      <div className="flex justify-center">
        <dialog id="modal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div>
              <div>
                <h2 className="text-3xl font-extrabold text-center pb-10">
                  Be a Volunteer
                </h2>
                <form onSubmit={handleUpdate}>
                  <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          Thumbnail
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Thumbnail}
                          type="text"
                          name="thumbnail"
                          placeholder="Thumbnail"
                          className="input input-bordered w-full"
                        />
                      </label>
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          Post Title
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Post_Title}
                          type="text"
                          name="post_title"
                          placeholder="Post Title"
                          className="input input-bordered w-full"
                        />
                      </label>
                    </div>
                  </div>
                  {/* -----====================>>>>>>>>>>>>>>>>>>> */}
                  <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          Category
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Category}
                          type="tel"
                          name="category"
                          placeholder="Category"
                          className="input input-bordered w-full"
                        />
                      </label>
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          Location
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Location}
                          type="text"
                          name="location"
                          placeholder="Location"
                          className="input input-bordered w-full"
                        />
                      </label>
                    </div>
                  </div>
                  {/* {=========================>>>>/} */}
                  <div className="md:flex md:mb-8">
                    <div className="form-control md:w-1/2">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          No. of volunteers
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.NoOfVolunteers}
                          type="number"
                          name="no_of_volunteers_needed"
                          placeholder="No. of volunteers needed"
                          className="input input-bordered w-full"
                        />
                      </label>
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          Deadline
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Deadline}
                          type="date"
                          name="deadline"
                          placeholder="Deadline"
                          className="input input-bordered w-full"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          Organizer name
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Name}
                          type="text"
                          name="organizer_name"
                          placeholder="Please Enter the Name of your Organizer"
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </label>
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          Organizer Email
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Email}
                          type="email"
                          name="organizer_email"
                          placeholder="Please Enter the Email of your Organizer"
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </label>
                    </div>
                  </div>

                  <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Name}
                          type="text"
                          name="username"
                          placeholder="Logged in User Name"
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </label>
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Email}
                          type="text"
                          name="email"
                          placeholder="Logged in User Email"
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </label>
                    </div>
                  </div>
                  {/* form Photo url row */}
                  <div className="mb-8">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-xl font-semibold">
                          Description
                        </span>
                      </label>
                      <label className="input-group">
                        <input
                          defaultValue={personal.Description}
                          type="text"
                          name="description"
                          placeholder="Please Enter a Description"
                          className="input input-bordered w-full"
                        />
                      </label>
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-block btn-accent"
                  />
                </form>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ManageMyPost;
