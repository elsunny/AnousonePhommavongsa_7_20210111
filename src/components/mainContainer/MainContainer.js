import React from "react";
import "./MainContainer.scss";

export default class MainContainer extends React.Component {
    render() {
        return (
            <div className="MainContainer">{ this.props.children }</div>
        )
    }
}