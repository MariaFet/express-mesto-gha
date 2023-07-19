const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
  .then(users => res.status(200).send({data: users}))
  .catch((err) => {return res.status(500).send({message: 'Произошла ошибка на сервере'});});
};

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
  .then((user) => {
    if (!user) {
      return res.status(404).send({message: 'Пользователь по указанному _id не найден.'})
    }
    res.status(200).send({data: user});
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({message: 'Пользователя с запрашиваемым id не существует.'});
    }
      return res.status(500).send({message: 'Произошла ошибка на сервере'});
  });
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .then((user) => {
    res.status(201).send({data: user});
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({message: 'Переданы некорректные данные при создании пользователя.'});
    }
      return res.status(500).send({message: 'Произошла ошибка на сервере'});
  });
};

module.exports.updateUser = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
  .then((user) => {
    if (!user._id) {
      return res.status(404).send({message: 'Пользователь по указанному _id не найден.'})
    }
    res.status(200).send({data: user});
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({message: 'Переданы некорректные данные при обновлении пользователя.'});
    }
      return res.status(500).send({message: 'Произошла ошибка на сервере'});
  });
};

module.exports.updateUserAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
  .then((user) => {
    if (!user._id) {
      return res.status(404).send({message: 'Пользователь по указанному _id не найден.'})
    }
    res.status(200).send({data: user});
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({message: 'Переданы некорректные данные при обновлении пользователя.'});
    }
      return res.status(500).send({message: 'Произошла ошибка на сервере'});
  });
}