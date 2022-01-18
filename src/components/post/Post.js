import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Avatar from "components/avatar/Avatar";
import "./Post.scss";
import MediaAddEvent from "events/MediaAdd";

export default function Post() {

    // récupération des informations sur l'utilisateur de session
    const user = JSON.parse(sessionStorage.getItem("user"));

    // récupération des données du formulaire et mise au bon format
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("file", data.filename[0]);

        const url = "/api/media/";

        axios
            .post(url, formData)
            .then((res) => {
                document.dispatchEvent(new MediaAddEvent(res.data));
            })
            .catch((err) => console.error(err));

        // efface le formulaire
        reset();
    };

    return (
        <div className="postCard">
            <div className="postCard_avatar">
                <Avatar user={user} />
            </div>
            <form
                className="postCard_form"
                id="postForm"
                name="postForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <input
                        {...register("title")}
                        name="title"
                        placeholder="Titre"
                    />
                    <p>{errors.mediaTitle?.message}</p>
                </div>
                <div>
                    <input
                        {...register("description")}
                        name="description"
                        placeholder="Votre description"
                    />
                    <p>{errors.mediaDescription?.message}</p>
                </div>
                <div className="postCard_control">
                    <label htmlFor="file-upload" className="custom-file-upload">
                         Ajouter photo
                    </label>
                    <input
                        {...register("filename")}
                        type="file"
                        id="file-upload"
                        name="filename"
                        className="postCard_control_add"
                    />
                    <input
                        type="submit"
                        name="postCard_control_publier"
                        value="Publier"
                        className="postCard_control_publier"
                    />
                </div>
            </form>
        </div>
    );
}
