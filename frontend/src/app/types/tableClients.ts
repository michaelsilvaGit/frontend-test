import { Client } from "./clients";



export interface tableClientsProps {
    handleDeleteClick: (data: number) => void;
    handleEdit: (data: number) => void;
    handleRowClick: (data: number) => void;
    clients: Client[];
}