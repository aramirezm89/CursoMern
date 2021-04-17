const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
const { Mongoose } = require("mongoose");
const { exists } = require("../models/user");
const { response } = require("express");

function Login(req, res) {
  const user = new User();
  const { name, lastName, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastName = lastName;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "debe ingresar ambas contraseñas" });
  } else if (password !== repeatPassword) {
    res.status(404).send({ message: "Las contraseñas no coinciden" });
  } else {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña" });
      } else {
        user.password = hash;
        user.save((err, userStored) => {
          if (err) {
            res
              .status(500)
              .send({ message: "Error de servidor o el usuario ya existe" });
          } else if (!userStored) {
            res.status(404).send({ message: "Error al crear usuario" });
          } else {
            res.status(200).send({ user: userStored });
          }
        });
      }
    });
    // res.status(404).send({ message: "Usuario Registrado" });
  }
}

function signIn(req, res) {
  const params = req.body;
  console.log(params);
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!userStored) {
        res.status(404).send({
          message: "Usuario no encontrado",
        });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor" });
          } else if (!check) {
            res.status(404).send({
              message: "Email o contraseña ingresada no valida",
            });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 200, message: "El usuario no esta activo" });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
}

function getUsers(req, res) {
  User.find().then((users) => {
    if (!users) {
      res.status(404).send({ message: "No se han encontrado usuarios" });
    } else {
      res.status(200).send({ users });
    }
  });
}

function getUsersActive(req, res) {
  const query = req.query;
  User.find({ active: query.active }).then((users) => {
    if (!users) {
      res.status(404).send({ message: "No se han encontrado usuarios" });
    } else {
      res.status(200).send({ users });
    }
  });
}

function uploadAvatar(req, res) {
  const params = req.params;

  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userData) {
        res.status(404).send({ message: "No se ha encontrado usuario" });
      } else {
        let user = userData;

        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("\\");
          let fileName = fileSplit[2];

          let extSplit = fileName.split(".");

          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpg") {
            res.status(400).send({
              message:
                "El formato  de la imagen no es valido. (Formatos de imagen permitidos: JPG , PNG",
            });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!userResult) {
                    res.status(404).send({ message: "Usuario no encontrado" });
                  } else {
                    res.status(200).send({ avatarName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({ message: "El avatar que buscas no existe" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

async function updateUser(req, res) {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." });
      } else {
        userData.password = hash;
      }
    });
  }

  User.findOneAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!userUpdate) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        res.status(200).send({ message: "Usuario actualizado con exito." });
      }
    }
  });
}

function activateUser(req, res) {
  const { id } = req.params;
  let { active } = req.body;

  User.findOneAndUpdate({ _id: id }, { active }, (err, userStored) => {
    if (err) {
      response.status(500).send({
        message: "Error del servidor.",
      });
    } else {
      if (!userStored) {
        response.status(404).send({ message: "Usuario no encontrado." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Usuario activado con exito." });
        } else {
          res.status(200).send({ message: "Usuario desactivado con exito." });
        }
      }
    }
  });
}

function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndDelete({ _id: id }, (err, userDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor." });
    } else {
      if (!userDeleted) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        res.status(200).send({ message: "Usuario eliminado con exito." });
      }
    }
  });
}

function singUpAdmin(req, res) {
  const user = new User();

  const { name, lastName, email, role, password } = req.body;

  user.name = name;
  user.lastName = lastName;
  user.email = email.toLowerCase();
  user.role = role;
  user.active = true;

  if (!password) {
    res
      .status(500)
      .send({ message: "Debe ingresar una contraseña para el usuario." });
  } else {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." });
      } else {
        user.password = hash;

        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "El usuario ya existe" });
          } else {
            if (!userStored) {
              res.status(500).send({ message: "Error al crear el usuario." });
            } else {
              res.status(200).send({
                user: userStored,
                message: "Usuario creado con exito."
              });
            }
          }
        });
      }
    });
  }
}

module.exports = {
  Login, //funcion que crea nuevo usuario
  signIn, // funcion que hace el login de usuarios ya registrados
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
  activateUser,
  deleteUser,
  singUpAdmin,
};
