import React,{useState,useEffect} from 'react';
import {List,Button,Modal as ModalAntd,notification} from "antd";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons"
import DragSortableList from "react-drag-sortable";
import Modal from "../../../../Modal"
import {getCourseDataUdemyApi,deleteCourseApi} from "../../../../api/course"
import {getAccessTokenApi} from "../../../../api/auth";

import "./CoursesList.scss";

const {confirm} = ModalAntd;

export default function CoursesList(props) {
    const {courses,setReloadCourses} = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
   
    const onSort= (sortedList, dropEvent) =>{
        console.log(sortedList);
    }

    const deleteCourse = courses =>{
        
        const accesToken = getAccessTokenApi();

        confirm({
            title:"Eliminando Curso",
            content:`Estas seguro que quieres eliminar el curso ${courses.idCourse}`,
            okText: "Eliminar",
            okType:"danger",
            cancelText:"Cancelar",
            onOk(){
                deleteCourseApi(accesToken,courses._id).then(response =>{
                    const typeNotification = response.code === 200 ? "success" : "warning";
                    notification[typeNotification]({
                        message:response.message,
                    });
                    setReloadCourses(true);
                }).catch(() =>{
                    notification["error"]({
                        message: "Error del servidor, intentalo más tarde."
                    })
                })
            }
        })
    }

    useEffect(() => {
        const listCoursesArray = [];
        courses.forEach(courses =>{
            listCoursesArray.push({
                content:(
                    <Course courses={courses} deleteCourse={deleteCourse}/>
                )
            });
            
        })
        setListCourses(listCoursesArray);
    }, [courses]);

    return (
        <div className="courses-list">
            <div className="courses-list-header">
                <Button 
                type="primary" 
                onClick={() => console.log("Creando curso...")}
                >
                    Nuevo curso
                </Button>
            </div>

            <div className="courses-list-items">
                {listCourses.length === 0 &&(
                    <h2 style={{ textAlign:"center", margin:0}}>
                        No tines cursos creados.
                    </h2>
                )}

                <DragSortableList items={listCourses} onSort={onSort} type="vertical"/>
            </div>
        </div>
        
        
    )
}

function Course(props){
    const {courses, deleteCourse} = props;
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
      getCourseDataUdemyApi(courses.idCourse).then(response =>{
          if(response.code !==200){
              notification["warning"]({
                  message:`EL curso con el id ${courses.idCourse} no se ha encontrado.`
              })
          }

          setCourseData(response.data);
      })
    }, [courses])

    if(!courseData){
        return null;
    }
  return(
      <List.Item
        actions={[
            <Button 
             type="primary"
             onClick={() => console.log("Editar Curso.")}
            >
              <EditOutlined/>
            </Button>,
              <Button 
              type="danger"
              onClick={() =>deleteCourse(courses)}
             >
               <DeleteOutlined/>
             </Button>

        ]}
      >
          <img 
          src={courseData.image_480x270} 
          alt={courseData.title} 
          style={{width:"100px", marginRight:"20px"}}
          />
          <List.Item.Meta 
            title={`${courseData.title} | ID:${courses.idCourse}`}
            description={courseData.headline}
          />

      </List.Item>
  )
}