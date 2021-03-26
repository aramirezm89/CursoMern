import React from 'react';
import {Row,Col,Card} from "antd";
import {ClockCircleOutlined,KeyOutlined,MessageOutlined, UserOutlined
,DollarOutlined,CheckCircleOutlined} from '@ant-design/icons';

import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
    return (
       <Row className="how-my-courses-work">
           <Col lg={24} className="how-my-courses-work-title">
               <h2>Como funcionan mis cursos</h2>
               <h3>
                   Cada curso cuenta con contenido bajo la web de Udemy, activa las 24 
                   horas del día, los 365 dias del año.
               </h3>
           </Col>

           <Col lg={4}/>
           <Col lg={16}>
               <Row className="row-cards">
                 <Col md={8}>
                    <CardInfo
                        avatar={<ClockCircleOutlined/>}
                        title={"Cursos y Clases"}
                        description="Cursos de entre 10 a 30 horas, y cada clase del curso con duracion maxima de 
                        15 minutos."
                    />
                 </Col>

                 <Col md={8}>
                    <CardInfo
                        avatar={<KeyOutlined/>}
                        title="Accesos 24/7"
                        description="Accede a los cursos en cualquier momento, desde cualquier luegar sin importar
                        día y hora."

                    />
                 </Col>

                 <Col md={8}>
                    <CardInfo
                        avatar={<MessageOutlined/>}
                        title= "Aprendizaje colaborativo"
                        description="Aprende de los demás dejando tus dudas para que profesores y compañeros te ayuden."

                    />
                 </Col>
               </Row>

               <Row className="row-cards">
                 <Col md={8}>
                    <CardInfo
                        avatar={<UserOutlined/>}
                        title={"Mejora tu perfil"}
                        description="Aprende y mejora tu perfil para mantenerte informado de actualizaciones."

                    />
                 </Col>

                 <Col md={8}>
                    <CardInfo
                        avatar={<DollarOutlined/>}
                        title="Presios bajos"
                        description="Obten el curso que necesitas por solo 9.99 y ten acceso a el por tiempo ilimitado."

                    />
                 </Col>

                 <Col md={8}>
                    <CardInfo
                        avatar={<CheckCircleOutlined/>}
                        title= "Certificados de finalización"
                        description="Al completar tu curso recibiras tu certificación por parte de Udemy."

                    />
                 </Col>
               </Row>
           </Col>
           <Col lg={4}/>
       </Row>
    )
}


function CardInfo(props){
    const {avatar, title, description} = props;
    const {Meta} = Card;

    return(
        <Card className="how-my-courses-work-card">
           
            <Meta avatar={avatar} title={title} description={description}/>
          
        </Card>
    )

    
}