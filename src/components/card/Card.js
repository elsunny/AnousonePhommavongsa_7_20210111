import React from "react";
import "./Card.scss";
import logo from "../../assets/images/icon-left-font.svg";



export default class Card extends React.Component {
    render() {

        return (
            <div className="card_background">
                <div className="card_background_logo">
                    <img src={logo} alt="#" />
                </div>
                { this.props.children }
            </div>
        );
    }
};


