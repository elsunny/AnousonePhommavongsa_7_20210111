import React from "react";
import Avatar from "components/avatar/Avatar";
import Logo from "components/logo/Logo";
import "./Header.scss";

export default function Header() {
    return (
        <div className="header">
            <div className="header__avatar">
                <Avatar />
                {/* <div>pseudo</div> pourquoi il ne se positionne pas juste en dessous sur le rendu? */}
            </div>
            <div className="header__logo">
                <Logo />
            </div>
            <div>Déconnexion</div>
        </div>
    );
}
