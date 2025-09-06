const userService = require('../service/userService');
const transferService = require('../service/transferService');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

module.exports = {
  Query: {
    users: () => userService.getUsers(),
    transfers: () => transferService.getTransfers(),
  },
  Mutation: {
    register: (_, { username, password, saldoInicial, favorecidos }) => {
      return userService.registerUser({ username, password, saldoInicial, favorecidos });
    },
    login: (_, { username, password }) => {
      const user = userService.loginUser({ username, password });
      const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
      return { token };
    },
    transfer: (_, { from, to, amount }, context) => {
      if (!context.user) throw new Error('Token não fornecido ou inválido');
      const transfer = transferService.transfer({ from, to, amount });
      // Garante que date seja string ISO
      if (transfer && transfer.date && typeof transfer.date !== 'string') {
        transfer.date = new Date(transfer.date).toISOString();
      }
      return transfer;
    },
  },
};
