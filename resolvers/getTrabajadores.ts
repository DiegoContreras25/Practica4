// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import trabajadorModel from "../db/trabajador.ts";

// Middleware para manejar errores
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
};

const getTrabajadores = async (
  req: Request,
  res: Response,
) => {
  try {
    const trabajadores = await trabajadorModel.find().exec();

    if (!trabajadores || trabajadores.length === 0) {
      res.status(404).send("Trabajadores no encontrados");
      return;
    }

    const trabajadorData = trabajadores.map((trabajador) => ({
      name: trabajador.name,
      empresa: trabajador.Empresa,
      tareas: trabajador.tareas,
    }));

    res.status(200).json(trabajadorData);
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default getTrabajadores;
