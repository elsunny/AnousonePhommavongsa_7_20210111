import React from "react";


const AuthTitle = (props) => {
    return (
        <div className="title">
            <h1>{props.children}</h1>
            <span>Enter your credentials to continue</span>
        </div>
    );
};

export default AuthTitle;
