import { Router } from 'express';
import homeController from "../controller/BlogController";

export const blogRouter = Router();
blogRouter.get('/create', homeController.showFormCreate);
blogRouter.post('/create', homeController.createBlog);
blogRouter.get('/update/:id', homeController.showFormEdit);
blogRouter.post('/edit/:id', homeController.updateBlog);
blogRouter.post('/delete/:id', homeController.deleteBlog);
blogRouter.get('/detailp/:id', homeController.showFormDetail);
blogRouter.post('/search/', homeController.searchBlog);
