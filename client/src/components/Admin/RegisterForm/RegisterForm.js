import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { loginApi } from "../../../api/user";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";

import "./RegisterForm.scss";

export default function RegisterForm() {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    privatePolicy: false,
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privatePolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privatePolicy") {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;
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

    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };

  const register = async () => {
    console.log(formValid);
    const {
      name,
      lastName,
      email,
      password,
      repeatPassword,
      privatePolicy,
    } = input;
    const nameVal = name;
    const lastNameVal = lastName;
    const emailVal = email;
    const passwordVal = password;
    const repeatPasswordVal = repeatPassword;
    const privatePolicyVal = privatePolicy;
    if (
      !nameVal ||
      !lastNameVal ||
      !emailVal ||
      !passwordVal ||
      !repeatPasswordVal ||
      !privatePolicyVal
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (passwordVal != repeatPasswordVal) {
        notification["error"]({
          message: "contraseñas incorrectas",
        });
      } else {
        const result = await loginApi(input);
        if (!result.ok) {
          notification["error"]({
            message: result.message,
          });
        } else {
          notification["success"]({
            message: result.mesagge,
          });
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
      input[i].classList.remove("success");
      input[i].classList.remove("error");
    }

    setInput({
      name: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
      privatePolicy: false,
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privatePolicy: false,
    });
  };
  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          type="text"
          name="name"
          placeholder="Nombre"
          className="register-form-input"
          prefix={<UserOutlined style={{ color: "rgba(168, 171, 174 )" }} />}
          value={input.name}
          maxLength={50}
        />
      </Form.Item>

      <Form.Item>
        <Input
          type="text"
          name="lastName"
          placeholder="Apellido"
          className="register-form-input"
          prefix={<UserOutlined style={{ color: "rgba(168, 171, 174 )" }} />}
          value={input.lastName}
          maxLength={50}
        />
      </Form.Item>

      <Form.Item>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="register-form-input"
          prefix={<MailOutlined style={{ color: "rgba(168, 171, 174 )" }} />}
          onChange={inputValidation}
          value={input.email}
          maxLength={100}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form-input"
          prefix={<LockOutlined style={{ color: "rgba(168, 171, 174 )" }} />}
          onChange={inputValidation}
          value={input.password}
          maxLength={20}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="password"
          name="repeatPassword"
          placeholder="Repita su contraseña"
          className="register-form-input"
          prefix={<LockOutlined style={{ color: "rgba(168, 171, 174 )" }} />}
          onChange={inputValidation}
          value={input.repeatPassword}
          maxLength={20}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privatePolicy"
          checked={input.privatePolicy}
          onChange={inputValidation}
        >
          He leido y acepto la politica de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form-button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
