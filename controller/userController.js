const userService = require('../service/userService');

exports.register = (req, res) => {
  const { username, password, inserirSaldo } = req.body;
  if (!username || !password || inserirSaldo === undefined) {
    return res.status(400).json({ error: 'username, password e inserirSaldo são obrigatórios' });
  }
  if (typeof inserirSaldo !== 'number' || inserirSaldo < 100) {
    return res.status(400).json({ error: 'O inserirSaldo deve ser um número maior ou igual a 100' });
  }
  try {
    const user = userService.registerUser({ ...req.body, saldo: inserirSaldo });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Login e senha são obrigatórios' });
  }
  try {
    const user = userService.loginUser({ username, password });
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};
