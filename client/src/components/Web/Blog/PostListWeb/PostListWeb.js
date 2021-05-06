import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Helmet from "react-helmet";
import {Spin,List,notification, message} from "antd";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
import {getPostsApi} from "../../../../api/post";
import "moment/locale/es";

import "./PostListWeb.scss";

export default function PostListWeb(props) {
    const {location,history} = props;
    const [posts, setPost] = useState(null);
    const {page =1} = queryString.parse(location.search);
    
    useEffect(() =>{
        getPostsApi(page,12).then(response =>{
            if(response.code !==200){
                notification["warning"]({
                    message:response.message
                })
            }else{
                setPost(response.posts)
            }
        }).catch( () =>{
            notification["error"]({
                message:"Error del servidor."
            })
        })
    },[page])

        if(!posts){
            return(
                   <Spin tip="Cargando" style={{width:"100%", padding:"200px 0"}} />
                )
        }
    return (
        <>
          <Helmet>
              <title>Blog de programación | Antonio Ramirez Monsalve</title>
          </Helmet>
            <div className="posts-list-web">
                <h1>Blog</h1>
                    <List dataSource={posts.docs}
                        renderItem={post => <Post post={post}/>}
                    />
                    <Pagination 
                        posts={posts} 
                        location={location}
                        history={history}
                    />
            </div>
        </>
    )

}

function Post(props){
    const {post} = props;
    const day = moment(post.date).format("DD");
    const month = moment(post.date).format("MMM")


   return(
    <List.Item className="post">
       <div className="post-date">
            <span>{day}</span>
            <span>{month}</span>
       </div>
     
      <Link to={`blog/${post.url}`}>
            {post.title}
      </Link>
      <List.Item.Meta title="" />
      
   </List.Item>
  )
}