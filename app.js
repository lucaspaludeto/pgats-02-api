const express = require('express');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { authenticateToken, SECRET } = require('./middleware/auth');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// User routes
app.post('/register', userController.register);
app.post('/login', (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ error: 'Login e senha são obrigatórios' });
	}
	try {
		const user = userController.loginUser(req, res, true); // true para retornar user
		if (user) {
			const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
			return res.json({ token });
		}
	} catch (err) {
		return res.status(401).json({ error: err.message });
	}
});
app.get('/users', userController.getUsers);

// Transfer routes protegidas
app.post('/transfer', authenticateToken, transferController.transfer);
app.get('/transfers', authenticateToken, transferController.getTransfers);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
