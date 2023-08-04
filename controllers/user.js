const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const JWT_SECRET = 'df740be8e1dd975abfe3aee5fecab33b700a4c3da01e44ba135240a0cccb1ac5';

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь с указанным _id не найден.'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при получении пользователя.'));
      }
      return next(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  const isEmailTaken = await User.findOne({ email });
  if (isEmailTaken) {
    return next(new ConflictingRequestError('Пользователь с данной почтой уже существует.'));
  }
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then(() => {
      res.status(201).send({
        data: {
          name, about, avatar, email,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictingRequestError('Пользователь с данной почтой уже существует.'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при получении пользователя.'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь с указанным _id не найден.'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при получении пользователя.'));
      }
      return next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь с указанным _id не найден.'));
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при получении пользователя.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new NotAuthorizedError('Неправильные пароль или почта.'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new NotAuthorizedError('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
          });
          return res.send({ data: 'Авторизация прошла успешно.' });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при получении пользователя.'));
      }
      return next(err);
    });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id.toString())
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь с указанным _id не найден.'));
      }
      return res.send({ data: user });
    })
    .catch((err) => next(err));
};
