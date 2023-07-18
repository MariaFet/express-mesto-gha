const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const {PORT = 3000} = process.env;
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64b59bb2bd6dc00b5af5d413'
  };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(3000);
console.log(PORT);