require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { validateCreateUser, validateLogin } = require('./middlewares/validator');

const app = express();
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
// app.use(auth);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена.' });
});
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);
