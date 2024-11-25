import express from "express";
import usuarioController from "../controllers/usuarioController.js";

const route = express.Router()

route.get("/usuarios", usuarioController.listarUsuario)
route.put("/usuarios/senha/:id", usuarioController.atualizarSenhaDeUsuario)
route.put("/usuarios/:id", usuarioController.atualizarUsuario)
route.delete("/usuarios/:id", usuarioController.deletarUsuario)
route.post("/usuarios", usuarioController.cadastrarUsuarios)

export default route;