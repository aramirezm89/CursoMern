const mongoose = require("mongoose");
const app = require("./app");
const { API_VERSION, IP_SERVER, PORT_DB, PORT_SERVER } = require("./config");
mongoose.set("useFindAndModify", false);

mongoose.connect(
  // `mongodb://${IP_SERVER}:${PORT_DB}/ProyectoCurso`, url base de dato local
  `mongodb+srv://aramirezm:ramirez1989@webpersonalcursomern1.frbky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("conexion DB correcta");
      app.listen(PORT_SERVER, () => {
        console.log("##################");
        console.log("#### API REST#####");
        console.log("##################");
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
      });
    }
  }
);
//mongoose.connect(`mongodb//localhost:27017/ProyectoCurso`); forma estatica de acceder a base de dato
