import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4000";
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
