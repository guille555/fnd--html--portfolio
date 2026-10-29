import { Router } from "express";
import { PortfolioController } from "../controller/portfolio.controller.ts";

const router = Router();
const controlador = new PortfolioController();

router.get("/api/proyectos", controlador.getProyectos);

export default router;
