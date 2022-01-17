import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

// initialisation
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_HOST;

// stockage des informations de l'utilisateur de session
axios
    .get("/api/user/me")
    .then((res) => sessionStorage.setItem("user", JSON.stringify(res.data)))
    .catch(e => sessionStorage.removeItem('user'))
    .finally(() => {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById("root")
        );
    });
