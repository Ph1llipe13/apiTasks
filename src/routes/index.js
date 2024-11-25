import express from "express";
import routeUsuarios from "./usuariosRoutes.js";
import routeTask from "./taskRoutes.js";

// const route = express.Router();

const routes = (app)=>{
    app.route("/").get((req, res) =>{
        res.status(200).json({Inicio: "Projeto"});
    });
    app.use(express.json(), routeUsuarios, routeTask)
}

export default routes;