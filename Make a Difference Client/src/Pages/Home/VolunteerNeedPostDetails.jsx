import { useContext } from "react";
import { Helmet } from "react-helmet";
import { BsStopwatch } from "react-icons/bs";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/ContextProvider";

const VolunteerNeedPostDetails = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const { id } = useParams();
  const info = data.find((i) => i._id === id);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const Thumbnail = form.thumbnail.value;
    const Post_Title = form.post_title.value;
    const Category = form.category.value;
    const Location = form.location.value;
    const NoOfVolunteers = parseInt(form.no_of_volunteers_needed.value);
    const Deadline = form.deadline.value;
    const OrganizerName = form.organizer_name.value;
    const OrganizerEmail = form.organizer_email.value;
    const Description = form.description.value;
    const Email = form.email.value;
    const Name = form.username.value;
    const Suggestion = form.suggestion.value;
    const Status = form.status.value;
    const newRequest = {
      _id: id,
      Thumbnail,
      Post_Title,
      Category,
      Location,
      NoOfVolunteers: parseInt(NoOfVolunteers),
      Deadline,
      OrganizerName,
      OrganizerEmail,
      Description,
      Email,
      Name,
      Suggestion,
      Status,
    };

    // Sending data to another Server
    fetch("http://localhost:5174/request", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Request Successfully",
            icon: "success",
            confirmButtonText: "Okay",
          });
        }
      });
  };

  return (
    <div className="md:grid md: grid-cols-4 gap-6 sm: p-4 min-h-screen mt-12 ">
      <Helmet>
        <meta charSet="utf-8" />
        <title> {info.Post_Title} |MAD</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="col-span-2">
        <img className="  " src={info?.Thumbnail} alt="" />
      </div>
      <div className="col-span-2  p-4">
        <h1 className="text-3xl font-semibold">{info.Post_Title}</h1>
        <p className="text-text-base font-semibold text-lg pb-2">
          {info.subcategory}
        </p>
        <p className="text-xl font-bold">Organizer - {info.Name}</p>
        <p>Email- {info.Email} </p>
        <br />
        <p className="font-semibold">{info.Description}</p>
        <br />
        <hr className="border-dashed" />
        <br />
        <p className="text-lg font-semibold">Category- {info.Category}</p>
        <p className="text-lg font-semibold">
          Location-{" "}
          <span className="text-lg font-bold text-green-600">
            {info.Location}
          </span>{" "}
        </p>
        <div className="flex items-center justify-between w-[50%] ">
          <div className="flex items-center font-semibold">
            <p className="text-lg font-semibold"></p>
            <BsStopwatch className="text-xl mr-2"></BsStopwatch>
            <p className="text-red-800">{info.Deadline}</p>
          </div>

          <div className="flex items-center gap-2 align-middle">
            <p className="font-bold">
              Volunteers Needed- {info.NoOfVolunteers}
            </p>
          </div>
        </div>
        <br />

        <div className="flex justify-center">
            {
              info.NoOfVolunteers>0 ?            <button
              onClick={() => document.getElementById("modal").showModal()}
              className=" bg-green-600 text-white btn   md:btn-md lg:btn-lg"
            >
              Be a Volunteer
            </button>
            : <h1 className="text-3xl font-semibold text-center" >Can Not Apply</h1>
            }

          <dialog id="modal" className="modal">
            {/* Modal Starts */}
            <div className="modal-box w-11/12 max-w-5xl">
              <div>
                <div>
                  <h2 className="text-3xl font-extrabold text-center pb-10">
                    Be a Volunteer
                  </h2>
                  <form onSubmit={handleRequest}>
                    {/* form name and quantity row */}
                    <div className="md:flex mb-8">
                      <div className="form-control md:w-1/2">
                        <label className="label">
                          <span className="label-text text-xl font-semibold">
                            Thumbnail
                          </span>
                        </label>
                        <label className="input-group">
                          <input
                            defaultValue={info.Thumbnail}
                            type="text"
                            name="thumbnail"
                            placeholder="Thumbnail"
                            className="input input-bordered w-full"
                            readOnly
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
                            defaultValue={info.Post_Title}
                            type="text"
                            name="post_title"
                            placeholder="Post Title"
                            className="input input-bordered w-full"
                            readOnly
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
                            defaultValue={info.Category}
                            readOnly
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
                            defaultValue={info.Location}
                            readOnly
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
                            defaultValue={info.NoOfVolunteers}
                            readOnly
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
                            defaultValue={info.Deadline}
                            readOnly
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
                            defaultValue={info.Name}
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
                            defaultValue={info.Email}
                            readOnly
                            type="email"
                            name="organizer_email"
                            placeholder="Please Enter the Email of your Organizer"
                            className="input input-bordered w-full"
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
                            defaultValue={user?.displayName}
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
                            defaultValue={user?.email}
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
                            defaultValue={info.Description}
                            readOnly
                            type="text"
                            name="description"
                            placeholder="Please Enter a Description"
                            className="input input-bordered w-full"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="md:flex mb-8">
                      <div className="form-control md:w-1/2">
                        <label className="label">
                          <span className="label-text">Suggestion</span>
                        </label>
                        <label className="input-group">
                          <input
                            defaultValue={"Enter Your Suggestions"}
                            type="text"
                            name="suggestion"
                            placeholder=""
                            className="input input-bordered w-full"
                          />
                        </label>
                      </div>
                      <div className="form-control md:w-1/2 md:ml-4">
                        <label className="label">
                          <span className="label-text">Status</span>
                        </label>
                        <label className="input-group">
                          <input
                            defaultValue={"Requested"}
                            type="text"
                            name="status"
                            className="input input-bordered w-full"
                          />
                        </label>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Request"
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
    </div>
  );
};

export default VolunteerNeedPostDetails;
