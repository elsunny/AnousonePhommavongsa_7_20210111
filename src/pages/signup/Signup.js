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
        axios.post("/api/user/signup", data)
            .then((res) => {
                sessionStorage.setItem("user", JSON.stringify(res.data))
                navigate('/media');
            })
            .catch((err) => {
                alert('Oups un problème de connexion est survenu? Merci de vérifier votre email et votre mot de passe svp.');
            });
    };
    return (
        <MainContainer>
            <Card>
                <AuthTitle>Créer un compte</AuthTitle>
                <Form sending={manageSubmit} displayPseudo={true} />
                <Button>Créer </Button>
                <div className="toggle_button">
                    <span>Déjà un compte?</span>
                    <span>
                        <Link to="/login">Se connecter</Link>
                    </span>
                </div>
            </Card>
        </MainContainer>
    );
};

export default Signup;
