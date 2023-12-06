// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import empresaModel from "../db/empresa.ts";

// Middleware para validar los datos del cuerpo de la solicitud
const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, Trabajadores } = req.body;
  if (!name || !Trabajadores) {
    res.status(400).send("Name and trabajadores are required");
    return;
  }
  if (Trabajadores > 10) {
    res.status(400).send("No puede haber más de 10 trabajadores por empresa");
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

const addEmpresa = async (
  req: Request,
  res: Response,
) => {
  try {
    // Validar los datos del cuerpo de la solicitud antes de realizar la operación
    validateRequestBody(req, res, () => {});

    const { name, Trabajadores } = req.body;

    const alreadyExists = await empresaModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Empresa already exists");
      return;
    }

    const newEmpresa = new empresaModel({ name, Trabajadores });
    await newEmpresa.save();

    res.status(200).send({
      name: newEmpresa.name,
      Trabajadores: [newEmpresa.Trabajador],
    });
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default addEmpresa;
