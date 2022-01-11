import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";

export const CommentsByMedia = (props) => {
    const [comments, setComments] = useState();
    const mediaId = props.mediaNumber;
    const url = "http://localhost:4000/api/comment/" + mediaId;

  useEffect(() => {
    axios.get(url).then((res) => {
        setComments(res.data);
    });
  }, [])
        

    if (!comments) return null;
    
    const displayMediaComments = comments.map((comment) => { 
        if (comment != null) {
            let foundComment = (
                <div key={"comment" + comment.id}>
                    <p>{comment.message}</p>
                </div>
            );
            return foundComment;
        }
    });

    return (
        <div>
            <Avatar />
            <div>{displayMediaComments}</div>
        </div>
    );
};
