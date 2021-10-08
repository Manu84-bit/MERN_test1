const express = require("express");
const router = express.Router();
const Task = require("../models/task.js");
//Cuando se entre a la ruta inicial "/", el router responderá un request con una respuesta
//cuando la petición se hace a la api, devolverá los resultados en forma de json, consultando
//la base de datos

//Método router para acceder a la bd en mongo y traer todos los datos de la colección (tabla en sql)especificada
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.json(tasks);
});

//Método router para acceder a la bd en mongo y traer un solo dato de la colección (tabla en sql)especificada
router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

//router para agregar documentos (datos, registros en sql) a la colección (tabla en sql)
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description});
  await task.save();
  res.json({ status: "new task saved" });
});

//para actualizar un documento se usa el método put y, como parámetro, se usa el id del documento (del dato)
router.put('/:id', async (req, res) => {
  const { title, description } = req.body; //los datos que manda el cliente
  const newTask = { title, description }; //se crea objeto con esos datos
  await Task.findByIdAndUpdate(req.params.id, newTask); //actualiza el documento editado con los nuevos datos
  res.json({ status: "task updated" });
});

//para borrar un documento (registro) se usa el método DELETE

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "task deleted" });
});

module.exports = router;
