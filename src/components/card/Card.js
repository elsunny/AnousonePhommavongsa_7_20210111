import React from "react";
import "./Card.scss";
import Logo from "components/logo/Logo";


const Card = (props) => {

        return (
            <div className="card_background">
                <div className="card_background_logo">
                    <Logo />
                </div>
                { props.children }
            </div>
        );
};

export default Card;
