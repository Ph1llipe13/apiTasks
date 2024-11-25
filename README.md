API REST para Cadastro de Usuários e Tarefas

Esta é uma API REST simples que permite:

    Cadastrar usuários.
    Cadastrar tarefas associadas aos usuários.

As tarefas são totalmente dependentes dos usuários, ou seja:

    Uma tarefa só pode ser cadastrada se o usuário informado existir.
    Ao excluir um usuário, todas as tarefas associadas a ele serão automaticamente apagadas.

Endpoints
Usuários
- Listar todos os usuários

GET /usuarios
Retorna uma lista de todos os usuários cadastrados.
- Cadastrar um novo usuário

POST /usuarios
Campos obrigatórios no corpo da requisição:

    nome (string)
    email (string)
    senha (string)

- Atualizar dados de um usuário

PUT /usuarios/:id
Atualiza o nome e o email de um usuário específico.
Campos obrigatórios no corpo da requisição:

    nome (string)
    email (string)

- Atualizar a senha de um usuário

PUT /usuarios/senha/:id
Atualiza a senha de um usuário específico.
Campos obrigatórios no corpo da requisição:

    senha (string)

- Excluir um usuário

DELETE /usuarios/:id
Exclui um usuário específico e todas as suas tarefas associadas.
Tarefas
- Listar todas as tarefas

GET /tasks
Retorna uma lista de todas as tarefas cadastradas.
- Buscar tarefas por ID do usuário

GET /tasks/busca?idUsuario={id}
Retorna todas as tarefas associadas a um usuário específico.
- Cadastrar uma nova tarefa

POST /tasks
Campos obrigatórios no corpo da requisição:

    titulo (string)
    descricao (string)
    idUsuario (número) - ID de um usuário existente.

- Atualizar uma tarefa

PUT /tasks/:id
Atualiza uma tarefa específica.
Campos obrigatórios no corpo da requisição:

    titulo (string)
    descricao (string)
    status (string) - Valores aceitos: pendente ou concluido.

- Excluir uma tarefa

DELETE /tasks/:id
Exclui uma tarefa específica.
Requisitos

    Node.js (v14 ou superior).

Como executar

    Clone o repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

Instale as dependências:

npm install

Inicie o servidor:

    npm start

O servidor estará disponível em http://localhost:3000.
Observações

    Todas as tarefas são vinculadas a um usuário específico. Certifique-se de cadastrar um usuário antes de criar tarefas.
    Dados são armazenados em arquivos JSON (usuarios.json e tasks.json).
