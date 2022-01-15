import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "components/header/Header";
import MainContainer from "components/mainContainer/MainContainer";
import Avatar from "components/avatar/Avatar";
import "./Profile.scss";
import axios from "axios";

export default function Profile() {
    const { register, handleSubmit } = useForm();

    const { id } = useParams(); //id du profil

    const [user, setUser] = useState(null); //information sur l'utilisateur du profil

    const [sessionUser, setSessionUser] = useState(null);

    const navigate = useNavigate();

    // récupère les informations de l'utilisateur de session
    useEffect(() => {
        axios.get("http://localhost:4000/api/user/me")
            .then(res => setSessionUser(res.data));
    }, [])

    // récupère les informations utilisateur du profil
    useEffect(() => {
        const url = "http://localhost:4000/api/user/" + id;
        axios
            .get(url)
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!user) return null;

    // handle le image avatar upload
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("file", data.image[0]);

        const url = "http://localhost:4000/api/user/profile/" + id;

        axios
            .put(url, formData)
            .then((res) => {
                console.log("avatar", res.data);
            })
            .catch((err) => console.error(err));
    };

    // remove user
    const removeUser = (userId) => {
        const userUrl = "http://localhost:4000/api/user/" + userId;
        axios.delete(userUrl).then((res) => {
            console.log("utilisateur supprimé");
            navigate("/suppression");
        });
    };

    return (
        <div className="profileContainer">
            <Header showAvatar="showAvatarImage" />
            <MainContainer>
                <div className="profileCard">
                    <div className="profileCard_avatar">
                        <Avatar user={user} />
                        <form
                            className="postCard_form"
                            id="postForm"
                            name="postForm"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="postCard_control">
                                <input
                                    {...register("image")}
                                    type="file"
                                    name="image"
                                    className="postCard_control_add"
                                />
                                <input
                                    type="submit"
                                    name="postCard_control_publier"
                                    value="Publier"
                                    className="postCard_control_publier"
                                />
                            </div>
                        </form>
                        {/* affiche le nom du profil d'un utilisateur qui a été cliqué, ce profil n'est pas focémment le profil de l'utilisateur de la sesssion  */}
                        <div className="profileCard_avatar_name">
                            {user.pseudo}
                        </div>
                        <button>Modifier la photo</button>
                        <div className="profileCard_about">
                            <div className="profileCard_about_title">About</div>
                            <div className="profileCard_about_description">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Soluta asperiores vitae
                                perspiciatis tempore, fugit obcaecati molestias!
                                Unde veniam nam accusantium repellendus
                                perspiciatis iure obcaecati labore, perferendis
                                laboriosam natus sint, rerum, earum expedita.
                                Amet facere aspernatur placeat nam maxime dicta
                                totam, reiciendis repellendus, atque odio, ipsam
                                dolores fugiat sit ea. Excepturi!
                            </div>
                        </div>
                        <div className="profileCard_button">
                            <button>Modifier</button>
                            {sessionUser.role === "admin" && (
                                <button
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => removeUser(id)}
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    );
}
