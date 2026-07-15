import { ObjectId } from "mongodb";

export interface LostAndFoundDto {
  _id?: ObjectId;
  // Parte 1: Recepción de Objeto Olvidado
  nombreEntrega: string;
  departamento: string;
  seEncontroEn: string;
  fechaEncontrado: string;
  horaEncontrado: string;
  descripcionEncontrado: string;
  esDeValor: boolean;
  agenteSeguridad: string;
  nombreRecibe: string;
  firmaEntrega?: string; // Base64 png representation

  // Parte 2: Entrega de Objeto Olvidado (Reclamado)
  entregado: boolean;
  nombreReclama?: string;
  habitacionReclama?: string;
  fechaReclama?: string;
  horaReclama?: string;
  descripcionReclama?: string;
  firmaReclama?: string; // Base64 png representation de la firma del huésped

  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
