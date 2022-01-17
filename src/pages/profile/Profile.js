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

    const sessionUser = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();

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
        formData.append("file", data.image[0]);
        formData.append("pseudo", data.pseudo);
        formData.append("description", data.description);

        const url = "http://localhost:4000/api/user/profile/" + id;

        axios
            .put(url, formData)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.error(err));
    };

    // remove user
    const removeUser = (userId) => {
        const userUrl = "http://localhost:4000/api/user/" + userId;
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
                                        for="file-upload"
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
                                    <div className="profileCard_about_description">{user.description}</div>
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
                                {(sessionUser.role === "admin" &
                                    sessionUser.id !== user.id) && 
                                        <button
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => removeUser(id)}
                                        >
                                            Supprimer
                                        </button>
                                    }
                            </div>
                        </form>
                    </div>
                </div>
            </MainContainer>
        </div>
    );
}
