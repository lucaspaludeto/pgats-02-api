const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String!
    saldo: Float!
    favorecidos: [String!]
  }

  type Transfer {
    from: String!
    to: String!
    amount: Float!
    date: String!
  }

  type Query {
    users: [User!]!
    transfers: [Transfer!]!
  }

  type AuthPayload {
    token: String!
  }

  type Mutation {
    register(username: String!, password: String!, saldoInicial: Float!, favorecidos: [String]): User!
    login(username: String!, password: String!): AuthPayload!
    transfer(from: String!, to: String!, amount: Float!): Transfer!
  }
`;
