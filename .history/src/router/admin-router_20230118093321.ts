import { Router } from 'express';
import adminController from "../controller/AdminController";

export const adminRouter = Router();

adminRouter.get('/home', adminController.showHomeAdmin);
adminRouter.post('/delete-blog', adminController.changePassword);
adminRouter.get('/delete-user', adminController.showFormLogin)
adminRouter.post('/block', adminController.login);
adminRouter.get('/register', adminController.showFormRegister)
adminRouter.post('/register', adminController.register);
adminRouter.get('/logout', adminController.logout);
adminRouter.get('/my-blog', adminController.showMyBlog);