import { Request, Response } from "express";
import userService from '../service/UserService';
import blogService from '../service/BlogService';

import bcrypt from 'bcrypt';

declare module "express-session" {
    interface SessionData {
        User: { [key: string]: any }
    }
}

class AdminController {
    private userService;
    private blogService;
    constructor() {
        this.userService = userService;
        this.blogService = blogService;
    }

    showHomeAdmin = async (req: Request, res: Response) => {
        console.log(req.session.User);
        if (req.session.User) {
            let blogs = await blogService.getAll();
            res.render('homeAdmin', { blogs: blogs });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    deleteBlog = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.blogService.remove(id);
            res.redirect(301, '/home-user');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.adminService.remove(id);
            res.redirect(301, '/home-admin');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    blockUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.adminService.block(id);
            res.redirect(301, '/home-admin');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }


    searchUser = async (req: Request, res: Response) => {
        let users = await userService.search(req.query.keyword);
        res.status(200).json(users);
    }

    searchBlog = async (req: Request, res: Response) => {
        let blogs = await blogService.search(req.query.keyword);
        res.status(200).json(blogs);
    }

}

export default new AdminController();