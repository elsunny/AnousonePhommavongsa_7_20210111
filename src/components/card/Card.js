import React from "react";
import "./Card.scss";
import logo from "../../assets/images/icon-left-font.svg";



const Card = (props) => {

        return (
            <div className="card_background">
                <div className="card_background_logo">
                    <img src={logo} alt="#" />
                </div>
                { props.children }
            </div>
        );
};

export default Card;
