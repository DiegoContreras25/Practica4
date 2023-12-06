// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import tareasModel from "../db/tarea.ts";

// Middleware para manejar errores
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
};

const getTareas = async (
  req: Request,
  res: Response,
) => {
  try {
    const tareas = await tareasModel.find().exec();

    if (!tareas || tareas.length === 0) {
      res.status(404).send("Tarea no encontrada");
      return;
    }

    const tareaData = tareas.map((tarea) => ({
      name: tarea.name,
      status: tarea.status,
      trabajador: tarea.trabajador,
      empresa: tarea.empresa,
    }));

    res.status(200).json(tareaData);
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default getTareas;
