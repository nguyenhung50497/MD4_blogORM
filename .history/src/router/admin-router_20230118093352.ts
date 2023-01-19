import { Router } from 'express';
import adminController from "../controller/AdminController";

export const adminRouter = Router();

adminRouter.get('/home', adminController.showHomeAdmin);
adminRouter.post('/delete-blog', adminController.deleteBlog);
adminRouter.get('/delete-user', adminController.deleteUser)
adminRouter.post('/block-user', adminController.blockUser);
adminRouter.get('/search-user', adminController.searchUser)