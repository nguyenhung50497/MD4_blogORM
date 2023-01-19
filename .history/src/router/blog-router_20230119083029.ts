import { Router } from 'express';
import blogController from "../controller/BlogController";

export const blogRouter = Router();
blogRouter.get('/create', blogController.showFormCreate);
blogRouter.post('/create', blogController.createBlog);
blogRouter.get('/update/:id', blogController.showFormEdit);
blogRouter.post('/edit/:id', blogController.updateBlog);
blogRouter.post('/delete/:id', blogController.deleteBlog);
blogRouter.get('/detail-user/:id', blogController.showFormDetail);
blogRouter.get('/detail-public/:id', blogController.s);
