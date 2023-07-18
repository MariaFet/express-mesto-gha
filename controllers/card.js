const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  //console.log(req.user._id);
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
  .then((card) => {
    res.status(201).send({data: card});
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({message: 'Переданы некорректные данные при создании карточки.'});
    }
      return res.status(500).send({message: 'Произошла ошибка на сервере'});
  });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
  .then(cards => res.status(200).send({data: cards}))
  .catch((err) => {return res.status(500).send({message: 'Произошла ошибка на сервере'});});
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      return res.status(404).send({message: 'Карточка с указанным _id не найдена.'});
    }
    res.status(200).send({data: card});
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({message: 'Передан несуществующий _id карточки.'});
    }
      return res.status(500).send({message: 'Произошла ошибка на сервере'});
  });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true})
    .then((card) => {
      if (!card) {
        return res.status(404).send({message: 'Карточка с указанным _id не найдена.'});
      }
      res.status(200).send({data: card});
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({message: 'Передан несуществующий _id карточки.'});
      }
        return res.status(500).send({message: 'Произошла ошибка на сервере'});
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true})
    .then((card) => {
      if (!card) {
        return res.status(404).send({message: 'Карточка с указанным _id не найдена.'});
      }
      res.status(200).send({data: card});
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({message: 'Передан несуществующий _id карточки.'});
      }
        return res.status(500).send({message: 'Произошла ошибка на сервере'});
    });
}