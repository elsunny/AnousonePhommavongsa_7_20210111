import React from "react";
import { Link } from "react-router-dom";
import "./Avatar.scss";

export default function Avatar(props) {

if (!props.user) return null;

    return (
        <div className="Avatar">
            <Link to={`/profile/${props.user.id}`}>{props.user.pseudo}</Link>
        </div>
    );
}
