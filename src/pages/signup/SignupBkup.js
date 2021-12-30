import React from "react";
import MainContainer from "components/mainContainer/MainContainer";
import AuthTitle from "components/authTitle/AuthTitle";
import Form from "components/form/Form";
import Card from "components/card/Card";
import Button from "components/button/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Signup extends React.Component {
    manageSubmit(data) {
        // axios
        //     .post("http://localhost:4000/api/user/signup", headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     }, data)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.error(err));

        axios({
            method: 'post',
            url: 'http://localhost:4000/api/user/signup',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
    render() {
        return (
            <MainContainer>
                <Card>
                    <AuthTitle>Sign Up</AuthTitle>
                    <Form sending={this.manageSubmit} displayPseudo ={true} />
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
    }
}
