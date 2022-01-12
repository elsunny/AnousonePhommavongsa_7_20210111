import React from "react";
import Header from "components/header/Header";
import MainContainer from "components/mainContainer/MainContainer";
import Avatar from "components/avatar/Avatar";
import "./Profile.scss";

export default function Profile() {
    return (
        <div className="profileContainer">
            <Header />
            <MainContainer>
                <div className="profileCard">
                    <div className="profileCard_avatar">
                        <Avatar />
                    </div>
                </div>
            </MainContainer>
        </div>
    );
}
