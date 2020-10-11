import React,{useState} from 'react';
import {Switch,List,Avatar,Button} from "antd";
import {EditOutlined,StopOutlined,DeleteOutlined,CheckOutlined  } from "@ant-design/icons";

 import NoAvatar from "../../../assets/images/png/9.1 no-avatar.png"
 import ".//ListUsers.scss"

 export default function ListUsers(props){
     const {usersActive, usersInactive} =  props;
     const [viewUsersActive, setViewUsersActive] = useState(true)
    
     return(
        
         <div className="list-users">
             <div className="list-users-switch">
                <Switch defaultChecked onChange={()=>{
                    setViewUsersActive(!viewUsersActive)
                }}
                />
                <span>
                    {viewUsersActive ? " Usuarios Activos" : " Usuarios Inactivos"}
                </span>
             </div>
            {viewUsersActive ? <UsersActive usersActive={usersActive}/> : <UsersInactive usersInactive={usersInactive}/> }

         </div>
     )
 }

 function UsersActive(props){
     const {usersActive} = props;
     return (
         <List 
         className="users-active"
         itemLayout="horizontal"
         dataSource={usersActive}
         renderItem={user => (
             <List.Item
             
                actions={[
                    <Button
                       type="primary"
                        onClick={()=> console.log("Editar Usuario...")}
                        icon={<EditOutlined/>}
                    />,

                    <Button
                        type="danger"
                        onClick={()=> console.log("Desactiva Usuarios..")}
                        icon={<StopOutlined/>}
                    />,
                    <Button
                    type="danger"
                    onClick={()=>console.log("Elimar Usuario...")}
                    icon={<DeleteOutlined/>}
                    />

                  
                    
                ]}
             
             >
                
                 <List.Item.Meta
                    avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar}/>}
                    title={`
                    ${user.name ? user.name : "No existe nombre"}
                    ${user.lastName ? user.lastName : "No existe Apellido"}
                 
                    `  
                    }
                    description={user.email}
                 />
             </List.Item>
         )}
         />
     )
 }

 function UsersInactive(props){
     const {usersInactive} = props
    return ( 
        <List 
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersInactive}
        renderItem={user => (
            <List.Item
            
               actions={[
                   <Button
                      type="primary"
                       onClick={()=> console.log("Activar Usuario...")}
                       icon={<CheckOutlined/>}
                   />,

                
                   <Button
                   type="danger"
                   onClick={()=>console.log("Elimar Usuario...")}
                   icon={<DeleteOutlined/>}
                   />

                 
                   
               ]}
            
            >
               
                <List.Item.Meta
                   avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar}/>}
                   title={`
                   ${user.name ? user.name : "No existe nombre"}
                   ${user.lastName ? user.lastName : "No existe Apellido"}
                
                   `  
                   }
                   description={user.email}
                />
            </List.Item>
        )}
        />
    )
}