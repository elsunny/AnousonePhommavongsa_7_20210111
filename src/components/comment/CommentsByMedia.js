import React, { useState } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";

export const CommentsByMedia = (props) => {
    const [comments, setComments] = useState();
    const mediaId = props.mediaNumber;
    const url = "http://localhost:4000/api/comment/" + mediaId;

    axios.get(url).then((res) => {
        setComments(res);
        console.log("comments", comments);
    });

    const displayMediaComments = comments.map((comment) => { //map ne marche pas pour les objets
        if (comment != null) {
            let foundComment = (
                <div>
                    <p>{comment.message}</p>
                </div>
            );
            return foundComment;
        }
    });

    return (
        <div>
            <Avatar />
            <div>{displayMediaComments()}</div>
        </div>
    );
};
