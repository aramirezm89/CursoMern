//importar layouts

import LayoutAdmin from "../layouts/LayoutsAdmin";
import LayoutBasic from "../layouts/LayoutsBasic";
//importar admin pages
import AdminHome from "../pages/admin";
import AdminLogin from "../pages/admin/Login";
import AdminUsers from "../pages/admin/Users";
import AdminMenuWeb from "../pages/admin/MenuWeb"
//pages normal
import Home from "../pages/Home";
import Contact from "../pages/Contac";
import Courses from "../pages/Courses"
//pages error404
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      { path: "/admin",
       component: AdminHome, 
       exact: true 
      },
      {
        path: "/admin/login",
        component: AdminLogin,
        exact: true,
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true,
      },
      {
        path:"/admin/menu",
        component: AdminMenuWeb,
        exact: true

      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contact,
        exact: true,
      },
      {
        path:"/courses",
        component:Courses,
        exact: true
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
