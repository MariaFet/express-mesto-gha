const userRouter = require('express').Router();
const {
  getAllUsers, getUser, getCurrentUserInfo, updateUser, updateUserAvatar,
} = require('../controllers/user');
const { validateUpdateUser, validateUpdateUserAvatar, validateGetUser } = require('../middlewares/validator');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUserInfo);
userRouter.get('/:userId', validateGetUser, getUser);
userRouter.patch('/me', validateUpdateUser, updateUser);
userRouter.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

module.exports = userRouter;
