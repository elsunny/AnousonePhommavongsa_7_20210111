import React, { useState } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";

export const CommentsByMedia = (props) => {

    const [comments, setComments] = useState();
    const mediaId = props.mediaNumber;
    const url = "http://localhost:4000/api/comment/" + mediaId;
    console.log('url',url);

    axios.get(url)
        .then((res) => {
            setComments(res);
    });

    const displayMediaComments = comments.map((comment) => {
        return (
            <div>

                <p>{comment.message}</p>
                <p>hello world</p>
            </div>
        )
    })

    return (
        <div>
            <Avatar />
            <div>
                {displayMediaComments}
            </div>
        </div>
    );
};


