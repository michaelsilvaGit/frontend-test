import { Client } from "./clients"


export interface IFormInput {
  username: string;
  email: string;
  active: string;
  avatar: string;
  password: string;
  confirmPassword?: string;
}

export interface IFormInputSend {
  username: string;
  email: string;
  active: boolean;
  avatar: string;
  password: string;
  confirmPassword?: string;
}



export interface EditClientFormProps {
  onSubmit: (data: IFormInput) => void;
  client?: Client;
}