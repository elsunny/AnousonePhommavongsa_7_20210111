
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Avatar from "components/avatar/Avatar";
import axios from "axios";
import CommentAddEvent from "events/CommentAdd";
import "./CommentAdd.scss";


export const CommentAdd = (props) => {

    const user = JSON.parse(sessionStorage.getItem("user"));


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
        <div className="comment-add">
            <Avatar user={user} />
            <form className="comment-add-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("userComment")}
                    type="text"
                    id="userComment"
                    className="comment-add-form-text"
                    name="userComment"
                />
                <input className="comment-add-form-submit" type="submit" />
            </form>
        </div>
    );
};
