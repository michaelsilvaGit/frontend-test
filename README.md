# Projeto Teste Sinka: Lista de Clientes

Este projeto é um teste de frontend desenvolvido utilizando **React** e **Next.js**. Ele tem como objetivo gerenciar uma lista de clientes, permitindo a visualização, criação, edição e exclusão de registros de clientes em uma tabela interativa.

## Funcionalidades

- **Listar Clientes**: Exibe uma tabela com informações relevante de clientes.
- **Visuallizar Cliente**: Em uma página exibe todos os dados do cliente incluido seu avatar.
- **Criar Cliente**: Permite a criação de um novo cliente.
- **Editar Cliente**: Oferece a possibilidade de editar os dados de um cliente existente.
- **Deletar Cliente**: Exclui um cliente da lista.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Next.js**: Framework React para desenvolvimento de aplicações web com renderização do lado servidor (SSR) e rotas dinâmicas.
- **Tailwind CSS**: Estilizando as páginas usando tailwind.
- **Fetch API**: Ultilizado para fazer as requisição HTTP com o backend.
- **React Hook Form**: Para gerenciamento e validação de formulários.

## Como Usar

- **Listar Clientes:** Na página inicial, você verá uma tabela com todos os clientes cadastrados.
- **Criar Cliente:** No header clique no botão "Novo Cliente" ou no aviso na tela para abrir o formulário de criação de um novo cliente. Preencha os campos obrigatórios e salve.
- **Visualizar Cliente:** Na tabela ao passar o mouse em cima da lista dos clientes, selecione e será redirecionado a pagina de visualização.
- **Editar Cliente:** Clique no ícone de edição de um cliente na tabela para modificar os dados. Na tela de edição salve as alterações após editar.
- **Deletar Cliente:** Na tabela clique no ícone de exclusão para remover um cliente da lista, confirme a ação no modal.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   
   - git clone https://github.com/michaelsilvaGit/frontend-test.git

2. **Acesse a pasta do projeto:**

   - cd frontend-test

4. **Acesse a pasta frontend e Instale as dependências:**
    
   - cd frontend
   - npm install

5. **Iniciar aplicação:**
   
   - npm run dev
   - Abra o navegador e acesse http://localhost:3000 ou a url vista no terminal.

## Iniciar o Backend

1. Ir até a pasta `backend`
2. Instalar os módulos com `npm install`
3. Copiar o arquivo `.env.example` para `.env`
4. Inicializar o Docker: `docker compose up -d`
5. Rodar migrations: `npx prisma migrate deploy`
6. Iniciar backend: `npm start`

**Endpoints backend:**

Ver os endpoints em: `http://localhost:3333/swagger`
