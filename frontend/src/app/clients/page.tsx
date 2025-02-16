'use client'

import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ModalDelete from '../components/modal/modalDelete';
import { useState, useEffect } from 'react';
import { getClients } from '../services/api/clienteService';
import { formatDate } from '../utils/formatDate';
import { deleteClient } from '../services/api/clienteService';
import Link from 'next/link';
import { Client } from '../types/clients';






export default function Clients() {

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientIdToDelete, setClientIdToDelete] = useState<number | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [confirmDelete, setConfirmDelete] = useState(false)


    useEffect(() => {

        async function fetchClientes() {
            try {
                const data = await getClients();
                setClients(data);
            } catch (error) {
                console.error('Erro ao carregar clientes:', error);
            }
        }

        fetchClientes();

    }, [confirmDelete]);


    async function handleDelete(id: number): Promise<void> {
        const resDelete = await deleteClient(id);

        if (resDelete) {
            setConfirmDelete(prev => !prev);
        }
        setIsModalOpen(false);
    };

    function handleEdit(id: number): void {
        router.push(`/clients/edit/${id}`);
    }

    function handleDeleteClick(id: number): void {
        setClientIdToDelete(id);
        setIsModalOpen(true);
    }

    function handleRowClick(clientId: number): void {
        router.push(`/clients/${clientId}`);
    }

    function handleCancel(): void {
        setIsModalOpen(false);
    };



    return (
        <>
            <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto flex flex-col items-center justify-center mt-7">

                <ModalDelete
                    isModalOpen={isModalOpen}
                    onCancel={handleCancel}
                    handleDelete={() => clientIdToDelete && handleDelete(clientIdToDelete)}
                />

                <h1 className="text-4xl mx-auto">Clientes</h1>

                <div className="w-full overflow-x-auto mt-7">
                    <div className="w-full">
                        {clients.length > 0 ? (
                            <table className="min-w-full table-auto bg-white border border-gray-200">
                                <thead className='bg-slate-600'>
                                    <tr >
                                        <th className="px-2 md:px-6 py-3 text-center text-base md:text-lg font-bold text-slate-100 tracking-wider">
                                            Editar
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-base md:text-lg font-bold text-slate-100 tracking-wider">
                                            Usuário
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-base md:text-lg font-bold text-slate-100 tracking-wider">
                                            E-mail
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-base md:text-lg font-bold text-slate-100 tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-left text-base md:text-lg font-bold text-slate-100 tracking-wider">
                                            Cadastro
                                        </th>
                                        <th className="px-2 md:px-6 py-3 text-center text-base md:text-lg font-bold text-slate-100 tracking-wider">
                                            Excluir
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clients.map((client: Client) => (
                                        <tr
                                            key={client.id}
                                            onClick={() => handleRowClick(client.id)}
                                            className="hover:bg-gray-100 cursor-pointer"
                                        >
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center text-xl md:text-2xl text-gray-50">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(client.id);
                                                    }}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <FaEdit />
                                                </button>
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {client.username}
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {client.email}
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {client.active ? 'Ativo' : 'Inativo'}
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(client.createdAt)}
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center text-xl md:text-2xl text-gray-50">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(client.id);
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className='text-center mt-24'>Nenhum cliente cadastrado! <Link className="underline" href='/clients/new'>Cadastrar aqui.</Link></p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}