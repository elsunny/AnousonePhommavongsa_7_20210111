import React from "react";
import MainContainer from "components/mainContainer/MainContainer";
import AuthTitle from "components/authTitle/AuthTitle";
import Form from "components/form/Form";
import Card from "components/card/Card";
import Button from "components/button/Button";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <MainContainer>
            <Card>
                <AuthTitle>Sign Up</AuthTitle>
                <Form  onWhichPage='pseudoDisplayed'/>
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

