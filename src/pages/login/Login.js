import React from "react";
import MainContainer from "components/mainContainer/MainContainer";
import AuthTitle from "components/authTitle/AuthTitle";
import Form from "components/form/Form";
import Card from "components/card/Card";
import Button from "components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    
    const navigate = useNavigate();
    

    const manageSubmit = (data) => {
        axios.post('http://localhost:4000/api/user/login', data)
        .then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res.data));
            navigate('/media');
            console.log('data login', res.data);
        })
        .catch((err) => console.error(err));
    }
        return (
            <MainContainer>
                <Card>
                    <AuthTitle>Login</AuthTitle>
                    <Form sending={manageSubmit} displayPseudo={false}/>
                    <Button>Login </Button>
                    <div className="toggle_button">
                        <span>Already have an account?</span>
                        <span>
                            <Link to="/signup">Sign Up</Link>
                        </span>
                    </div>
                </Card>
            </MainContainer>
        );
}

export default Login;