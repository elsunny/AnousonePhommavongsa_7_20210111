import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";
import CommentAddEvent from "events/CommentAdd";
import "./CommentsByMedia.scss";

export const CommentsByMedia = (props) => {
    const [error, setError] = useState(null);
    const [comments, setComments] = useState(null);
    const hasFetchedData = useRef(false);
    const mediaId = props.mediaNumber;
    const url = "http://localhost:4000/api/comment/" + mediaId;

    // récupère les informations utilisateurs
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/user/me")
            .then((res) => setUser(res.data));
    }, []);

    // affiche tout les commentaires liées à un média
    useEffect(() => {
        axios.get(url).then(
            (res) => {
                setComments(res.data);
                hasFetchedData.current = true;
            },
            (error) => setError(error)
        );
    }, [url]);

    // supprime les commentaires
    const removeComment = (commentId) => {
        const commentUrl = "http://localhost:4000/api/comment/" + commentId;
        axios.delete(commentUrl).then((res) => {
            setComments(comments.filter((comment) => comment.id !== commentId));
        });
    };

    // refresh page when a new comment is added
    useEffect(() => {
        const callback = (event) => {
            setComments([event.detail, ...comments]);
        };
        document.addEventListener(CommentAddEvent.event, callback);
        return () => {
            document.removeEventListener(CommentAddEvent.event, callback);
        };
    });

    if (!comments) return null;

    const displayMediaComments = comments.map((comment) => {
        return (
            <div key={"comment" + comment.id}>
                <p>{comment.message}</p>
                <button
                    style={{ cursor: "pointer" }}
                    onClick={(e) => removeComment(comment.id)}
                >
                    supprimer
                </button>
            </div>
        );
    });

    return (
        <div className="mediaComment">
            {displayMediaComments.length !== 0 && <Avatar user={user} />}
            <div>{displayMediaComments}</div>
        </div>
    );
};
