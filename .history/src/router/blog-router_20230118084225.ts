import { Router } from 'express';
import homeController from "../controller/HomeController";

export const productRouter = Router();
productRouter.get('/createProduct', homeController.showFormCreate);
productRouter.post('/create', homeController.createBlog);
productRouter.get('/update/:id', homeController.showFormEdit);
productRouter.post('/edit/:id', homeController.updateBlog);
productRouter.get('/delete/:id', homeController.s);
productRouter.post('/delete/:id', homeController.deleteProduct);
productRouter.get('/detailp/:id', homeController.showFormDetail);
productRouter.post('/search/', homeController.searchProduct);
