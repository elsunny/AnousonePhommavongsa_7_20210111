import React from "react";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./sass/app.scss";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Login />} />
                
            </Routes>
        </BrowserRouter>
    );

};

export default App;
