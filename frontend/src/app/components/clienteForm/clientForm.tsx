
'use client';

import { useForm } from 'react-hook-form';
import Image, { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
import ImageDefault from '../../assets/images/withoutAvatar.webp'
import { IFormInput, EditClientFormProps } from '@/app/types/formInput';








export default function EditClientForm({ client, onSubmit }: EditClientFormProps) {


    const { register, handleSubmit, formState: { errors }, getValues, setValue, unregister } = useForm<IFormInput>();
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [imageValidate, setImageValidate] = useState<string | StaticImageData>(ImageDefault);



    useEffect(() => {
        if (client) {
            setValue('username', client.username);
            setValue('email', client.email);
            setValue('avatar', client.avatar);
            setValue('active', client.active ? "true" : "false");
        }
        setImageValidate(isValidUrl(client?.avatar || '') ? client?.avatar || '' : ImageDefault);

    }, [client, setValue]);

    function handlePasswordCheckboxChange(): void {
        if (showPasswordFields) {
            unregister('password');
            unregister('confirmPassword');
        }
        setShowPasswordFields(!showPasswordFields);
    };

    function handleOnSubmit(): void {
        unregister('confirmPassword');
        if (!showPasswordFields && client) {
            unregister('password');
        }
        const formData: IFormInput = getValues();
        onSubmit(formData);
    }

    function validateImageUrl(value: string): true | string {
        const regex = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;
        return regex.test(value) ? true : 'URL deve ser de uma imagem válida';
    };

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

        <form onSubmit={handleSubmit(handleOnSubmit)} className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-6">
            <div className="w-full space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuário</label>
                    <input
                        id="username"
                        type="text"
                        {...register('username', { required: 'Nome de usuário é obrigatório' })}
                        placeholder="Digite o nome de usuário"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email é obrigatório',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: 'Email inválido',
                            },
                        })}
                        placeholder="Digite o email"
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="active" className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="active"
                                value="true"
                                {...register('active', { required: 'Status do usuário é obrigatório' })}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Ativo</span>
                        </label>

                        <label htmlFor="inactive" className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="inactive"
                                value="false"
                                {...register('active', { required: 'Status do usuário é obrigatório' })}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Inativo</span>
                        </label>
                    </div>
                    {errors.active && <p className="text-sm text-red-500">{errors.active.message}</p>}
                </div>

                {client && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                onChange={() => handlePasswordCheckboxChange()}
                                className="mr-2"
                            />
                            Alterar a senha
                        </label>
                    </div>
                )}

                {(!client || showPasswordFields) && (
                    <>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{client ? 'Nova Senha' : 'Senha'}</label>
                            <input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: 'A senha do usuário é obrigatório',
                                    minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres' }
                                })}
                                placeholder="Digite a senha"
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirme a Nova Senha</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword', {
                                    validate: value => value === getValues('password') || 'As senhas não correspondem'
                                })}
                                placeholder="Confirme a nova senha"
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                        </div>
                    </>
                )}
                <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Url imagem</label>
                    <input
                        id="avatar"
                        type="text"
                        {...register('avatar', {
                            required: 'A URL da imagem é obrigatória',
                            validate: validateImageUrl,
                        })}
                        placeholder="Url da imagem"
                        className={`mt-1 block w-full px-4 py-2 bg-gray-100 border ${errors.avatar ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    {errors.avatar && <p className="text-sm text-red-500">{errors.avatar.message}</p>}
                    {client && (
                        <div className='mt-1'>
                            <Image
                                src={imageValidate}
                                alt={'avatar'}
                                width={100}
                                height={100}
                                className="rounded-md"
                                onError={handleImageError}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Salvar
                </button>
            </div>
        </form>
    );
};

