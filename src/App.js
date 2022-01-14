import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Media from "./pages/media/Media";
import Profile from "./pages/profile/Profile";
import { Deconnexion } from "pages/deconnexion/Deconnexion";
import { Admin } from "pages/admin/Admin";
import ErrorPage from "pages/error/ErrorPage";
import Avatar from "components/avatar/Avatar";

import "./sass/app.scss";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="media" element={<Media />} />
                <Route path="deconnexion" element={<Deconnexion />} />
                <Route path="admin" element={<Admin />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="profile/:id" element={<Profile />} />

                
            </Routes>
        </Router>
    );

};

export default App;
