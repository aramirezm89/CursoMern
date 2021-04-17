import React,{useState,useEffect} from 'react';
import {Form,Button,Input,notification} from "antd";
import {KeyOutlined,GiftOutlined,DollarOutlined,LinkOutlined} from "@ant-design/icons";
import {addCourseApi, updateCourseApi } from "../../../../api/course"

import "./AddEditCourseForm.scss";
import { getAccessTokenApi } from '../../../../api/auth';

export default function AddEditCourseForm(props) {
    const {setIsVisibleModal, setReloadCourses, courses} = props;
    const [courseData, setCourseData] = useState({});

    useEffect(() =>{
       courses ? setCourseData(courses) : setCourseData({});
    },[courses])


    const addCourse = () =>{
       
        if(!courseData.idCourse){
            notification["error"]({
                message:"La id del curso es obligatoria."
            })
        }else{
            const accesToken =  getAccessTokenApi();
            addCourseApi(accesToken, courseData).then(response =>{
                const typeNotification = response.code === 200 ? "success" : "warning"

                notification[typeNotification]({
                    message: response.message
                })

                setIsVisibleModal(false);
                setReloadCourses(true);
                setCourseData({});
            }).catch( () =>{
                notification["error"]({
                    message:"Error del servidor, intentelo más tarde"
                })
            })
        }
    }

    const updateCourse = () =>{
       const accesToken = getAccessTokenApi();

       updateCourseApi(accesToken,courses._id,courseData).then(response =>{
           const typeNotification = response.code === 200 ? "success" :"warning";

           notification[typeNotification]({
                message: response.message
           })
           setIsVisibleModal(false);
           setReloadCourses(true);
           setCourseData({});
       })
       .catch( () =>{
           notification["error"]({
               message:"Error del servidor, intentelo más tarde."
           })
       })

    }

    return (
        <div className="add-Edit-course-form">
            <AddEditForm
                courses={courses}
                addCourse={addCourse}
                updateCourse={updateCourse}
                setCourseData = {setCourseData}
                courseData = {courseData}
            />
        </div>
    )
}

function AddEditForm(props){
    const {addCourse,updateCourse,courses,courseData,setCourseData} = props;
  
    return(
            <Form 
            className="form-add-edit"
            onFinish={courses ?() => updateCourse() : ()=> addCourse()}
            >
                <Form.Item>
                    <Input 
                        prefix={<KeyOutlined/>}
                        placeholder="ID del curso"
                        value={courseData.idCourse}
                        onChange={e => setCourseData({...courseData, idCourse: e.target.value})}
                        disabled={courses ?true : false}
                    />
                </Form.Item>
                <Form.Item>
                    <Input 
                        prefix={<LinkOutlined/>}
                        placeholder="URL del curso"
                        value={courseData.link}
                        onChange={e => setCourseData({...courseData, link:e.target.value})}
                    />
                </Form.Item>
                <Form.Item>
                    <Input 
                        prefix={<GiftOutlined/>}
                        placeholder="Cupon de descuento"
                        value={courseData.coupon}
                        onChange={ e => setCourseData({...courseData, coupon: e.target.value})}
                    />
                </Form.Item>
                <Form.Item>
                    <Input 
                        prefix={<DollarOutlined/>}
                        placeholder="Precio del curso"
                        value={courseData.price}
                        onChange={ e => setCourseData({...courseData, price: e.target.value})}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                     type="primary"
                     htmlType="submit"
                     className="btn-submit"
                    >
                        {courses ? "Actualizar curso" : "Crear curso"}
                    </Button>
                </Form.Item>
            </Form>
        )

}