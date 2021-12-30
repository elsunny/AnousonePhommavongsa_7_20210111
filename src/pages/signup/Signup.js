import React from "react";
import MainContainer from "components/mainContainer/MainContainer";
import AuthTitle from "components/authTitle/AuthTitle";
import Form from "components/form/Form";
import Card from "components/card/Card";
import Button from "components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate();

    const manageSubmit = (data) => {
        axios({
            method: "post",
            url: "http://localhost:4000/api/user/signup",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data,
        })
            .then((res) => {
                navigate('/media');
            })
            .catch((err) => console.error(err));
    };
    return (
        <MainContainer>
            <Card>
                <AuthTitle>Sign Up</AuthTitle>
                <Form sending={manageSubmit} displayPseudo={true} />
                <Button>Sign Up </Button>
                <div className="toggle_button">
                    <span>Already have an account?</span>
                    <span>
                        <Link to="/login">login</Link>
                    </span>
                </div>
            </Card>
        </MainContainer>
    );
};

export default Signup;
