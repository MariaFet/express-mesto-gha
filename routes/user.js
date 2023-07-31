const userRouter = require('express').Router();
const {
  getAllUsers, getUser, getCurrentUserInfo, updateUser, updateUserAvatar,
} = require('../controllers/user');

userRouter.get('/', getAllUsers);
userRouter.get('/:_id', getUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);
userRouter.get('/me', getCurrentUserInfo);

module.exports = userRouter;
