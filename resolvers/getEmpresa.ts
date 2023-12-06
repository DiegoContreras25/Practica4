// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import empresaModel from "../db/empresa.ts";

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

const getEmpresa = async (
  req: Request,
  res: Response,
) => {
  try {
    // Validar el formato del ID antes de realizar la operación
    validateIdFormat(req, res, () => {});

    const { id } = req.params;
    const empresa = await empresaModel.findById(id).exec();

    if (!empresa) {
      res.status(404).send("Empresa no encontrada");
      return;
    }

    res.status(200).send({
      name: empresa.name,
      Trabajadores: [empresa.Trabajador],
    });
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default getEmpresa;
