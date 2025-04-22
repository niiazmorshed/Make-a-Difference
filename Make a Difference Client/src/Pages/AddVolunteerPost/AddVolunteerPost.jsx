import { useContext } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/ContextProvider";

const AddVolunteerPost = () => {
  const { user } = useContext(AuthContext);

  const handleAddPost = (e) => {
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

    const newPost = {
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

    // Sending Data to The server

    fetch("http://localhost:5174/volunteer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if(data.insertedId){
            Swal.fire({
                title: "Success!",
                text: "Post Added Successfully",
                icon: "success",
                confirmButtonText: "Okay",
              });
    
        }
      });
      form.reset();
  };

  return (
    <div className="p-16">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Post|MAD</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h2 className="text-3xl font-extrabold text-center pb-10">
        Add Volunteer Post
      </h2>
      <form onSubmit={handleAddPost}>
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
                type="text"
                name="thumbnail"
                placeholder="Thumbnail"
                className="input input-bordered w-full"
                required
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
                type="text"
                name="post_title"
                placeholder="Post Title"
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>
        </div>
        {/* -----====================>>>>>>>>>>>>>>>>>>> */}
        <div className="md:flex mb-8">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text text-xl font-semibold">Category</span>
            </label>
            <label className="input-group">
              <input
                type="tel"
                name="category"
                placeholder="Category"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 md:ml-4">
            <label className="label">
              <span className="label-text text-xl font-semibold">Location</span>
            </label>
            <label className="input-group">
              <input
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
                type="number"
                name="no_of_volunteers_needed"
                placeholder="No. of volunteers needed"
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 md:ml-4">
            <label className="label">
              <span className="label-text text-xl font-semibold">Deadline</span>
            </label>
            <label className="input-group">
              <input
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
                type="text"
                name="organizer_name"
                placeholder="Please Enter the Name of your Organizer"
                className="input input-bordered w-full"
                required
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
                type="email"
                name="organizer_email"
                placeholder="Please Enter the Email of your Organizer"
                className="input input-bordered w-full"
                required
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
                required
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
                required
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
          value="Add Post"
          className="btn btn-block btn-accent"
        />
      </form>
    </div>
  );
};

export default AddVolunteerPost;
