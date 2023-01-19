import { Router } from 'express';
import adminController from "../controller/AdminController";

export const adminRouter = Router();

adminRouter.get('/home', adminController.showHomeAdmin);
adminRouter.post('/delete-blog/:id', adminController.deleteBlog);
adminRouter.post('/delete-user?', adminController.deleteUser)
adminRouter.post('/block-user', adminController.blockUser);
adminRouter.get('/search-user', adminController.searchUser);
adminRouter.get('/search-blog', adminController.searchBlog);