"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const BlogService_1 = __importDefault(require("../service/BlogService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor() {
        this.showFormLogin = async (req, res) => {
            let error = req.flash().error || [];
            res.render('users/login', { error: error });
        };
        this.login = async (req, res) => {
            let user = await this.userService.checkEmail(req.body);
            if (user) {
                if (user.status === 'Locked') {
                    req.flash('error', 'Your account is locked!!!');
                    res.redirect(301, '/users/login');
                }
                else {
                    let comparePass = await bcrypt_1.default.compare(req.body.password, user.password);
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
        };
        this.showFormRegister = async (req, res) => {
            let error = req.flash().error || [];
            res.render('users/register', { error: error });
        };
        this.register = async (req, res) => {
            if (!req.session.User) {
                console.log(1);
                console.log(req.files);
                if (req.files) {
                    console.log(2);
                    let image = req.files.image;
                    if ('mv' in image) {
                        await image.mv('./public/storage/' + image.name);
                        let imageName = '/storage/' + image.name;
                        let username = await this.userService.checkEmail(req.body);
                        if (username) {
                            req.flash('error', "username is already exist!!!");
                            res.redirect(301, '/users/register');
                        }
                        else {
                            let passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
                            let user = req.body;
                            let newUser = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                username: user.username,
                                password: passwordHash,
                                age: user.age,
                                avatar: imageName,
                                status: 'Active',
                                role: 'user'
                            };
                            console.log(newUser.avatar);
                            await this.userService.registerUser(newUser);
                            res.redirect(301, '/users/login');
                        }
                    }
                }
            }
            else {
                res.redirect(301, '/users/register');
            }
        };
        this.logout = async (req, res) => {
            await req.session.destroy((err) => {
                console.log('Destroyed');
                res.redirect(301, '/home');
            });
        };
        this.showFormChangePassword = async (req, res) => {
            if (req.session.User) {
                let error = req.flash().error || [];
                let user = await this.userService.findById(req.session.User);
                res.render('users/changePassword', { user: user, error: error });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.changePassword = async (req, res) => {
            if (req.session.User) {
                let user = await this.userService.checkUser(req.body);
                let comparePass = await bcrypt_1.default.compare(req.body.password, req.body.newPassword);
                if (!user) {
                    req.flash('error', 'Old password is wrong!!!');
                    res.redirect(301, '/users/change-pass');
                }
                else if (comparePass) {
                    req.flash('error', "New password doesn't match!!!");
                    res.redirect(301, '/users/change-pass');
                }
                else {
                    let passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
                    let newUser = await this.userService.changePassword(req.session.User, passwordHash);
                    await req.session.destroy((err) => {
                        res.redirect(301, '/users/login');
                    });
                }
            }
        };
        this.showMyBlog = async (req, res) => {
            if (req.session.User) {
                let blogs = await BlogService_1.default.getMyBlog(req.session.User);
                let user = await this.userService.findById(req.session.User);
                res.render('users/myBlogs', { blogs: blogs, user: user });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.searchBlog = async (req, res) => {
            let blogs = await BlogService_1.default.search(req.query.keyword, req.session.User);
            console.log(blogs);
            res.status(200).json(blogs);
        };
        this.userService = UserService_1.default;
        this.blogService = BlogService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map