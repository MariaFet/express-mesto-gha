const cardRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { validateCreateCard, validateUpdateCard } = require('../middlewares/validator');

cardRouter.get('/', getAllCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateUpdateCard, deleteCard);
cardRouter.put('/:cardId/likes', validateUpdateCard, likeCard);
cardRouter.delete('/:cardId/likes', validateUpdateCard, dislikeCard);

module.exports = cardRouter;
