import React, { useState, useEffect } from "react";
import MainContainer from "components/mainContainer/MainContainer";
import Header from "components/header/Header";
import ErrorBoundary from "components/error/ErrorBoundary";
import Post from "components/post/Post";
import ShowMedia from "components/showMedia/ShowMedia";
import "./Media.scss";
import axios from "axios";

export default function Media() {

    const [userInfo, setUserInfo] = useState(null);

    // retrouve les informations de l'utilisateur de session pour afficher son pseudo et photos
    const url = "http://localhost:4000/api/user/me";

    useEffect(() => {
        axios.get(url).then(res => {
            console.log('res.data', res.data);
            setUserInfo(res.data);
            console.log('userInfo', userInfo.pseudo);
        })
    })


    return (
        <div className="pageContainer">
            <Header />
            <MainContainer>
                <Post />
                <ErrorBoundary>
                    <ShowMedia />
                </ErrorBoundary>
            </MainContainer>
        </div>
    );
}
