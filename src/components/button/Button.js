import React from "react";
import "./Button.scss";


// bouton sur la page login et signup
const Button = (props) => {
    return (
        <button form="user_form" type="submit" className="form_button">
            <span>{props.children}</span>
        </button>
    );
};

export default Button;
