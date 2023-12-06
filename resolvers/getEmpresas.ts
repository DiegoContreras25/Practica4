// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import empresaModel from "../db/empresa.ts";

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
    const empresa = await empresaModel.find().exec();

    if (!empresa || empresa.length === 0) {
      res.status(404).send("Empresa no encontrada");
      return;
    }

    const empresaData = empresa.map((empresa) => ({
      name: empresa.name,
      trabajadores: empresa.Trabajadores,
    }));

    res.status(200).json(empresaData);
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};

export default getEmpresa;
