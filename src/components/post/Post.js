import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Avatar from "components/avatar/Avatar";
import "./Post.scss";

export default function Post() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    

    return (
        <div className="postCard">
            <div className="postCard_avatar">
                <Avatar />
            </div>
            <form
                className="postCard_form"
                id="postForm"
                name="postForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit((data) => {

                    const formData = new FormData();
                    formData.append('title', data.title);
                    formData.append('description', data.description);
                    formData.append('file', data.filename[0]);


                    const url="http://localhost:4000/api/media/";

                    console.log("data", data);
                    console.log("register", data.filename[0].name);

                    axios
                        .post(url, formData)
                        .then((res) => {
                            console.log('parti formData', formData);
                        })
                        .catch((err) => console.error(err));
                })}
            >
                <div>
                    <input {...register("title")} name='title' placeholder="Titre" />
                    <p>{errors.mediaTitle?.message}</p>
                </div>
                <div>
                    <input
                        {...register("description")}
                        name='description'
                        placeholder="Votre description"
                    />
                    <p>{errors.mediaDescription?.message}</p>
                </div>
                <div className="postCard_control">
                    <input
                        {...register("filename")}
                        type="file"
                        name='filename'
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
