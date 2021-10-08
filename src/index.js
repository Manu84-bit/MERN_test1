const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./database.js");

//app, en el back, es el servidor
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev")); //Para tener mensajes en consola de las peticiones al servidor
app.use(express.json()); //Cada vez que llegue un dato, comprueba que sea json , y convierte los datoas a json

//Routes para obtener los datos de las peticiones a la bd
app.use("/api/task", require("./routes/task.routes.js"));

//Static files
//De esta forma el servidor envía el html public del front al puerto especificado
app.use(express.static(path.join(__dirname, "public")));

//Starting the server

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
