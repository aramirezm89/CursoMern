import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined,MenuOutlined,BookOutlined,MessageFilled} from "@ant-design/icons";
import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;
  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin" title="Volver a la pagina principal">
          <Link to={"/admin"}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users" title="Menu Usuarios">
          <Link to={"/admin/users"}>
            <UserOutlined />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/menu" title="Menu Web">
          <Link to={"/admin/menu"}>
            <MenuOutlined />
            <span className="nav-text">Menu</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/courses" title="Menu Cursos">
            <Link to={"/admin/courses"} />
            <BookOutlined/>
            <span className="nav-text">Cursos</span>
        </Menu.Item>
        <Menu.Item key="/admin/blog" title="Menu Post">
          <Link to={"/admin/blog"}/>
          <MessageFilled/>
          <span className="nav-text">Blog</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
