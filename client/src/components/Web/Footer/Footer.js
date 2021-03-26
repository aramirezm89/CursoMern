import React from 'react';
import {Layout,Row,Col} from "antd";

import "./Footer.scss";
export default function Footer() {
    const {Footer} = Layout;
    
    return (
        <Footer className="footer">
            <Row>
                <Col md={4}/>
                <Col md={16}>
                    <Row>
                        <Col md={8}>
                            Mi informacion
                        </Col>
                        <Col md={8}>
                            Navegacion
                        </Col>
                        <Col md={8}>
                            Newslater 
                        </Col>
                    </Row>
                    <Row className="footer-copyright">
                         <Col md={12}>
                             2020 ALL RIGHTS RESERVED.
                         </Col>
                         <Col md={12}>
                             ANTONIO RAMIREZ MONSALVE | DESARROLLADOR WEB.
                         </Col>
                    </Row>
                </Col>
                <Col md={4}/>
            </Row>


        </Footer>
    )
};
