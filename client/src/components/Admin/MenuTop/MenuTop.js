import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Logo from "../../../assets/images/png/LogoMenuTop.png";
import { logout } from "../../../api/auth";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "./MenuTop.scss";
export default function (props) {
  const { menuCollapsed, setMenuCollapsed } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top-left">
        <a href="/admin">
          <img className="menu-top-left-logo" src={Logo} alt="logo" />
        </a>
        <Link to="/admin" />
        <Button
          type="link"
          onClick={() => setMenuCollapsed(!menuCollapsed)}
          icon={
            menuCollapsed ? (
              <MenuUnfoldOutlined title="Abrir Menu" />
            ) : (
              <MenuFoldOutlined title="Cerrar Menu" />
            )
          }
        ></Button>
      </div>
      <div className="menu-top-right">
        <Button
          title="Salir"
          type="link"
          onClick={logoutUser}
          icon={<PoweroffOutlined />}
        ></Button>
      </div>
    </div>
  );
}
