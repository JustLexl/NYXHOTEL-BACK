import { ObjectId } from "mongodb";

export interface RegistroProveedoresDto {
  _id?: ObjectId;

  // Datos de entrada
  fechaEntrada: string;   // YYYY-MM-DD
  horaEntrada: string;    // HH:mm
  nombreProveedor: string;
  compania: string;
  numeroGafete: string;
  agenteSeguridad: string;
  destino: string;

  // Datos de salida (se registran con el botón "Registrar Salida")
  horaSalida?: string;    // HH:mm — se guarda automáticamente
  fechaSalida?: string;   // YYYY-MM-DD — se guarda automáticamente

  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
