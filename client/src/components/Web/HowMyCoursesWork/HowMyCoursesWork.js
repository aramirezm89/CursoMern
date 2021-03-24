import React from 'react';
import {Row,Col,Card} from "antd";
import { } from '@ant-design/icons';

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
                 
                 </Col>

               </Row>
           </Col>
           <Col lg={4}/>
       </Row>
    )
}


function CardInfo(props){
    const {icon, title, subtitle} = props;
    const {Meta} = Card;

    
}