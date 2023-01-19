import { Request, Response } from "express";
import userService from '../service/UserService';
import blogService from '../service/BlogService';

import bcrypt from 'bcrypt';

declare module "express-session" {
    interface SessionData {
        User: { [key: string]: any }
    }
}

class HomeController {
    private userService;
    constructor() {
        this.userService = userService;
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




    showMyBlog = async (req: Request, res: Response) => {
        if (req.session.User) {

            res.render('users/cart');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    searchUser = async (req: Request, res: Response) => {
        let products = await productService.search(req.query.keyword);
        res.status(200).json(products);
    }

}

export default new HomeController();