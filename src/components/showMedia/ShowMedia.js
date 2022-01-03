import React, { useState, useEffect } from 'react';
import axios, { interceptors } from 'axios';
import Avatar from 'components/avatar/Avatar';
import "./ShowMedia.scss";

const baseUrl = "http://localhost:4000/api/media";

export default function ShowMedia() {

    const [media, setMedia] = useState(null);

    useEffect(()=>{
        axios.get(baseUrl).then((res) => {
            setMedia(res.data);
        });
    },[]);

    if (!media) return null;

    interceptors.request.use(config=> {
        const accessToken = localStorage.getItem("accessToken"); // a changer avec le cookies
        
        //checking if accessToken exists
        if(accessToken){
          config.headers["Authorization"]=accessToken;
          }
        
        return config;
      });

    return (
        <div className='showMedia'>
            <div className="showMedia_header">
                <Avatar />
                <div>Pseudo</div>
                <div>close button</div>
            </div>
            <div>{media.title}</div>
            <div>
                <img src={media.filename} alt="your media here" />
            </div>
            <div>
                {media.description}
            </div>
        </div>
    )
}
