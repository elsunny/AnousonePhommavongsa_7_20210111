import React from "react";
import { useNavigate } from "react-router-dom";

export const Suppression = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/media");
    }, 1500);

    return (
        <div>
            <h1>Le compte de l'utilisateur a bien été supprimé.</h1>
        </div>
    );
};
