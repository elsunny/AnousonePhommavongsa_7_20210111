import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Suppression = () => {

    const navigate = useNavigate();

    const redirection = (time) => {
        setTimeout(navigate("/media"), time );
    }

    redirection(4000);


    return (
        <div>
            <h1>Le compte de l'utilisateur a bien été supprimé</h1>
        </div>
    )
}
