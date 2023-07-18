const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res) => {
  //console.log(req.user._id);
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
  .then((card) => {
    if (!card) {
      throw new BadRequestError('Переданы некорректные данные при создании карточки.');
    }
    res.status(201).send({data: card});
  })
  .catch((err) => {throw new ServerError('Произошла ошибка на сервере')});
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
  .then(cards => res.status(200).send({data: cards}))
  .catch((err) => {throw new ServerError('Произошла ошибка на сервере')});
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }
    res.status(200).send({data: card});
  })
  .catch((err) => {throw new ServerError('Произошла ошибка на сервере')});
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true})
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      res.status(200).send({data: card});
    })
    .catch((err) => {throw new ServerError('Произошла ошибка на сервере')});
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true})
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      res.status(200).send({data: card});
    })
    .catch((err) => {throw new ServerError('Произошла ошибка на сервере')});
}