import { Router } from "express";
import { SimulacionControlller } from "./controllers/simulacion.controller";
import { UsuarioController } from "./controllers/usuario.controller";

const ruta = Router();

const usuarioRoute = Router();
usuarioRoute.get("/:hash", UsuarioController.get);
usuarioRoute.post("", UsuarioController.post);
usuarioRoute.put("", UsuarioController.put);

ruta.use('/usuario',usuarioRoute);

const simulacionRoute = Router();
simulacionRoute.get("", SimulacionControlller.get);
simulacionRoute.post("", SimulacionControlller.post);
simulacionRoute.put("", SimulacionControlller.put);

ruta.use('/simulacion',simulacionRoute);

export default ruta;