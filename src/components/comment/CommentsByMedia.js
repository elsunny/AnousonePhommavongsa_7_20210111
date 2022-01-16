import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Comment } from "./Comment";
import "./CommentsByMedia.scss";
import CommentAddEvent from "events/CommentAdd";
import CommentDeleteEvent from "events/CommentDelete";

export const CommentsByMedia = (props) => {
    const [error, setError] = useState(null);
    const [comments, setComments] = useState(null);
    const hasFetchedData = useRef(false);
    const mediaId = props.mediaNumber;
    const [displayAll, setDisplayAll] = useState(false);
    const url = "http://localhost:4000/api/comment/" + mediaId;



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

    // refresh page when a new comment is added
    useEffect(() => {
        const callback = (event) => {
            console.log("Medium", event.detail, mediaId);
            if (event.detail.MediumId === mediaId) {
                setComments([event.detail, ...comments]);
            }
        };
        document.addEventListener(CommentAddEvent.event, callback);
        return () => {
            document.removeEventListener(CommentAddEvent.event, callback);
        };
    });

    // refresh page when a media is deleted
    useEffect(() => {
        const callback = (event) => {
            const newComments = comments.filter(
                (comment) => comment.id !== event.detail.id
            );
            if (newComments.length !== comments.length)
                setComments(newComments);
        };
        document.addEventListener(CommentDeleteEvent.event, callback);
        return () => {
            document.removeEventListener(CommentDeleteEvent.event, callback);
        };
    });

    
    if (!comments) return null;
    const commentsToDisplay = displayAll ? comments : comments.slice(0,2);
    
    const displayMediaComments = commentsToDisplay.map((comment) => {
        return <Comment comment={comment} key={"comment" + comment.id} />;
    });

    return (
        <div className="mediaComment">
            <div>{displayMediaComments}</div>
        </div>
    );
};
