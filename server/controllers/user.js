const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
const { Mongoose } = require("mongoose");

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

function getUsersActive(req,res){
  
  const query =  req.query;
  User.find({active: query.active}).then(users=>{
    if(!users){
      res.status(404).send({message: "No se han encontrado usuarios"})
    }else{
      res.status(200).send({users})
    }
  });
}
module.exports = {
  Login, //funcion que crea nuevo usuario
  signIn, // funcion que hace el login de usuarios ya registrados
  getUsers,
  getUsersActive,
};
