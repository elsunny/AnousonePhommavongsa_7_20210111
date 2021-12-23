import React from 'react';
import "./Button.scss";


const Button = (props) => {
    return (
        <div className="form_button">
                <span>{props.children}</span>
            </div>
    )
}

export default Button;

