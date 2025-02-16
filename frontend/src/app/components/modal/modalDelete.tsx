'use client'

import React, { } from 'react';
import { useModal } from 'react-modal-hook';
import { ModalDeleteProps } from '@/app/types/modalDelete';






const ModalDelete: React.FC<ModalDeleteProps> = ({ isModalOpen, onCancel, handleDelete }) => {


    const [showModal, hideModal] = useModal(() => (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Você tem certeza que deseja deletar?
                </h2>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={() => {
                            handleDelete();
                            hideModal();
                        }}
                        className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={() => {
                            onCancel();
                            hideModal();
                        }}
                        className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"

                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    ), [handleDelete, onCancel]);


    React.useEffect(() => {
        if (isModalOpen) {
            showModal();
        } else {
            hideModal();
        }
    }, [isModalOpen, showModal, hideModal]);

    return null;
};


export default ModalDelete;