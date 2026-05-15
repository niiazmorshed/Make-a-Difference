import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import ContextProvider from "./Provider/ContextProvider.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 900,
  easing: "ease-out-cubic",
  once: true,
  offset: 60,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
