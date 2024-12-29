import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import AuthRoute from "./Routes/AuthRoute.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        {/** Auth routes */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/** Private routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<div>Profile</div>} />

          {/** Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <div>
                <Outlet />
              </div>
            }
          >
            <Route path="profile" element={<div>Dashboard Profile</div>} />
            <Route path="contacts" element={<div>Dashboard Contacts</div>} />
          </Route>

          {/** Chat routes */}
          <Route
            path="/chat"
            element={
              <div>
                <Outlet />
              </div>
            }
          >
            <Route path="group/:groupId" element={<div>Chat Group</div>} />
            <Route path="user/:userId" element={<div>Chat User</div>} />
          </Route>
        </Route>

        {/** Not Found */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
