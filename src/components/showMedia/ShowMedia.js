import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";
import { Comment } from "components/comment/Comment";
import { CommentsByMedia } from "components/comment/CommentsByMedia";
import "./ShowMedia.scss";
import MediaAddEvent from "events/MediaAdd";

export default function ShowMedia() {
    const [medias, setMedias] = useState(null);

    const [user, setUser] = useState(null);

    // get informations about the session user
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/user/me")
            .then((res) => setUser(res.data));
    }, []);

    // display all medias
    useEffect(() => {
        const baseUrl = "http://localhost:4000/api/media";
        axios.get(baseUrl).then((res) => {
            const medias = res.data;
            const usersPromise = medias
                .reduce((userIds, media) => {
                    if (!userIds.includes(media.UserId))
                        userIds.push(media.UserId);
                    return userIds;
                }, [])
                .map((userId) => {
                    const url = "http://localhost:4000/api/user/" + userId;
                    return axios.get(url).then((res) => res.data);
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
            setMedias([event.detail, ...medias]);
        };
        document.addEventListener(MediaAddEvent.event, callback);
        return () => {
            document.removeEventListener(MediaAddEvent.event, callback);
        };
    });

    // remove the media
    const removeMedia = (mediaId) => {
        const mediaUrl = "http://localhost:4000/api/media/" + mediaId;
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

                <div className="showMedia_image">
                    <img
                        src={`http://localhost:4000/images/${media.filename}`}
                        alt="your media here"
                    />
                </div>
                <div className="showMedia_title">
                    <h3>{media.title}</h3>
                </div>
                <div className="showMedia_description">{media.description}</div>
                <div>
                    <Comment mediaNumber={media.id} />
                </div>
                <div>
                    <CommentsByMedia mediaNumber={media.id} />
                </div>
            </div>
        );
    });

    return getMediaToDisplay;
}
