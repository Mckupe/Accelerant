require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const sequelize = require('./db');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.HTTP_URL_FRONT,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'static'))); // для отдачи файлов как статики, вдруг пригодится
app.use('/api', router);

// запускаем sequelize и само приложение

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}


app.use(errorMiddleware);

start();