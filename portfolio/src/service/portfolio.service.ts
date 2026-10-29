const JSON_SERVER_URL = "http://localhost:8591/proyectos";

export type Proyecto = {
  id: number,
  nombre: string,
  descripcion: string,
  tecnologias: Array<String>,
  visibilidad: boolean
};

export class PortfolioService {
  async getAll(): Promise<Proyecto[]> {
    const resultado = await fetch("http://localhost:8591/proyectos");
    return resultado.json();
  }

  async save(proyecto: Proyecto): Promise<Proyecto> {
    const resultado = await fetch("http://localhost:8591/proyectos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(proyecto)
    });
    return resultado.json();
  }

  async update(proyecto: Proyecto): Promise<Proyecto> {
    const resultado = await fetch(`http://localhost:8591/proyectos/${proyecto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(proyecto)
    });
    return resultado.json();
  }

  async delete(id: number): Promise<Proyecto> {
    const resultado = await fetch(`http://localhost:8591/proyectos/${id}`, {
      method: "DELETE"
    });
    return resultado.json();
  }
}
