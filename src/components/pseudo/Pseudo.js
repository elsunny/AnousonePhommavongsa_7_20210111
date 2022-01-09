import React, { useState, useEffect} from "react";
import axios from "axios";

const url = "http://localhost:4000/api/user";




export const Pseudo = (props) => {
    
    const [apiData, setapiData] = useState(null);
    const userNum = {id: props.userNumber};
    
    useEffect(()=> {
        axios.post(url, userNum)
            .then((res)=>{
                setapiData(res.data);
            })
    },[]);

    if (!apiData) return 'no data'; //ne marche pas sans
    return <div>{apiData.pseudo}</div>;
};
