import { Client } from "@/app/types/clients";
import { IFormInputSend } from "@/app/types/formInput";


const API_URL = 'http://localhost:3333';





export async function getClients(): Promise<Client[]> {

  try {
    const response = await fetch(`${API_URL}/client`);

    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }

    const data: Client[] = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }

}


export async function newClient(dataClient: IFormInputSend): Promise<Client> {

  try {
    const response = await fetch(`${API_URL}/client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataClient)
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar cliente');
    }

    const data: Client = await response.json();

    return data;

  } catch (error) {
    console.error('Erro ao cadastrar cliente', error);
    throw error;
  }

}



export async function findClientById(id: number): Promise<Client> {


  try {
    const response = await fetch(`${API_URL}/client/${id}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }

    const data: Client = await response.json();

    return data;

  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    throw error;
  }

}


export async function updateClient(id: number, clientData: Partial<IFormInputSend>): Promise<Client> {

  try {
    const response = await fetch(`${API_URL}/client/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar cliente');
    }

    const data: Client = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }

}


export async function deleteClient(id: number): Promise<boolean> {

  try {
    const response = await fetch(`${API_URL}/client/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar cliente');
    }

    return true;

  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    throw error;
  }
}

