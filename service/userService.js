const { users } = require('../model/userModel');

function registerUser({ username, password, favorecidos = [], saldo }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe');
  }
  if (typeof saldo !== 'number' || saldo < 100) {
    throw new Error('O saldo deve ser um número maior ou igual a 100');
  }
  const user = { username, password, favorecidos, saldo };
  users.push(user);
  return user;
}

function loginUser({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Login ou senha inválidos');
  return user;
}

function getUsers() {
  return users;
}

function getUser(username) {
  return users.find(u => u.username === username);
}

module.exports = { registerUser, loginUser, getUsers, getUser };
