import React, {useState,useCallback,useEffect}from 'react'
import {Avatar,Form,Input,Select,Button,Row,Col, notification} from "antd"
import {UserOutlined,MailOutlined,LockOutlined} from "../../../../node_modules/@ant-design/icons"
import {updateUserApi,uploadAvatarApi,getAvatarApi} from "../../../api/user";
import {getAccessTokenApi} from "../../../api/auth";
import {useDropzone} from "react-dropzone";
import {
    emailValidation,
    minLengthValidation,
  } from "../../../utils/formValidation";
  


import NoAvatar from "../../../assets/images/png/9.1 no-avatar.png"

import "./EditUserForm.scss"


export default function EditUserForm(props){
    const {user,setIsVisibleModal,setReloadUsers} = props;
    const [avatar,setAvatar] = useState(null)
    const [userData,setUserData] =  useState({})

 
    useEffect(()=>{
      setUserData({
        name: user.name,
        lastName : user.lastName,
        email: user.email,
        password: "",
        repeatPassword:"",
        role: user.role,
        avatar: user.avatar

      })
    },[user])

    useEffect(()=>{
        if (user.avatar){
            getAvatarApi(user.avatar).then(response =>{
                setAvatar(response);
            })
        }else{
            setAvatar(null);
        }
    },[user])



    useEffect(() => {
        if(avatar){
            setUserData({
                ...userData,
                avatar : avatar.file
            });
        }
    }, [avatar]);



   
     
    const updateUser = () => {
       
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if(!userUpdate.name || !userUpdate.lastName || !userUpdate.email || !userUpdate.password || !userUpdate.repeatPassword ){
            notification["error"]({
                message: "Todos los campos son obligatorios."
            })
           
    }else{ 
         

        if(userUpdate.password !== userUpdate.repeatPassword || userUpdate.password.length <6){
            notification["error"]({
              message:  "Las contraseñas deben ser iguales o la contraseña es menor a 6 caracteres."
             
            })
           
        } else{

            delete userUpdate.repeatPassword;
           
            if( typeof  userUpdate.avatar ==="object"){
                uploadAvatarApi(token,userUpdate.avatar, user._id).then(response =>{
                    userUpdate.avatar = response.avatarName;
                    updateUserApi(token,userUpdate,user._id).then( result =>{
                        notification["success"]({
                            message: result.message
                        });
                    });
                });
                setUserData({
                    name: user.name,
                    lastName : user.lastName,
                    email: user.email,
                    password: "",
                    role: user.role,
                    avatar: user.avatar
                  
                   })
                   setIsVisibleModal(false)
                   setReloadUsers(true)
            }else{
                
                updateUserApi(token,userUpdate,user._id).then(result =>{
                    notification["success" ]({
                        message: result.message
                    });
                    setUserData({
                        name: user.name,
                        lastName : user.lastName,
                        email: user.email,
                        password: "",
                        role: user.role,
                        avatar: user.avatar
                      
                       })

                       setIsVisibleModal(false)
                       setReloadUsers(true)
                });

              
            }

     } }
    }


    return(
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
             <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}  />
        </div>
    )
}

function UploadAvatar(props){
    const {avatar,setAvatar} = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(()=>{
        if(avatar){
            if(avatar.preview){
                setAvatarUrl(avatar.preview)
            }else{
                setAvatarUrl(avatar)
            }
        }else{
            setAvatarUrl(null)
        }
    },[avatar])

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0]
            setAvatar({file,preview : URL.createObjectURL(file)});
        },
        [setAvatar]

    );
   
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyBoard: true,
        onDrop
 
    });

    return(

        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ):(
                <Avatar size={150} src={avatar ? avatarUrl : NoAvatar} />
            )}
        </div>
    )

}

function EditForm(props){
    const{ userData, setUserData, updateUser} = props
    const {Option} = Select;


    const changeForm = (e) => {
       
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      
    };


    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
      });
    
     

    const inputValidation = (e) => {
        const { type, name } = e.target;
      
        if (type === "email") {
          setFormValid({
            ...formValid,
            [name]: emailValidation(e.target),
          });
          
        }
    
        if (type === "password") {
          setFormValid({
            ...formValid,
            [name]: minLengthValidation(e.target, 6),
          });
        }
    
        if (type === "checkbox") {
          setFormValid({
            ...formValid,
            [name]: e.target.checked,
          });
        }
      };

    return(
       <Form className="form-edit"
             onFinish={updateUser}
             onChange={changeForm}
       >
        <Row gutter={24}>
            <Col span={12}> 
              <Form.Item>
                 <Input prefix={<UserOutlined/>}
                 name= "name"
                  placeholder="Nombre"
                  value={userData.name}
                  maxLength={50}
                  />
               
              </Form.Item>
            </Col>
            <Col span={12}> 
                <Form.Item>
                    <Input prefix={<UserOutlined/>}
                        name = "lastName"
                        placeholder="Apellido"
                        value={userData.lastName}
                       maxLength={50}
                    />
                </Form.Item>
            
             </Col>
        </Row>

        <Row gutter={24}>
            <Col span={12}> 
                <Form.Item>
                    <Input prefix={<MailOutlined/>}
                        name = "email"
                        type="email"
                        placeholder="Correo"
                        value={userData.email}
                        onChange={inputValidation}
                        maxLength={100}
                       
                    />
                </Form.Item>
           
            </Col>
            <Col span={12}>  
                <Form.Item>
                      <Select
                           placeholder="Selecciona un rol"
                            value={userData.role}
            
                        >
                            <Option value= "admin">Administrador</Option>
                            <Option value = "editor">Editor</Option>
                            <Option value = "reviewer">Revisor</Option>

                        </Select>
                </Form.Item>
           
            </Col>
        </Row>

        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        name= "password"
                        prefix={<LockOutlined/>}
                        type="password"
                        value={userData.password}
                        placeholder="Contraseña"
                        onChange={inputValidation}
                        maxLength={20}
                      
                    />
                </Form.Item>
                
             </Col>

            <Col span={12}> 
            
            <Form.Item>
                    <Input
                       name="repeatPassword"
                        prefix={<LockOutlined/>}
                        type="password"
                        defaultValue=""
                        value={userData.repeatPassword}
                        placeholder="Repita su Contraseña"
                        onChange={inputValidation}
                        maxLength={20}
                    />
                </Form.Item>
             </Col>
        </Row>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit">
                Actualizar Usuario
            </Button>
        </Form.Item>
       </Form>
    )
}