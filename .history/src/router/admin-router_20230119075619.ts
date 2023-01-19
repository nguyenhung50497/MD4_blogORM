import { Router } from 'express';
import adminController from "../controller/AdminController";

export const adminRouter = Router();

adminRouter.get('/home', adminController.showHomeAdmin);
adminRouter.get('/user', adminController.showFormUser);
adminRouter.post('/delete-blog/:id', adminController.deleteBlog);
adminRouter.post('/delete-user/:id', adminController.deleteUser);
adminRouter.post('/block-user/:id', adminController.blockUser);
adminRouter.post('/active-user/:id', adminController.activeUser);
adminRouter.get('/search-user', adminController.searchUser);
adminRouter.get('/search-blog', adminController.searchBlog);
adminRouter.get('/detail', adminController.searchBlog);