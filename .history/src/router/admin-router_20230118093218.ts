import { Router } from 'express';
import adminController from "../controller/AdminController";

export const adminRouter = Router();

adminRouter.get('/change-pass', adminController.showFormChangePassword);
adminRouter.post('/change-pass', adminController.changePassword);
adminRouter.get('/login', userController.showFormLogin)
adminRouter.post('/login', userController.login);
adminRouter.get('/register', userController.showFormRegister)
adminRouter.post('/register', userController.register);
adminRouter.get('/logout', userController.logout);
adminRouter.get('/my-blog', userController.showMyBlog);