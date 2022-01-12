import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";
import { Pseudo } from "components/pseudo/Pseudo";
import { Comment } from "components/comment/Comment";
import { CommentsByMedia } from "components/comment/CommentsByMedia";
import "./ShowMedia.scss";
import MediaAddEvent from "events/MediaAdd";

const baseUrl = "http://localhost:4000/api/media";

export default function ShowMedia() {
    const [media, setMedia] = useState(null);

    useEffect(() => {
        axios.get(baseUrl).then((res) => {
            setMedia(res.data);
        });
    }, []);

    useEffect(() => {
        const callback = (event)=>{
            setMedia([event.detail, ...media]);
            console.log('callback', event);
        };
        document.addEventListener(MediaAddEvent.event, callback )
        return ()=>{
            document.removeEventListener(MediaAddEvent.event, callback);
        }
    })

    if (!media) return null;

    const getMediaToDisplay = media.map(item => {
        return (
            <div className="showMedia" key={"media" + item.id}>
                <div className="showMedia_header">
                    <Avatar />
                    <Pseudo userNumber={item.UserId}/>
                </div>
                <div className="showMedia_title">
                    <h3>{item.title}</h3>
                </div>
                <div className="showMedia_image">
                    <img
                        src={`http://localhost:4000/images/${item.filename}`}
                        alt="your media here"
                    />
                </div>
                <div>{item.description}</div>
                <div>
                    <Comment mediaNumber={item.id} />
                </div>
                <div>
                    <CommentsByMedia mediaNumber={item.id} />
                </div>
            </div>
        );
    });

    return getMediaToDisplay;
}
