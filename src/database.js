const mongoose = require("mongoose");
const URI =
  "mongodb+srv://manu84:Servidor2@cluster0.ddwml.mongodb.net/demo_mongodb?retryWrites=true&w=majority";

//En la siguiente línea se especifica la conexión a la base de datos local o remota (en este caso es remota en Mongo Atlas)
mongoose
  .connect(URI)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
