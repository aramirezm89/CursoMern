//importar layouts

import LayoutAdmin from "../layouts/LayoutsAdmin";
import LayoutBasic from "../layouts/LayoutsBasic";
//importar admin pages
import AdminHome from "../pages/admin";
import AdminLogin from "../pages/admin/Login";
import AdminUsers from "../pages/admin/Users";
//pages normal
import Home from "../pages/Home";
import Contact from "../pages/Contac";
//pages error404
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      { path: "/admin", component: AdminHome, exact: true },
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
        component: Error404,
      },
    ],
  },
];

export default routes;
