import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import addEmpresa from "./resolvers/addEmpresa.ts";
import addTarea from "./resolvers/addTarea.ts";
import addTrabajador from "./resolvers/addTrabajador.ts";
import { deleteEmpresa } from "./resolvers/deleteEmpresa.ts";
import { deleteTarea } from "./resolvers/deleteTarea.ts";
import { deleteTrabajador } from "./resolvers/deleteTrabajador.ts";
import getEmpresas from "./resolvers/getEmpresas.ts";
import getTareas from "./resolvers/getTareas.ts";
import getTrabajador from "./resolvers/getTrabajador.ts";
import getTrabajadores from "./resolvers/getTrabajadores.ts";
import getTarea from "./resolvers/getTarea.ts";
import getEmpresa from "./resolvers/getEmpresa.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const mongo_usr: string | undefined = env.MONGO_USR ||
  Deno.env.get("MONGO_USR");
const mongo_pwd: string | undefined = env.MONGO_PWD ||
  Deno.env.get("MONGO_PWD");
const mongo_uri: string | undefined = env.MONGO_URI ||
  Deno.env.get("MONGO_URI");
const db_name: string | undefined = env.DB_NAME || Deno.env.get("DB_NAME");

//CTRL+SHIF+P ->deno initialize
//CTRL+SHIF+P ->deno initialize
if (!mongo_usr || !mongo_pwd || !mongo_uri || !db_name) {
  console.log("Missing env values");
  Deno.exit(1);
}

await mongoose.connect(
  `mongodb+srv://${mongo_usr}:${mongo_pwd}@${mongo_uri}/${db_name}?retryWrites=true&w=majority`,
);

const app = express();
app.use(express.json());
app
  .post("/addEmpresa", addEmpresa)
  .post("/addTarea", addTarea)
  .post("/addTrabajador", addTrabajador)
  .delete("/deleteEmpresa/:id", deleteEmpresa)
  .delete("/deleteTarea/:id", deleteTarea)
  .delete("/deleteTrabajador/:id", deleteTrabajador)
  .get("/getEmpresas", getEmpresas)
  .get("/getTareas", getTareas)
  .get("/getTrabajadores", getTrabajadores)
  .get("/getTrabajador/:id", getTrabajador)
  .get("/getTarea/:id", getTarea)
  .get("/getEmpresa/:id", getEmpresa);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
