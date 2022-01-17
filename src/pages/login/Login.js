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
        axios.post('/api/user/login', data)
        .then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res.data));
            navigate('/media');
        })
        .catch((err) => {
            console.error(err);
            alert('Oups un problème de connexion est survenu? Merci de vérifier votre email et votre mot de passe svp.');
        });
    }
        return (
            
            <MainContainer>
                <Card>
                    <AuthTitle>Se connecter</AuthTitle>
                    <Form sending={manageSubmit} displayPseudo={false}/>
                    <Button>Connexion </Button>
                    <div className="toggle_button">
                        <span>Pas encore de compte?</span>
                        <span>
                            <Link to="/signup">Créer un compte</Link>
                        </span>
                    </div>
                </Card>
            </MainContainer>
        );
}

export default Login;