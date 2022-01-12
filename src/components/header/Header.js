import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "components/avatar/Avatar";
import Logo from "components/logo/Logo";
import axios from "axios";
import "./Header.scss";

export default function Header() {
    const navigate = useNavigate();

    const handleClick = () => {
        axios
            .post("http://localhost:4000/api/user/logout")
            .then((res) => console.log(res.data));
        navigate("/deconnexion");
    };

    return (
        <div className="header">
            <div className="header__avatar">
                <Avatar />
                {/* <div>pseudo</div> pourquoi il ne se positionne pas juste en dessous sur le rendu? */}
            </div>
            <div className="header__logo">
                <Logo />
            </div>
            <button onClick={handleClick}>Déconnexion</button>
        </div>
    );
}
