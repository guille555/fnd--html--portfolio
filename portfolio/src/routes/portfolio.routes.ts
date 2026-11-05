import { Router } from "express";
import { PortfolioController } from "../controller/portfolio.controller.ts";

const router = Router();
const controlador = new PortfolioController();

router.get("/api/proyectos", controlador.getProyectos);

router.get("/api/proyectos/:id", controlador.buscarProyecto);

router.post("/api/proyectos/nuevo", controlador.crearProyecto);

router.put("/api/proyectos/actualizar", controlador.actualizarProyecto);

router.delete("/api/proyectos/eliminar/:id", controlador.eliminarProyecto);

export default router;
