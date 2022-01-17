import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";
import { CommentAdd } from "components/comment/CommentAdd";
import { CommentsByMedia } from "components/comment/CommentsByMedia";
import "./ShowMedia.scss";
import MediaAddEvent from "events/MediaAdd";

// affichage d'un post
export default function ShowMedia() {
    // informations rattachées à chaque post
    const [medias, setMedias] = useState(null);

    // récupération des informations de l'utilisateur de session
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        const baseUrl = "/api/media";
        axios
            .get(baseUrl)
            .then((res) => {
                const medias = res.data; //récupère tous les médias et leurs informations
                const usersPromise = medias
                //ajout id de l'utilisateur lié au média s'il n'était pas dans le tableau
                .reduce((userIds, media) => {
                    if (!userIds.includes(media.UserId))
                        userIds.push(media.UserId); 
                    return userIds;
                }, [])
                //récupère toutes les infos des utilisateurs liés aux médias
                .map((userId) => {
                    const url = "/api/user/" + userId;
                    return axios
                                .get(url)
                                .then((res) => res.data);
                });

            Promise.all(usersPromise).then((users) => {
                setMedias(
                    medias.map((media) => {
                        return {
                            ...media,
                            user: users.find((user) => {
                                return user.id === media.UserId;
                            }),
                        };
                    })
                );
            });
        });
    }, []);

    // refresh page when a new media is added
    useEffect(() => {
        const callback = (event) => {
            const media = event.detail;
            const url = "/api/user/" + media.UserId;
            axios.get(url).then((res) => {
                media.user = res.data;
                setMedias([media, ...medias]);
            });
        };
        document.addEventListener(MediaAddEvent.event, callback);
        return () => {
            document.removeEventListener(MediaAddEvent.event, callback);
        };
    });

    // Suppression d'un média
    const removeMedia = (mediaId) => {
        const mediaUrl = "/api/media/" + mediaId;
        axios.delete(mediaUrl).then((res) => {
            setMedias(medias.filter((media) => media.id !== mediaId));
        });
    };

    if (!medias) return null;

    const getMediaToDisplay = medias.map((media) => {
        return (
            <div className="showMedia" key={"media" + media.id}>
                <div className="showMedia_header">
                    <Avatar user={media.user} />
                    {(user.role === "admin" || user.role === "moderator") && (
                        <button
                            className="showMedia_header-supprimer"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => removeMedia(media.id)}
                        >
                            supprimer
                        </button>
                    )}
                </div>
                {media.filename && (
                    <div className="showMedia_image">
                        <img
                            src={`http://localhost:4000/images/${media.filename}`}
                            alt="média uploader ici"
                        />
                    </div>
                )}

                <div className="showMedia_title">
                    <h3>{media.title}</h3>
                </div>
                <div className="showMedia_description">{media.description}</div>
                <div>
                    <CommentAdd mediaNumber={media.id} />
                </div>
                <div>
                    <CommentsByMedia mediaNumber={media.id} />
                </div>
            </div>
        );
    });

    return getMediaToDisplay;
}
