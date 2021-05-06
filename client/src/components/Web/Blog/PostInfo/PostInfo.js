import React, {useState,useEffect} from 'react';
import {Spin,notification, message} from "antd";
import Helmet from "react-helmet";
import moment from "moment";
import "moment/locale/es";
import {getPostApi} from "../../../../api/post"

import "./PostInfo.scss";
export default function PostInfo(props) {
    const {url} = props;
    const [postInfo,setPostInfo] = useState(null);

    useEffect(()=>{
        getPostApi(url).then(response =>{
            if(response.code !== 200){
                notification["warning"]({
                    message : response.message
                })
            }else{
                setPostInfo(response.post)
            }
        }).catch(() =>{
            notification["error"]({
                message:"Error del servidor"
            })
        })
    },[url])

    if(!postInfo){
        return (
            <Spin tip="Cargando" style={{width:"100%",padding:"200px 0"}} />
        )
    }

    return (
        <>
        <Helmet>
            <title>{postInfo.title} | Antonio Ramirez Monsalve</title>
        </Helmet>
        <div className="post-info">
           <h1 className="post-info-title">{postInfo.title}</h1>
             <div className="post-info-creation-date">
                    {moment(postInfo.date).locale("es").format("LL")}
             </div>

             <div className="post-info-description"
                   dangerouslySetInnerHTML={{__html:postInfo.description}}
              />
            
        </div>
        </>
    )
}
