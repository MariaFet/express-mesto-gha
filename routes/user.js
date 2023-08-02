const userRouter = require('express').Router();
const {
  getAllUsers, getUser, getCurrentUserInfo, updateUser, updateUserAvatar,
} = require('../controllers/user');
const { validateUpdateUser, validateUpdateUserAvatar, validateGetUser } = require('../middlewares/validator');

userRouter.get('/', getAllUsers);
userRouter.get('/:_id', validateGetUser, getUser);
userRouter.patch('/me', validateUpdateUser, updateUser);
userRouter.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);
userRouter.get('/me', getCurrentUserInfo);

module.exports = userRouter;
