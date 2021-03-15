import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import {
  UserAddOutlined,
  LockOutlined,
  MailOutlined,
} from "../../../../node_modules/@ant-design/icons";
import { singUpAdminApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";

import "./AddUserForm.scss";

export default function AddUserForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});

  const addUser = () => {
    if (
      !userData.name ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !userData.role
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas deben ser iguales.",
      });
      
    } else {
      const accessToken =  getAccessTokenApi();

      singUpAdminApi(accessToken, userData)
      .then(response => {
          notification["success"]({
            message: response
          
          })
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch((err) => {
          notification["error"]({ message: err });
        });
    }
  };

  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  const [inputValid, setInputValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
  });

  const inputValidation = (e) =>{
    const {type, name} = e.target;

    if(type ==="email"){
      setInputValid({
        ...inputValid,
        [name]: emailValidation(e.target)
      })
    }

    if(type ==="password"){
      setInputValid({
        ...inputValid,
        [name]: minLengthValidation(e.target,6)
      })
    }

  }

  return (
    <Form className="form-add" onFinish={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) => {

                setUserData({
                  ...userData,
                  name: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              placeholder="Apeliido"
              value={userData.lastName}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  lastName: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  email: e.target.value,
                });
              },inputValidation}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un rol"
              onChange={(e) => {
                setUserData({
                  ...userData,
                  role: e,
                });
              }}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              name="password"
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              value={userData.password}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  password: e.target.value,
                });
              },inputValidation}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              name="password"
              prefix={<LockOutlined />}
              placeholder="Repita su contraseña"
              value={userData.repeatPassword}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  repeatPassword: e.target.value,
                });
              },inputValidation}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
