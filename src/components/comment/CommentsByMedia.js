import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";
import "./CommentsByMedia.scss";

export const CommentsByMedia = (props) => {
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const hasFetchedData = useRef(false);
    const mediaId = props.mediaNumber;
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


    // supprime les commentaires
    const removeComment = (item) => {
        const commentUrl = "http://localhost:4000/api/comment/" + item;
            axios.delete(commentUrl, item)
                .then(res => console.log(res))
    }

    if (!comments) return null;

    const displayMediaComments = comments.map((comment) => {
        if (comment != null) {
            let foundComment = (
                <div  key={"comment" + comment.id} >
                    <p>{comment.message}</p>
                    <button style={{cursor: "pointer"}} onClick={(e) => removeComment(comment.id)}>supprimer</button>
                </div>
            );
            return foundComment;
        }
    });


    

    return (
        <div className="mediaComment">
            <Avatar />
            <div>{displayMediaComments}</div>
        </div>
    );
};
