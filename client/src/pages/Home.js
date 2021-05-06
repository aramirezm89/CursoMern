import React from "react";
import MainBanner from "../components/Web/MainBanner";
import Helmet from "react-helmet";
import HomeCourses from "../components/Web/HomeCourses";
import HowMyCoursesWork from "../components/Web/HowMyCoursesWork";
import ReviewsCourses from "../components/Web/ReviewsCourses";
export default function Home() {
  return (
   <>
        <Helmet>
           <title>Antonio Ramirez Monsalve</title>
        </Helmet>
        <MainBanner/>
        <HomeCourses />
        <HowMyCoursesWork/>
        <ReviewsCourses/>
   </>
  );
}
