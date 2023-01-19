import { Router } from "express";
import blogController from "../controller/BlogController";
import userController from "../controller/UserController";
import { blogRouter } from './blog-router';
import { userRouter } from "./user-router";

export const router = Router();
router.get('/home', blogController.showHome);
router.get('/home-admin', blogController.showHomeAdmin);
router.get('/home-user', homeController.showHomeUser);
router.use('/blogs', blogRouter);
router.use('/users', userRouter);