'use client'

import Image, { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
import { findClientById } from '@/app/services/api/clienteService';
import { useParams } from 'next/navigation';
import { formatDate } from '@/app/utils/formatDate';
import ImageDefault from '../../assets/images/withoutAvatar.webp'
import { Client } from '@/app/types/clients';




export default function DetailClient() {

    const params = useParams<{ id: string }>();
    const [client, setClient] = useState<Client | undefined>(undefined);
    const [imageValidate, setImageValidate] = useState<string | StaticImageData>(ImageDefault);


    useEffect(() => {

        async function fetchClientes() {
            try {
                const data: Client = await findClientById(Number(params.id));
                setClient(data);
                setImageValidate(isValidUrl(data?.avatar || '') ? data.avatar : ImageDefault);

            } catch (error) {
                console.error('Erro ao carregar clientes:', error);
            }
        }

        fetchClientes();

    }, []);

    function isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    function handleImageError(): void {
        setImageValidate(ImageDefault);
    };





    return (

        <div className="bg-white shadow-lg rounded-lg p-6 mt-10 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Dados do  Cliente</h2>
            <div className="space-y-4">
                <div className="flex justify-start">
                    <Image
                        src={imageValidate}
                        alt={client?.username || 'Cliente'}
                        width={120}
                        height={120}
                        className="rounded-full border-2 border-gray-300"
                        onError={handleImageError}
                    />
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Código:</span>
                    <span className="text-gray-500 ml-2">{client?.id}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Usuário:</span>
                    <span className="text-gray-500 ml-2">{client?.username}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <span className="text-gray-500 ml-2">{client?.email}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className={`text-gray-500  ml-2 ${client?.active ? 'text-green-600' : 'text-red-600'}`}>
                        {client?.active ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Data cadastro:</span>
                    <span className="text-gray-500 ml-2">{formatDate(client?.createdAt)}</span>
                </div>
                <div className="flex">
                    <span className="font-semibold text-gray-700">Ultima atualização:</span>
                    <span className="text-gray-500 ml-2">{formatDate(client?.updatedAt)}</span>
                </div>
            </div>
        </div>

    )

}