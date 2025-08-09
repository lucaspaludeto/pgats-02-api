# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes automatizados.

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```
npm install express swagger-ui-express
```

## Como rodar

- Para rodar a API:
  ```
  node server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

- `POST /register` — Registra novo usuário
- `POST /login` — Realiza login
- `GET /users` — Lista todos os usuários
- `POST /transfer` — Realiza transferência
- `GET /transfers` — Lista transferências

## Regras de negócio

- Login e senha obrigatórios para login
- Não é permitido registrar usuários duplicados
- Transferências para não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor)

## Estrutura do projeto

- `controller/` — Lógica dos endpoints
- `service/` — Regras de negócio
- `model/` — Dados em memória
- `app.js` — Configuração do Express e rotas
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação Swagger

---

> Para testar com Supertest, importe o `app.js` diretamente.
