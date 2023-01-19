import { Router } from 'express';
import adminController from "../controller/AdminController";

export const adminRouter = Router();

adminRouter.get('/change-pass', userController.showFormChangePassword);
adminRouter.post('/change-pass', userController.changePassword);
userRouter.get('/login', userController.showFormLogin)
userRouter.post('/login', userController.login);
userRouter.get('/register', userController.showFormRegister)
userRouter.post('/register', userController.register);
userRouter.get('/logout', userController.logout);
userRouter.get('/my-blog', userController.showMyBlog);