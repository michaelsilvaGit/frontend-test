'use client'

import { useState, useEffect } from "react";
import EditClientForm from "../../../components/clienteForm/clientForm";
import { useParams } from 'next/navigation';
import { findClientById, updateClient } from "@/app/services/api/clienteService";
import { Client } from "@/app/types/clients";
import { IFormInput } from "@/app/types/formInput";
import { useRouter } from 'next/navigation';






export default function EditClient() {

  const params = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {

    async function fetchClientes() {
      try {
        const data: Client = await findClientById(Number(params.id));
        setClient(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();

  }, []);


  async function onSubmit(data: IFormInput): Promise<void> {

    const updatedData = {
      ...data,
      active: data.active === 'true',
    };

    const clientUpdate: Client = await updateClient(Number(params.id), updatedData);

    if (clientUpdate) {
      router.push(`/clients`);
    }

  }


  return (

    <div className="w-full h-scree flex items-center justify-center">
      <div className="mt-16 w-full max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-gray-800">Editar Cliente</h2>
        <div className="w-full">
          <EditClientForm client={client} onSubmit={onSubmit} />
        </div>
      </div>
    </div>

  );
}
