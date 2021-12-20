import React from "react";
import Form from "./Form";
import Button from "./Button";
import logo from "../../assets/images/icon-left-font.svg";

const Card = () => {
    return (
        <div className="card_background">
            <div className="card_background_logo">
                <img src={logo} alt="#" />
            </div>
            <div className="title">
                <h1>Sign Up</h1>
                <span>Enter your credentials to continue</span>
            </div>
            <Form />
            <Button />
            <div className="toggle_button">
                <span>Already have an account?</span>
                <span><a href="#">login</a></span>

            </div>
        </div>
    );
};

export default Card;
