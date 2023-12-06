import mongoose from "npm:mongoose@7.6.3";
import { Trabajador } from "../types.ts";

const Schema = mongoose.Schema;

const trabajadorSchema = new Schema(
  {
    name: { type: String, required: true },
    Empresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empresa",
      required: false,
    },
    tareas: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tarea",
      required: false,
    },
  },
  { timestamps: true },
);

export type trabajadorModelType = mongoose.Document & Omit<Trabajador, "id">;

export default mongoose.model<trabajadorModelType>(
  "trabajador",
  trabajadorSchema,
);
