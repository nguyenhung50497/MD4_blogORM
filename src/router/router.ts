import { Router } from "express";
import blogController from "../controller/BlogController";
import userController from "../controller/UserController";
import { blogRouter } from './blog-router';
import { userRouter } from "./user-router";
import { adminRouter } from "./admin-router";

export const router = Router();
router.get('/home', blogController.showHome);
router.get('/home-user', blogController.showHomeUser);
router.use('/blogs', blogRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);