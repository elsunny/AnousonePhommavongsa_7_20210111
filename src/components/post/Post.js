import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "components/avatar/Avatar";
import "./Post.scss";

export default function Post() {

    // const [postMedia, setPostMedia] = useState(null);
    // const [file, setFile] = useState();
    
    // const handleFile = (e) => {
    //     setFile(e.target.files[0]);
    //     console.log('file', file);
    
    // }

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
                onSubmit={handleSubmit((data) => {
                    console.log('data', data);
                })}
                className="postCard_form"
            >
                <div>
                    <input
                        {...register("mediaTitle")}
                        placeholder="Titre"
                    />
                    <p>{errors.mediaTitle?.message}</p>
                </div>
                <div>
                    <input
                        {...register("mediaDescription")}
                        placeholder="Votre description"
                    />
                    <p>{errors.mediaDescription?.message}</p>
                </div>
                <div className="postCard_control">
                    {/* <input
                        type="file"
                        name="postCard_control_add"
                        value="Ajouter une photo"
                        className="postCard_control_add"
                        onChange={handleFile}
                    /> */}
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
