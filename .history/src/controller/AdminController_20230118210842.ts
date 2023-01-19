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
        if (req.session.User) {
            let blogs = await blogService.getAll();
            let user = await this.userService.findById(req.session.User);
            res.render('homeAdmin', { blogs: blogs, user: user });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let users = await userService.getAll();
            res.render('userAdmin', { users: users });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    deleteBlog = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.blogService.remove(id);
            res.redirect(301, '/admin/home');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.userService.remove(id);
            res.redirect(301, '/admin/user');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    blockUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.userService.block(id);
            res.redirect(301, '/admin/user');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    activeUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.userService.active(id);
            res.redirect(301, '/admin/user');
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
        let blogs = await blogService.searchByAdmin(req.query.keyword);
        res.status(200).json(blogs);
    }

}

export default new AdminController();