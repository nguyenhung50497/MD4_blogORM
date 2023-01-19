import { Request, Response } from "express";
import userService from '../service/UserService';
import productService from '../service/BlogService';

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