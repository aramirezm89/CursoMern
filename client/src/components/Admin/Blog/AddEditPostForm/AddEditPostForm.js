import React,{useState,useEffect} from 'react';
import {Row,Col,Form,Input,Button,DatePicker,notification, ConfigProvider} from "antd";
import {FontSizeOutlined,LinkOutlined} from "@ant-design/icons";
import moment from "moment";
import 'moment-timezone';
import locale from 'antd/es/date-picker/locale/es_ES';
import {Editor} from "@tinymce/tinymce-react"
import {getAccessTokenApi} from "../../../../api/auth";
import {addPostApi,editPostAPi} from "../../../../api/post"
import "./AddEditPostForm.scss";
export default function AddEditPostForm(props) {
    const {setIsVisibleModal,setReloadPosts,post} = props;
    const [postData,setPostData] = useState({});

    useEffect(() =>{
        if(post){
            setPostData(post);
        }else{
            setPostData({});
        }
    },[post])

    const processPost = () =>{
       const {title,url,description,date} = postData ;

       if(!title||!url||!description||!date){
           notification["error"]({
               message:"Todos los campos son obligatiorios."
           })
       }else{
        if(post){
           editPost()
        }else{
            addPost();
        }
       } 
    }

    const addPost = () =>{
        const accesToken = getAccessTokenApi();
        addPostApi(accesToken,postData).then(response =>{
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
                message:response.message
            })
            setIsVisibleModal(false);
            setReloadPosts(true);
            setPostData({});
        }).catch(() => {
            notification["error"]({
                message:"Error del servidor"
            })
        })
    }

    const editPost = () =>{
        const accessToken = getAccessTokenApi();
        editPostAPi(accessToken,post._id,postData).then( response =>{
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
                message: response.message
            })
             setIsVisibleModal(false);
             setReloadPosts(true);
             setPostData({})

        }).catch(() =>{
            notification["error"]({
                message:"Error del servidor"
            })
        })
    }

    return (
        <div className="add-edit-post-form">
            <AddEditForm postData={postData} setPostData={setPostData} post={post} processPost={processPost}/>
        </div>
    )
}

function AddEditForm(props){
    const {postData,setPostData,post,processPost} = props;

    return(
            <Form
             className="add-edit-post-form"
             onFinish={processPost}
             >
                <Row gutter={24}>
                    <Col span={8}>
                       <Form.Item>
                       <Input 
                            prefix={<FontSizeOutlined />}
                            placeholder="Titulo"
                            value={postData.title}
                            onChange={e => setPostData({...postData, title:e.target.value})}
                        />
                       </Form.Item>
                    </Col>
                    <Col span={8}>
                       <Form.Item>
                       <Input 
                            prefix={<LinkOutlined />}
                            placeholder="url"
                            value={postData.url}
                            onChange={e => setPostData({...postData, url:transformTextToUrl( e.target.value)})}
                        />
                       </Form.Item>
                    </Col>
                    <Col span={8}>
                       <Form.Item>
                            <DatePicker
                                locale={locale}
                                style={{width:"100%"}}
                                format="DD/MM/YY HH:mm:ss"
                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss'), }}
                                placeholder="Fecha depublicación"
                                value={postData.date && moment(postData.date)}
                                 onChange={(e,value) => 
                                    setPostData({
                                        ...postData, 
                                        date: moment(value,"DD/MM/YY HH:mm:ss").toISOString()
                                    })
                                }
                           />
                       </Form.Item>
                    </Col>
                    
                </Row>

                <Editor
                   
                   initialValue={postData.description ? postData.description : ""}
                    init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                     
                    }}

                    onBlur={e => setPostData({...postData,description: e.target.getContent()})}
                />
                <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-submit" 
                >
                    {post ? "Actualizar post" : "Crear post"}
                </Button>
            </Form>
      
    )
}

function transformTextToUrl(text){
    const url = text.replace(" ","-")
    return url.toLowerCase();
}