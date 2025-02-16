
import { Client } from '@/app/types/clients';
import { formatDate } from '@/app/utils/formatDate';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { tableClientsProps } from '@/app/types/tableClients';





export default function TableClients({ clients, handleRowClick, handleEdit, handleDeleteClick }: tableClientsProps) {


    return (
        <table className="min-w-full table-auto bg-white border border-gray-200">
            <thead className='bg-slate-600'>
                <tr >
                    <th className="px-2 md:px-6 py-1 text-center text-base md:text-lg font-bold text-slate-100 tracking-wider">
                        Editar
                    </th>
                    <th className="px-2 md:px-6 py-1 text-left text-base md:text-lg font-bold text-slate-100 tracking-wider">
                        Usuário
                    </th>
                    <th className="px-2 md:px-6 py-1 text-left text-base md:text-lg font-bold text-slate-100 tracking-wider">
                        E-mail
                    </th>
                    <th className="px-2 md:px-6 py-1 text-left text-base md:text-lg font-bold text-slate-100 tracking-wider">
                        Status
                    </th>
                    <th className="px-2 md:px-6 py-1 text-left text-base md:text-lg font-bold text-slate-100 tracking-wider">
                        Cadastro
                    </th>
                    <th className="px-2 md:px-6 py-1 text-center text-base md:text-lg font-bold text-slate-100 tracking-wider">
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
    )

}