const userRouter = require('express').Router();
const {
  getAllUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user');

userRouter.get('/', getAllUsers);
userRouter.get('/:_id', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
