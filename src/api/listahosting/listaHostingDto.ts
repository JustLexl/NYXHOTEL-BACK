import { ObjectId } from "mongodb";

export interface ListaHostingDto {
    _id?: ObjectId;
    name: string;
    clientId: string;
    domain: string;

    provider: string;
    account: string;
    startDate: Date;
    expiryDate?: Date;
    status: 'Activo' | 'Inactivo' | 'Renovación';
    providerContacted?: boolean;
    renewalConfirmed?: boolean;
    renewalHistory?: any[];
    isDeleted?: boolean;
}
