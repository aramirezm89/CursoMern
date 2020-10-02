import { Result } from "antd";
import { basePath, apiVersion } from "./config";

export function loginApi(data) {
  const url = `${basePath}/${apiVersion}/login`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return {
          ok: true,
          mesagge: "Usuario creado con exito",
        };
      }
      return {
        ok: false,
        message: result.message,
      };
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
      };
    });
}

export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.accessToken) {
        return {
          ok: true,
          mesagge: result.message,
        };
      } else {
        return {
          ok: false,
          message: result.message,
        };
      }
    })

    .catch((err) => {
      return err.message;
    });
}
