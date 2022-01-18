import React from "react";
import "./MainContainer.scss";

// body-2 container contenant l'ensemble des éléments de la page sauf le header
const MainContainer = (props) => {
    return (
        <div className="MainContainer">{ props.children }</div>
    )
}

export default MainContainer;