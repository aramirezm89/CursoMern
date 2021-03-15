import React,{useState,useEffect} from 'react'
import {Switch,List,Button,Modal as ModalAntd,notification} from "antd";
import {EditOutlined,DeleteOutlined} from "../../../../../node_modules/@ant-design/icons";
import Modal from "../../../../Modal";
import  DragSortableList from "react-drag-sortable";
import {updateMenuApi,activateMenuApi,deleteMenuApi} from "../../../../api/menu"
import {getAccessTokenApi} from "../../../../api/auth"
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from "..//EditMenuWebForm";

import "./MenuWebList.scss";


const {confirm} = ModalAntd;
export default function MenuWebList(props){
const {menu, setReloadMenuWeb} =  props;
const [listItems, setListItems] = useState([]);
const [isVisibleModal, setIsVisibleModal] =  useState(false);
const [modalTitle, setModalTitle] = useState("");
const [modalContent , setModalContent] = useState(null);


useEffect(()=>{
    const listItemsArray = [];

    menu.forEach(item =>{
      listItemsArray.push({
      content:(
      <MenuItems item={item} 
                activateMenu={activateMenu} 
                editMenuWebModal={editMenuWebModal} 
                deleteMenu={deleteMenu}
      />
        )})
    });
    setListItems(listItemsArray);
  },[menu])

  const activateMenu = (menu,status) =>{
    const accessToken = getAccessTokenApi();
    activateMenuApi(accessToken,menu._id,status).then(response=>{
      notification["success"]({
        message: response
      });
    });
  }

const onSort = (sortedList,dropEvent) =>{
 
  const accesToken = getAccessTokenApi();

  sortedList.forEach( item =>{
     const {_id} = item.content.props.item;
     const order = item.rank;
     updateMenuApi(accesToken,_id,{order});
  })
 }

  const  addMenuWebModal = () =>{
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo Menú");
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    )
  }

  const deleteMenu = menu =>{
   
    const accesToken = getAccessTokenApi();

    confirm({
      title:"Eliminando menu",
      content:`¿Estas seguro que deseas eliminar el menu ${menu.title}`,
      okText:"Eliminar",
      okType:"danger",
      cancelText:"cancelar",
      onOk(){
        deleteMenuApi(accesToken,menu._id).then(response => {
          notification["success"]({
            message: response
          });
          setReloadMenuWeb(true)
        }).catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde."
          })
        })
      }
    })
  }

  const editMenuWebModal = menu =>{
    setIsVisibleModal(true);
    setModalTitle(`Editando Menu: ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb = {setReloadMenuWeb}
        menu = {menu}
      />
    )
  }

 return(
     <div className="menu-web-list">
        <div className="menu-web-list_header">
            <Button type="primary" onClick={addMenuWebModal}>Crear menú</Button>
        </div>
        <div className="menu-web-list_items">
            <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
        </div>

        <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        >
          {modalContent}
        </Modal>
     </div>
 )
}





function MenuItems(props){
  const {item, activateMenu, editMenuWebModal,deleteMenu} = props;

  return(
    <List.Item
     actions={[
      <Switch defaultChecked={item.active} 
      onChange={e => activateMenu(item,e)
     
      }/>,
      <Button type={"primary"} onClick={() => editMenuWebModal(item)}>
          <EditOutlined/>
      </Button>,
      <Button type="danger" onClick={()=>deleteMenu(item)}>
          <DeleteOutlined/>
      </Button>
     ]}>

      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  )
}