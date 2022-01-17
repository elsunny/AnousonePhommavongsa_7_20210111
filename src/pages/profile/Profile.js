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
    const navigate = useNavigate();

    //id du profil cliqué par le user de session
    const { id } = useParams();

    //information sur l'utilisateur du profil
    const sessionUser = JSON.parse(sessionStorage.getItem("user"));

    // récupère les informations sur l'utilisateur dont le profil a été cliqué
    const [user, setUser] = useState(null);

    useEffect(() => {
        const url = "/api/user/" + id;
        axios
            .get(url)
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!user) return null;

    // gère la modification des informations et fichier d'upload du profil utilisateur
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("pseudo", data.pseudo);
        formData.append("description", data.description);

        const url = "/api/user/profile/" + id;

        axios
            .put(url, formData)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.error(err));
    };

    // suppression d'un compte utilisateur
    const removeUser = (userId) => {
        const userUrl = "/api/user/" + userId;
        axios.delete(userUrl).then((res) => {
            navigate("/suppression");
        });
    };

    return (
        <div className="profileContainer">
            <Header showAvatar="showAvatarImage" />
            <MainContainer>
                <div className="profileCard">
                    <div className="profileCard_avatar">
                        <div className="avatar_photo">
                            <Avatar user={user} />
                        </div>
                        <form
                            className="postCard_form"
                            id="postForm"
                            name="postForm"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {sessionUser.id === user.id && (
                                <div className="postCard_control">
                                    <label
                                        htmlFor="file-upload"
                                        className="custom-file-upload"
                                    >
                                        Changer de photo
                                    </label>
                                    <input
                                        {...register("image")}
                                        type="file"
                                        id="file-upload"
                                        name="image"
                                        className="postCard_control_add"
                                    />
                                </div>
                            )}

                            {/* affiche le nom du profil d'un utilisateur qui a été cliqué, ce profil n'est pas focémment le profil de l'utilisateur de la sesssion  */}
                            {user.id === sessionUser.id ? (
                                <input
                                    {...register("pseudo")}
                                    name="pseudo"
                                    type="text"
                                    id="postCard_pseudo"
                                    defaultValue={user.pseudo}
                                />
                            ) : (
                                <div className="profileCard_avatar_name">
                                    {user.pseudo}
                                </div>
                            )}
                            <div className="profileCard_about">
                                <div className="profileCard_about_title">
                                    <h1>About</h1>
                                </div>
                                {/* seul l'utilisateur peut modifier son propre profil */}
                                {user.id === sessionUser.id ? (
                                    <textarea
                                        {...register("description")}
                                        name="description"
                                        className="profileCard_about_description"
                                        rows="5"
                                        cols="70"
                                        defaultValue={user.description || ""}
                                    />
                                ) : (
                                    <div className="profileCard_about_description">
                                        {user.description}
                                    </div>
                                )}
                            </div>
                            <div className="profileCard_button">
                                {user.id === sessionUser.id && (
                                    <input
                                        type="submit"
                                        name="postCard_control_publier"
                                        value="Modifier"
                                        className="postCard_control_publier"
                                    />
                                )}
                                {/* Seul l'administrateur a un bouton pour supprimer un profil */}
                                {sessionUser.role === "admin" &&
                                    sessionUser.id !== user.id && (
                                        <button
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => removeUser(id)}
                                        >
                                            Supprimer
                                        </button>
                                    )}
                            </div>
                        </form>
                    </div>
                </div>
            </MainContainer>
        </div>
    );
}
