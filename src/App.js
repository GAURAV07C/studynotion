import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import OpenRoute from "./components/core/Auth/OpenRoute.jsx";
import NavBar from "../src/components/common/NavNar.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import Dashboard from "../src/pages/Dashboard.jsx";
import MyProfile from "./components/core/Dashbord/MyProfile.jsx";
import Error from "./pages/Error.jsx";
import Settings from "./components/core/Dashbord/Settings/index.jsx";

function App() {
  return (
    <div className="App  w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >

        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/Settings" element={<Settings />} />

        </Route>



        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
