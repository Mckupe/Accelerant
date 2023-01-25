require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const ws = require('ws');
const cors = require('cors');
const sequelize = require('./db');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');
const { v4 } = require('uuid');
const clients = {};
const messages = [];
const http = require('http');
const fileupload = require('express-fileupload');

const PORT = process.env.PORT || 5000;
app.use(fileupload({}));
app.use(
	cors({
		origin: process.env.HTTP_URL_FRONT,
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use('/static/imgs', express.static('./static/imgs'));
app.use('/api', router);

const server = http.createServer(app);

// запускаем sequelize и само приложение

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		server.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

const wss = new ws.Server({ server });
wss.on('connection', ws => {
	try {
		const id = v4();
		clients[id] = ws;
		console.log(`Client ${id} has been connected!`);

		ws.on('message', message => {
			console.log('message');
			const mess = JSON.parse(message);
			messages.push(mess);
			for (const id in clients) {
				clients[id].send(JSON.stringify(mess));
			}
		});

		ws.on('close', () => {
			delete clients[id];
			console.log(`Client ${id} has been disconected!`);
		});
	} catch (error) {
		console.log(error);
	}
});

app.use(errorMiddleware);
start();
