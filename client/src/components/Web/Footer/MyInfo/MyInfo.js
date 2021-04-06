import React from 'react'
import Logo from "../../../../assets/images/png/LogoMenuTopNew.png";
import SocialLinks from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
    return (
        <div className="my-info">
           <img src={Logo} alt="Antonio Ramirez Monsalve"/>
           <h4>Entra en el mundo del desarrolo Web, y  disfruta creando proyectos de todo tipo.</h4>
           <SocialLinks/>
        </div>

    )
}
