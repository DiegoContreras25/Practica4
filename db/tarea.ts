import mongoose from "npm:mongoose@7.6.3";
import { Tarea } from "../types.ts";

const Schema = mongoose.Schema;

const tareaSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true },
    trabajador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trabajador",
      required: true,
    },
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "empresa",
      required: true,
    },
  },
  { timestamps: true },
);

export type tareaModelType = mongoose.Document & Omit<Tarea, "id">;

export default mongoose.model<tareaModelType>("tarea", tareaSchema);
