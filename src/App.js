import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Media from "./pages/media/Media";
import Profile from "./pages/profile/Profile";
import ErrorPage from "pages/error/ErrorPage";

import "./sass/app.scss";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="media" element={<Media />} />
                <Route path="*" element={<ErrorPage />} />

                
            </Routes>
        </Router>
    );

};

export default App;
