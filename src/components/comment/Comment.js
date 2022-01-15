import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Avatar from "components/avatar/Avatar";
import axios from "axios";
import CommentAddEvent from "events/CommentAdd";
import "./Comment.scss";


export const Comment = (props) => {

    // cherche l'utilisateur de session
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/user/me")
            .then((res) => setUser(res.data));
    }, []);


    // traitement du commentaire 
    const { register, handleSubmit, reset } = useForm();

    const mediaId = props.mediaNumber;
    const url = "http://localhost:4000/api/comment/" + mediaId;

    const onSubmit = (data) => {
        axios
            .post(url, {
                message: data.userComment,
            })
            .then((res) =>
                document.dispatchEvent(new CommentAddEvent(res.data))
            )
            .catch((err) => console.error(err));
        // efface le formulaire
        reset();
    };

    return (
        <div className="commentaire">
            <Avatar user={user} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("userComment")}
                    type="text"
                    id="userComment"
                    name="userComment"
                />
                <input type="submit" />
            </form>
        </div>
    );
};
