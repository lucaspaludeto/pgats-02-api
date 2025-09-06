# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes automatizados.

## Instalação

1. Clone o repositório
npm install express swagger-ui-express
2. Instale as dependências:
  ```
npm install express swagger-ui-express apollo-server-express graphql jsonwebtoken
npm install --save-dev supertest
```

## Como rodar

- Para rodar a API REST:
  ```
  node server.js
  ```
- Para rodar a API GraphQL:
  ```
  node graphql/server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Acesse o playground GraphQL em: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Endpoints REST

- `POST /register` — Registra novo usuário
- `POST /login` — Realiza login
- `GET /users` — Lista todos os usuários
- `POST /transfer` — Realiza transferência
- `GET /transfers` — Lista transferências

## Operações GraphQL

- **Query**
  - `users`: Lista todos os usuários
  - `transfers`: Lista todas as transferências
- **Mutations**
  - `register(username, password, saldoInicial, favorecidos)`: Registra novo usuário
  - `login(username, password)`: Retorna token JWT
  - `transfer(from, to, amount)`: Realiza transferência (requer JWT)

Exemplo de mutation para transferência:
```graphql
mutation {
  transfer(from: "lucas", to: "karina", amount: 100) {
    from
    to
    amount
    date
  }
}
```

Para autenticar, envie o header:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

## Regras de negócio

- Login e senha obrigatórios para login
- Não é permitido registrar usuários duplicados
- Transferências para não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor)


## Estrutura do projeto

- `controller/` — Lógica dos endpoints REST
- `service/` — Regras de negócio
- `model/` — Dados em memória
- `app.js` — Configuração do Express e rotas REST
- `server.js` — Inicialização do servidor REST
- `swagger.json` — Documentação Swagger
- `graphql/` — API GraphQL (typeDefs, resolvers, app.js, server.js)

---

> Para testar com Supertest, importe o `app.js` diretamente.
