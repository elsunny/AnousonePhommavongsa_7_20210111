import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "components/avatar/Avatar";
import Logo from "components/logo/Logo";
import axios from "axios";
import "./Header.scss";




export default function Header(props) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const handleClick = () => {
        axios
            .post("/api/user/logout")
            .then((res) => {
                sessionStorage.removeItem("user");
                navigate("/deconnexion");

            });
    };

    const handleClickBack = () => {
        navigate("/media");
    }

    useEffect(() => {
        axios.get("/api/user/me")
            .then(res => setUser(res.data));
    }, [])

    return (
        <div className="header">
            <div className={`header__avatar ${props.showAvatar}`}>
                <Avatar user={user} />
            </div>
            <div className="header__logo">
                <Logo />
            </div>
            <div className="header__link">
                <button className="header__link-back" onClick={handleClickBack}>Publication</button>
                <button className="header__link-deconnexion" onClick={handleClick}>Déconnexion</button>
            </div>
        </div>
    );
}
