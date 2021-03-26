import React from 'react';
import {Row,Col,Card,Avatar} from "antd";
import AvatarPersona from "../../../assets/images/jpg/ericCartmanAvatar.jpg"

import "./ReviewsCourses.scss"

export default function ReviewsCourses() {
    return (
      <Row className="reviews-courses">
         
              <Col lg={4}/>
              <Col lg={16} className="reviews-courses-title">
                <h2>Forma parte de los mas de 35.000 estudiantes que estan aprendiendo con mis cursos.</h2>
              </Col>
              <Col lg={4}/>
         
          
                <Col lg={4}/>
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview 
                                name="Alonso Camargo"
                                description="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor es claro con los contenidos."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name="Fabiola Cancino"
                                description="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="El profesor explica detalladamente como funciona react y reponde rapidamente a la dudas."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name="Carolina Saez"
                                description="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Gran curso de react me ayudo bastante a comprenderlo y estoy encantado con los conocimientos adquiridos. ."
                            />
                        </Col>
                    </Row>
                </Col>
              <Col lg={4}/>
          
      </Row>

      
    )
}


function CardReview(props){
    const {name,description,avatar,review} =  props;
    const {Meta} = Card;

    return(
        <Card className="reviews-courses-card">
            <p>{review}</p>
            <Meta 
                avatar={<Avatar src={avatar}/>}
                title={name}
                description={description}

            />
        </Card>
    )
}