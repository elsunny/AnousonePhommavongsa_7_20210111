import React from 'react';
import { useForm } from "react-hook-form";
import Avatar from 'components/avatar/Avatar';
import axios from 'axios';

export const Comment = (props) => {

    const {
        register,
        handleSubmit,
    } = useForm();
    
    const mediaId = props.mediaNumber;
    const url = "http://localhost:4000/api/comment/" + mediaId;

    const onSubmit = (data)=> {
        axios.post(url, {
            message: data.userComment,
        })
            .then(res => console.log('res', res))
    };

    return (
        <div>
            <Avatar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("userComment")} type="text" id="userComment" name="userComment" />
                <input type="submit" />
            </form>
        </div>
    )
}
