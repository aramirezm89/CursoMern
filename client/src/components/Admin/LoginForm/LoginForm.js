import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./LoginForm.scss";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../../utils/constants";
import { signInApi } from "../../../api/user";

export default function LoginForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
  });

  const changeForm = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const inputValidation = (e) => {
    const { name, type } = e.target;
    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }

    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6),
      });
    }
  };
  const login = async () => {
    const result = await signInApi(input);

    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification["success"]({
        message: "Bienvenido ",
      });

      window.location.href = "/admin";
    }
  };
  return (
    <Form className="login-form" onChange={changeForm} onFinish={login}>
      <Form.Item>
        <Input
          type="email"
          name="email"
          placeholder="Ingrese su email"
          className="login-form-input"
          prefix={<UserOutlined style={{ color: "rgba(168, 171, 174 )" }} />}
          maxlength={50}
          value={input.email}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form-input"
          prefix={<LockOutlined style={{ color: "rgba(168, 171, 174 )" }} />}
          maxlength={20}
          value={input.password}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form-button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
