import { Router } from 'express';
import homeController from "../controller/HomeController";

export const blogRouter = Router();
blogRouter.get('/create', homeController.showFormCreate);
blogRouter.post('/create', homeController.createBlog);
blogRouter.get('/update/:id', homeController.showFormEdit);
productRouter.post('/edit/:id', homeController.updateBlog);
productRouter.post('/delete/:id', homeController.deleteBlog);
productRouter.get('/detailp/:id', homeController.showFormDetail);
productRouter.post('/search/', homeController.searchBlog);
