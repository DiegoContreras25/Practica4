import mongoose from "npm:mongoose@7.6.3";
import { Empresa } from "../types.ts";

const Schema = mongoose.Schema;

const empresaSchema = new Schema(
  {
    name: { type: String, required: true },
    Trabajadores: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Trabajadores",
      required: true,
    },
  },
  { timestamps: true },
);

export type empresaModelType = mongoose.Document & Omit<Empresa, "id">;

export default mongoose.model<empresaModelType>("empresa", empresaSchema);
