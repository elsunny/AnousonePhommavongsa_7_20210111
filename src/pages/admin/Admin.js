import React, { useState, useEffect } from "react";
import MainContainer from "components/mainContainer/MainContainer";
import Header from "components/header/Header";
import axios from 'axios';

export const Admin = () => {

    const baseUrl = "/api/user";

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(baseUrl).then((res) => {
            setUser(res.data);
        });
    }, []);
    
    if (!user) return null;
    
    const getUserToDisplay = user.map(item => {
        return (
            <li className="showUser" key={"user" + item.id}>{`${item.id} ${item.pseudo} ${item.role}`}</li>
        )

    })





    return (
        <div className="pageContainer">
            <Header showLink="showAdminLink" />
            <MainContainer>
                {getUserToDisplay}
            </MainContainer>
        </div>
    )
    }
