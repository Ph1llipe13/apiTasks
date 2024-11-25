import express from "express";
import taskController from "../controllers/taskController.js";

const route = express.Router();

route.get("/tasks", taskController.listarTask);
route.get("/tasks/busca", taskController.buscaPorUsuarioId)
route.put("/tasks/:id", taskController.atulizarTask);
route.delete("/tasks/:id", taskController.deletarTask)
route.post("/tasks", taskController.cadastrarTask);

export default route;