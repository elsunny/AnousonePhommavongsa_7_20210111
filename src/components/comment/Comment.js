import React, {useState, useEffect} from 'react';
import Avatar from 'components/avatar/Avatar';
import axios from 'axios';
import CommentDeleteEvent from 'events/CommentDelete';

export const Comment = (props) => {

    const { comment } = props;

    const [commentUser, setCommentUser] = useState(null);

    const me = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        const url = "http://localhost:4000/api/user/" + comment.UserId;
        axios
            .get(url)
            .then((res) => setCommentUser(res.data))
            .catch((err) => console.error(err));
    }, [comment.UserId]);

     // supprime les commentaires
     const removeComment = (comment) => {
        const commentUrl = "http://localhost:4000/api/comment/" + comment.id;
        axios.delete(commentUrl).then((res) => {
            document.dispatchEvent(new CommentDeleteEvent(comment));
        });
    };

    return (
        <div>
            <Avatar user={commentUser} />
                <p>{props.comment.message}</p>
                {(me.role === "admin" || me.role === "moderator" || me.id === comment.UserId) && (
                    <button
                        style={{ cursor: "pointer" }}
                        onClick={(e) => removeComment(comment)}
                    >
                        supprimer
                    </button>
                )}
        </div>
    )
}
