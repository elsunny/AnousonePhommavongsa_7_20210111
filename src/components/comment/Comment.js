import React, {useState, useEffect} from 'react';
import Avatar from 'components/avatar/Avatar';
import axios from 'axios';
import CommentDeleteEvent from 'events/CommentDelete';
import './Comment.scss';

export const Comment = (props) => {

    const { comment } = props;
    const [commentUser, setCommentUser] = useState(null);

    // récupération des données de l'utilisateur de sesssion
    const me = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        const url = "/api/user/" + comment.UserId;
        axios
            .get(url)
            .then((res) => setCommentUser(res.data))
            .catch((err) => console.error(err));
    }, [comment.UserId]);

     // supprime les commentaires
     const removeComment = (comment) => {
        const commentUrl = "/api/comment/" + comment.id;
        axios.delete(commentUrl).then((res) => {
            document.dispatchEvent(new CommentDeleteEvent(comment));
        });
    };

    return (
        <div className='userComment'>
            <Avatar user={commentUser} />
            <div className="userComment-box">
                <p>{props.comment.message}</p>
                {(me.role === "admin" || me.role === "moderator" || me.id === comment.UserId) && (
                    <button
                        onClick={(e) => removeComment(comment)}
                    >
                        supprimer
                    </button>
                )}
            </div>
        </div>
    )
}
