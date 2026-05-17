import { createBrowserRouter } from "react-router-dom";
import Roots from "../Layout/Roots";
import AddVolunteerPost from "../Pages/AddVolunteerPost/AddVolunteerPost";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import VolunteerNeedPostDetails from "../Pages/Home/VolunteerNeedPostDetails";
import Login from "../Pages/Login/Login";
import ManageMyPost from "../Pages/ManageMyPost/ManageMyPost";
import MyVolReqPost from "../Pages/MyVolReqPost/MyVolReqPost";
import NeedVolunteer from "../Pages/Need Volunteer/NeedVolunteer";
import Register from "../Pages/Register/Register";
import Review from "../Pages/Review/Review";
import UserFeedBack from "../Pages/User Feedback/UserFeedBack";
import PrivateRoute from "./PrivateRoute";
import { apiGet } from "../api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => apiGet("/volunteer"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addvolunteerpost",
        element: (
          <PrivateRoute>
            <AddVolunteerPost></AddVolunteerPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/volunteerneedpostdetails/:id",
        element: (
          <PrivateRoute>
            <VolunteerNeedPostDetails></VolunteerNeedPostDetails>
          </PrivateRoute>
        ),
        loader: () => apiGet("/volunteerall"),
      },
      {
        path: "/needvolunteerpage",
        element: (
          <PrivateRoute>
            <NeedVolunteer></NeedVolunteer>
          </PrivateRoute>
        ),
        loader: () => apiGet("/volunteerall"),
      },
      {
        path: "/managemypost",
        element: (
          <PrivateRoute>
            <ManageMyPost></ManageMyPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/myvolreqpost",
        element: (
          <PrivateRoute>
            <MyVolReqPost></MyVolReqPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/review",
        element: <Review></Review>,
      },
      {
        path: "/userfeedback",
        element: (
          <PrivateRoute>
            <UserFeedBack></UserFeedBack>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
