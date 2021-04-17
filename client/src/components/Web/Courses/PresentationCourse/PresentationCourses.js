import React from 'react';
import AcademyLogo from "../../.././../assets/images/png/17.1 academy-logo.png";


import "./PresentationCourses.scss";

export default function PresentationCourse() {
    return (
        <div className="presentation-courses">
             <img src={AcademyLogo} alt="Cursos" />
             <p>
                 En esta pagina encontraras enlaces a los mejores cursos online de programacion. Cursos de Udemy
                 los cuales estan impartidos por profesores muy capacitados. Si tienes ganas de aprender a programar
                 o de aprender nuevas tecnologias este es tu lugar.
             </p>
             <p>
                 Échales un vistazo y aprovecha las ofertas.!!!
             </p>
        </div>
    )
}
