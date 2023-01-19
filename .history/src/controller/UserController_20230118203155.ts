import { Request, Response } from "express";
import userService from '../service/UserService';
import blogService from '../service/BlogService';

import bcrypt from 'bcrypt';

declare module "express-session" {
    interface SessionData {
        User: { [key: string]: any }
    }
}

class UserController {
    private userService;
    private blogService;
    constructor() {
        this.userService = userService;
        this.blogService = blogService;
    }

    showFormLogin = async (req: Request, res: Response) => {
        let error = req.flash().error || [];
        res.render('users/login', { error: error });
    }

    login = async (req: Request, res: Response) => {
        let user = await this.userService.checkEmail(req.body);
        if (user) {
            if (user.status === 'Locked') {
                req.flash('error', 'Your account is locked!!!');
                res.redirect(301, '/users/login');
            }
            else {
                let comparePass = await bcrypt.compare(req.body.password, user.password);
                if (comparePass) {
                    req.session.User = user.idUser;
                    if (user.role === 'admin') {
                        res.redirect(301, '/admin/home');
                    }
                    else {
                        res.redirect(301, '/home-user');
                    }
                }
                else {
                    req.flash('error', 'Wrong password!!!');
                    res.redirect(301, '/users/login');
                }
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
        let username = await this.userService.checkEmail(req.body);
        if (username) {
            req.flash('error',"username is already exist!!!");
            res.redirect(301, '/users/register');
        }
        else {
            let passwordHash = await bcrypt.hash(req.body.password, 10);
            let user = req.body;
            let imageName = '';
            let newUser = {};
            if (req.files) {
                let image = req.files.image;
                if ('mv' in image) {
                    await image.mv('./public/storage/' + image.name);
                    imageName = '/storage/' + image.name;
                    newUser = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        password: passwordHash,
                        age: user.age,
                        avatar: imageName,
                        status: 'active',
                        role: 'user'
                    }
                    
                }
            }
            
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
            let blogs = await blogService.getMyBlog(req.session.User);
            res.render('users/myBlogs', {blogs: blogs});
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    searchBlog = async (req: Request, res: Response) => {
        let blogs = await blogService.search(req.query.keyword, req.session.User);
        res.status(200).json(blogs);
    }

}

export default new UserController();