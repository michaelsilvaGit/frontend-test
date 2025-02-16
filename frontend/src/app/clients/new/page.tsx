'use client'

import EditClientForm from "../../components/clienteForm/clientForm";
import { useRouter } from 'next/navigation';
import { newClient } from "@/app/services/api/clienteService";
import { IFormInput } from "@/app/types/formInput";
import { Client } from "@/app/types/clients";








export default function NewClient() {

    const router = useRouter();

    async function onSubmit(data: IFormInput): Promise<void> {

        try {
            const updatedData = {
                ...data,
                active: data.active === 'true',
            };

            const returnNewClient: Client = await newClient(updatedData);

            if (returnNewClient) {
                router.push(`/clients`);
            }

        } catch (error) {
            console.error('Erro ao criar cliente:', error);

        }

    }

    return (

        <div className="w-full h-scree flex items-center justify-center">
            <div className="mt-16 w-full">
                <h2 className="text-center text-2xl font-semibold text-gray-800">Novo Cliente</h2>
                <EditClientForm onSubmit={onSubmit} />
            </div>
        </div>
    )



}