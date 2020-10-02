import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Logo from "../../../assets/images/png/LogoMenuTop.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "./MenuTop.scss";
export default function (props) {
  const { menuCollapsed, setMenuCollapsed } = props;

  return (
    <div className="menu-top">
      <div className="menu-top-left">
        <a href="/admin">
          <img className="menu-top-left-logo" src={Logo} alt="logo" />
        </a>
        <Link to="/admin" />
        <Button
          type="link"
          title="Menu"
          onClick={() => setMenuCollapsed(!menuCollapsed)}
          icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
      </div>
      <div className="menu-top-right">
        <Button
          className="btn-shutdown"
          title="Salir"
          type="link"
          onClick={() => console.log("Desconexion")}
          icon={<PoweroffOutlined />}
        ></Button>
      </div>
    </div>
  );
}
