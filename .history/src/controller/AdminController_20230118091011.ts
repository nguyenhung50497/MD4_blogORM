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

    showFormLogin = async (req: Request, res: Response) => {
        let error = req.flash().error || [];
        res.render('users/login', { error: error });
    }

    login = async (req: Request, res: Response) => {
        let user = await this.userService.checkUsername(req.body);
        if (user) {
            let comparePass = await bcrypt.compare(req.body.password, user.password);
            if (comparePass) {
                req.session.User = user.idUser;
                if (user.role === 'admin') {
                    res.redirect(301, '/home-logined');
                }
                else {
                    res.redirect(301, '/home-customer');
                }
            }
            else {
                req.flash('error', 'Wrong password!!!');
                res.redirect(301, '/users/login');
            }
        }
        else {
                req.flash('error', 'Wrong username!!!');
                res.redirect(301, '/users/login');
        }
    }

    showFormRegister = async (req: Request, res: Response) => {
        let error = req.flash().error || [];
        res.render('users/register', { error: error });
    }

    register = async (req: Request, res: Response) => {
        let username = await this.userService.checkUsername(req.body);
        if (username) {
            req.flash('error',"Username is already exist!!!");
            res.redirect(301, '/users/register');
        }
        else {
            let passwordHash = await bcrypt.hash(req.body.password, 10);
            let newUser = {
                username: req.body.username,
                password: passwordHash,
                role: 'user',
            }
            await this.userService.registerUser(newUser);
            res.redirect(301, '/users/login');
        }
    }

    logout = async (req: Request, res: Response) => {
        await req.session.destroy((err) => {
            console.log('Destroyed');
            res.redirect(301, '/home');
        });
    }

    showFormChangePassword = async (req: Request, res: Response) => {
        if (req.session.User) {
            let error = req.flash().error || [];
            let user = await this.userService.findById(req.session.User);
            res.render('users/changePassword', {user: user, error: error});
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    changePassword = async (req: Request, res: Response) => {
        if (req.session.User) {
            let user = await this.userService.checkUser(req.body);
            let comparePass = await bcrypt.compare(req.body.password, req.body.newPassword);
            if (!user) {
                req.flash('error','Old password is wrong!!!');
                res.redirect(301, '/users/change-pass');
            }
            else if (comparePass) {
                req.flash('error',"New password doesn't match!!!");
                res.redirect(301, '/users/change-pass');
            } 
            else {
                let passwordHash = await bcrypt.hash(req.body.password, 10);
                let newUser = await this.userService.changePassword(req.session.User, passwordHash);
                await req.session.destroy((err) => {
                    res.redirect(301, '/users/login');
                });
            }
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