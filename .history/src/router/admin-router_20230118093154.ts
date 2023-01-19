import { Router } from 'express';
import adminController from "../controller/AdminController";

export const adminRouter = Router();

adminRouter.get('/change-pass', userController.showFormChangePassword);
adminRouter.post('/change-pass', userController.changePassword);
adminRouter.get('/login', userController.showFormLogin)
adminRouter.post('/login', userController.login);
adminRouter.get('/register', userController.showFormRegister)
adminRouter.post('/register', userController.register);
userRouter.get('/logout', userController.logout);
userRouter.get('/my-blog', userController.showMyBlog);