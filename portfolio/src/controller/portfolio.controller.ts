import type { Request, Response } from "express";
import { PortfolioService, type Proyecto } from "../service/portfolio.service.ts";

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

  public async actualizarProyecto(req: Request, res: Response): Promise<void> {
    let datos;
    let proyectoActualizado: Proyecto;
    let proyecto: Proyecto;
    try {
      datos = req.body;
      proyecto = await portfolioService.getProyecto(datos.id);
      proyecto = { ...proyecto, ...datos };
      proyectoActualizado = await portfolioService.update(proyecto);
      res.status(201).json({ codigo: 201, datos: proyecto });
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "error de serviccio"})
    }
  }

  public async eliminarProyecto(req: Request, res: Response): Promise<void> {
    try {
      let id = req.params.id as string;
      let proyecto = await portfolioService.getProyecto(id);
      await portfolioService.delete(proyecto.id);
      res.status(200).json({ codigo: 201, datos: proyecto });
    } catch (error) {
      res.status(500).json({error: "error de serviccio"})
    }
  }

  public async buscarProyecto(req: Request, res: Response): Promise<void> {
    try {
      let val = req.params.id as string;
      let proyecto = await portfolioService.getProyecto(val);
      res.status(200).json({ codigo: 201, ok: true, datos: proyecto });
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "error de serviccio", ok: false})
    }
  }
}
