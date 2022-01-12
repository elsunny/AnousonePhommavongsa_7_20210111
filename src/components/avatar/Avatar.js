import React from "react";
import { Link } from "react-router-dom";
import "./Avatar.scss"

export default function Avatar() {
    return (
        <div className="Avatar">
            <Link to="/profile">profile</Link>
        </div>
    );
}


