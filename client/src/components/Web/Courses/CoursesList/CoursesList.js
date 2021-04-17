import React,{useState,useEffect} from 'react';
import {Row,Col,Card,Button,Rate,notification} from "antd";
import {getCourseDataUdemyApi} from "../../../../api/course"

import "./CoursesList.scss";
export default function CoursesList(props) {
    const {courses} = props;
    return (
        <div className="courses-list">
           <Row>
              {courses.map(course => (
                  <Col md={8} className="courses-list-course">
                      <Course key={course._id} course={course} />
                  </Col>
              ))}
           </Row>
        </div>
    )
}

function Course(props){
    const {course} = props;
    const {Meta} = Card;
    const [courseInfo, setCourseInfo] = useState({});
    const [urlCourse, setUrlCourse] = useState("");
   
    useEffect(() => {
       getCourseDataUdemyApi(course.idCourse).then(response =>{
             if(response.code !==200){
                 notification["warning"]({
                     message: response.message
                 })
             }else{
                 setCourseInfo(response.data)
                 mountUrl(response.data.url);
             }
       }).catch(() =>{
            notification["error"]({
                message:"Error del servidor, intentelo más tarde."
            })
       })
    }, [course]);

    const mountUrl = url =>{
        if(!course.link){
            const baseUrl = `https://www.udemy.com${url}`;
            const finalUrl = baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "" );
            setUrlCourse(finalUrl);
        }else{
            setUrlCourse(course.link);
        }
    }

    return(
        <a href={urlCourse} target="_blank" rel="noopener noreferrer"> 
            <Card 
            cover={<img src={courseInfo.image_480x270} alt={courseInfo.title}/>}
            >
             <Meta 
                title={courseInfo.title}
                description={courseInfo.headline}
             />
             <Button>Entrar al curso</Button>
             <div className="courses-list-course-footer">
                <span>{course.price ? `${course.price}`: courseInfo.price}</span>
                    <div>
                        <Rate disabled={true} defaultValue={5}/>
                    </div>
             </div>
            </Card>
        </a>
    )
}