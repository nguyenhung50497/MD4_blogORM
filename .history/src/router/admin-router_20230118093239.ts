import { Router } from 'express';
import adminController from "../controller/AdminController";

export const adminRouter = Router();

adminRouter.get('/home', adminController.showFormChangePassword);
adminRouter.post('/change-pass', adminController.changePassword);
adminRouter.get('/login', adminController.showFormLogin)
adminRouter.post('/login', adminController.login);
adminRouter.get('/register', adminController.showFormRegister)
adminRouter.post('/register', adminController.register);
adminRouter.get('/logout', adminController.logout);
adminRouter.get('/my-blog', adminController.showMyBlog);