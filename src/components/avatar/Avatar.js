import React from "react";
import { Link } from "react-router-dom";
import "./Avatar.scss";

export default function Avatar(props) {
    if (!props.user) return null;

    return (
        <Link to={`/profile/${props.user.id}`}>
            <div
                className="Avatar"
                style={{
                    backgroundImage: `url(http://localhost:4000/avatarImage/${props.user.image})`,
                }}
            >
                {!props.user.image && props.user.pseudo}
            </div>
        </Link>
    );
}
