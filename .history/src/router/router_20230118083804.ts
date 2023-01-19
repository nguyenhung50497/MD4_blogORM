import { Router } from "express";
import homeController from "../controller/HomeController";
import userController from "../controller/UserController";
import { productRouter } from './blog-router';
import { userRouter } from "./user-router";

export const router = Router();
router.get('/home', homeController.showHome);
router.get('/home-admin', homeController.showHomeAdmin);
router.get('/home-user', homeController.showHomeCustomer);
router.post('/home-user', userController.priceRange);
router.use('/blogs', productRouter);
router.use('/users', userRouter);