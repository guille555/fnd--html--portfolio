import type { Request, Response } from "express";
import { PortfolioService } from "../service/portfolio.service.ts";

const portfolioService = new PortfolioService();

export class PortfolioController {

  public async getProyectos(req: Request, res: Response): Promise<void> {
    let proyectos;
    try {
      proyectos = await portfolioService.getAll();
      res.status(200).json(proyectos);
    } catch (error) {
      res.status(500).json({error: "error de serviccio"})
    }
  }

  public async crearProyecto(req: Request, res: Response): Promise<void> {
    let proyecto;
    let nuevo;
    try {
      nuevo = req.body;
      proyecto = await portfolioService.save(nuevo);
      res.status(200).json({ codigo: 200, datos: proyecto });
    } catch (error) {
      res.status(500).json({error: "error de serviccio"})
    }
  }
}
