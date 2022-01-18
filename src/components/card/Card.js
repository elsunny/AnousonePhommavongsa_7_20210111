import React from "react";
import "./Card.scss";
import Logo from "components/logo/Logo";

// affichage de la forme de fond pour le login et signup
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
