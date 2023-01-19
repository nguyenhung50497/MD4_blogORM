import { Router } from 'express';
import userController from "../controller/UserController";

export const adminRouter = Router();

userRouter.get('/change-pass', userController.showFormChangePassword);
userRouter.post('/change-pass', userController.changePassword);
userRouter.get('/login', userController.showFormLogin)
userRouter.post('/login', userController.login);
userRouter.get('/register', userController.showFormRegister)
userRouter.post('/register', userController.register);
userRouter.get('/logout', userController.logout);
userRouter.get('/my-blog', userController.showMyBlog);