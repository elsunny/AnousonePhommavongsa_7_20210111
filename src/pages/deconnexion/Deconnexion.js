import React from "react";
import { useNavigate } from "react-router-dom";

export const Deconnexion = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/login");
    }, 4000);

    return (
        <div>
            <h1>Vous venez de vous déconnectez! A bientôt!!!</h1>
        </div>
    );
};
