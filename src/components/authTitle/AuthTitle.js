import React from "react";

// titre de la carte login ou signup
const AuthTitle = (props) => {
    return (
        <div className="title">
            <h1>{props.children}</h1>
            <span>Entrer vos identifiants pour continuer</span>
        </div>
    );
};

export default AuthTitle;
