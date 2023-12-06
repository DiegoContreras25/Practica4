// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import trabajadorModel from "../db/trabajador.ts";

// Middleware para validar el formato del ID
const validateIdFormat = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    res.status(400).send({ error: "Invalid ID format" });
    return;
  }
  next();
};

// Middleware para manejar errores
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
};

const getTrabajador = async (
  req: Request,
  res: Response,
) => {
  try {
    // Validar el formato del ID antes de realizar la operación
    validateIdFormat(req, res, () => {});

    const { id } = req.params;
    const trabajador = await trabajadorModel.findById(id).exec();

    if (!trabajador) {
      res.status(404).send("Trabajador no encontrado");
      return;
    }

    res.status(200).send({
      name: trabajador.name,
      Empresa: trabajador.Empresa,
      tareas: trabajador.tareas,
    });
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default getTrabajador;
