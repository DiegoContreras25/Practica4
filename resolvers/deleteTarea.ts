// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import tareaSchema, { tareaModelType } from "../db/tarea.ts";

// Middleware para validar el formato del ID
const validateIdFormat = (
  req: Request,
  res: Response,
  next: () => void,
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

export const deleteTarea = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>,
) => {
  try {
    // Validar el formato del ID antes de realizar la operación
    validateIdFormat(req, res, () => {});

    const id = req.params.id;
    const subject = await tareaSchema.findByIdAndDelete(id).exec();

    if (!subject) {
      res.status(404).send({ error: "Tarea not found" });
      return;
    }

    res.status(200).send("Tarea deleted");
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};
