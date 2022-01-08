import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "components/avatar/Avatar";
import "./ShowMedia.scss";

const baseUrl = "http://localhost:4000/api/media";

export default function ShowMedia() {
    const [media, setMedia] = useState(null);

    useEffect(() => {
        axios.get(baseUrl).then((res) => {
            setMedia(res.data);
        });
    }, []);

    if (!media) return null;

    const getMediaToDisplay = media.map(item => {
        return (
            <div className="showMedia">
                <div className="showMedia_header">
                    <Avatar />
                    <div>Pseudo</div>
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
            </div>
        );
    });

    return getMediaToDisplay;
}
