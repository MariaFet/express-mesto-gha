const cardRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { validateCreateCard } = require('../middlewares/validator');

cardRouter.get('/', getAllCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;
