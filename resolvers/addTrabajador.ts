// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import trabajadorModel from "../db/trabajador.ts";

// Middleware para validar los datos del cuerpo de la solicitud
const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, Empresa, tareas } = req.body;
  if (!name || !Empresa || !tareas) {
    res.status(400).send("Name, Empresa, and tareas are required");
    return;
  }
  if (tareas > 10) {
    res.status(400).send("Un trabajador no puede tener mas de 10 tareas");
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

const addTrabajador = async (
  req: Request,
  res: Response,
) => {
  try {
    // Validar los datos del cuerpo de la solicitud antes de realizar la operación
    validateRequestBody(req, res, () => {});

    const { name, Empresa, tareas } = req.body;

    const alreadyExists = await trabajadorModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Trabajador already exists");
      return;
    }

    const newTrabajador = new trabajadorModel({ name, Empresa, tareas });
    await newTrabajador.save();

    res.status(200).send({
      name: newTrabajador.name,
      Empresa: newTrabajador.Empresa,
      tareas: newTrabajador.tareas,
    });
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default addTrabajador;
