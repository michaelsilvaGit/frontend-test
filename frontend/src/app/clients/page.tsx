'use client'


import { useRouter } from 'next/navigation';
import ModalDelete from '../components/modal/modalDelete';
import { useState, useEffect } from 'react';
import { getClients } from '../services/api/clientService';
import { deleteClient } from '../services/api/clientService';
import Link from 'next/link';
import { Client } from '../types/clients';
import TableClients from '../components/tableClients/tableClients';






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

                <div className="w-full mt-16">
                    <h1 className="text-4xl text-center mx-auto">Clientes</h1>
                    <div className="w-full overflow-x-auto mt-7">
                        <div className="w-full">
                            {clients.length > 0 ? (
                                <TableClients handleDeleteClick={handleDeleteClick} handleEdit={handleEdit} handleRowClick={handleRowClick} clients={clients} />
                            ) : (
                                <p className='text-center mt-24'>Nenhum cliente cadastrado! <Link className="underline" href='/clients/new'>Cadastrar aqui.</Link></p>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}