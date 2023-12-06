// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import tareaModel from "../db/tarea.ts";

// Middleware para validar los datos del cuerpo de la solicitud
const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, status, trabajador, empresa } = req.body;
  if (!name || !status || !trabajador || !empresa) {
    res.status(400).send("Name, status, trabajador, and empresa are required");
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

const addTarea = async (
  req: Request,
  res: Response,
) => {
  try {
    // Validar los datos del cuerpo de la solicitud antes de realizar la operación
    validateRequestBody(req, res, () => {});

    const { name, status, trabajador, empresa } = req.body;

    const alreadyExists = await tareaModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Tarea already exists");
      return;
    }

    const newTarea = new tareaModel({ name, status, trabajador, empresa });
    await newTarea.save();

    res.status(200).send({
      name: newTarea.name,
      status: newTarea.status,
      trabajador: newTarea.trabajador,
      empresa: newTarea.empresa,
    });
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default addTarea;
