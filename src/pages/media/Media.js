import React from "react";
import MainContainer from "components/mainContainer/MainContainer";
import Header from "components/header/Header";
import ErrorBoundary from "components/error/ErrorBoundary";
import Post from "components/post/Post";
import ShowMedia from "components/showMedia/ShowMedia";
import "./Media.scss";

export default function Media() {



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
