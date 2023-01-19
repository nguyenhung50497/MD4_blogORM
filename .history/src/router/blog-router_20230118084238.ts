import { Router } from 'express';
import homeController from "../controller/HomeController";

export const productRouter = Router();
productRouter.get('/createProduct', homeController.showFormCreate);
productRouter.post('/create', homeController.createBlog);
productRouter.get('/update/:id', homeController.showFormEdit);
productRouter.post('/edit/:id', homeController.updateBlog);
productRouter.post('/delete/:id', homeController.deleteBlog);
productRouter.get('/detailp/:id', homeController.showFormDetail);
productRouter.post('/search/', homeController.searchBlog);
