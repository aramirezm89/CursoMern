import React from 'react';
import {Row,Col,Card, Button} from "antd";
import {Link} from "react-router-dom";
import reactJsHooks from "../../../assets/images/jpg/react-js-hooks.jpg";
import reactNative from "../../../assets/images/jpg/react-native.jpg";
import javaScript from "../../../assets/images/jpg/javascript-es6.jpg";
import wordPress from "../../../assets/images/jpg/wordpress.jpg";
import prestaShop from "../../../assets/images/jpg/prestashop-1-7.jpg";
import cssGrid from "../../../assets/images/jpg/css-grid.jpg";


import "./HomeCourses.scss"

export default function HomeCourses() {
    return (
      <Row className="home-courses">
          <Col lg={24} className="home-courses-title">
              <h2>Aprende y mejora tus habilidades.</h2>
          </Col>
          <Col lg={4}/>
          <Col lg={16}>
                <Row className="row-courses">
                    <Col md={6}>
                        <CardCourse 
                        image={reactJsHooks}
                        title="React Js Hooks"
                        subtitle="intermedio - React/JavaScript"
                        link="https://www.udemy.com/course/react-js-de-cero-a-experto-creado-aplicaciones-reales/"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                        image={reactNative}
                        title="React Native Expo"
                        subtitle="intermedio - React/JavaScript"
                        link="https://www.udemy.com/course/react-native-expo-creando-mini-tripadvisor-de-restaurantes/"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                        image={javaScript}
                        title="JavaScript Es6"
                        subtitle="Basico - JavaScript"
                        link="https://www.udemy.com/course/master-javascript-y-es6-lo-ultimo-js-con-proyectos-reales/"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                        image={wordPress}
                        title="WordPress"
                        subtitle="Básico - WordPress"
                        link="https://www.udemy.com/course/crea-tu-web-wordpress-profesional-de-cero-a-experto-con-tienda/"
                        />
                    </Col>
                </Row>

                <Row className="row-courses">
                    <Col md={6}>
                            <CardCourse 
                            image={prestaShop}
                            title="PrestaShop 1.7"
                            subtitle="Básico - PrestaShop"
                            link="https://www.udemy.com/course/prestashop-1-7-crea-tu-tienda-online-de-0-a-experto/"
                            />
                    </Col>
                    <Col md={6}>
                            <CardCourse 
                            image={cssGrid}
                            title="CSS Grid"
                            subtitle="Intermedio - CSS"
                            link="https://www.udemy.com/course/css-grid-principiante-a-experto-creando-web-responsive/"
                            />
                    </Col>

                    <Col md={12}/>
                </Row>
          </Col>
          <Col lg={4}/>

          <Col lg={24} className="home-courses-more">
              <Link to="/courses">
                  <Button>Ver más</Button>
              </Link>
          </Col>

      </Row>
    );
}

function CardCourse(props){

    const {image,title,subtitle,link} = props;
    const {Meta} = Card;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card  
                className="home-courses-card"
                cover={<img src={image} alt={title}/>}
                actions={[<Button>INGRESAR</Button>]}
            >
              
                <Meta title={title} description={subtitle}/>
            </Card>
        </a>
    )
}


