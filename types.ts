export type Empresa = {
  name: string;
  Trabajador: Trabajador[];
};
export type Trabajador = {
  name: string;
  Empresa: Empresa;
  tareas: Tarea[];
};
export type Tarea = {
  name: string;
  status: string;
  trabajador: Trabajador;
  empresa: Empresa;
};
