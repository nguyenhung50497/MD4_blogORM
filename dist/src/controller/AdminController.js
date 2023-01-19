"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const BlogService_1 = __importDefault(require("../service/BlogService"));
class AdminController {
    constructor() {
        this.showHomeAdmin = async (req, res) => {
            if (req.session.User) {
                let blogs = await BlogService_1.default.getAll();
                let user = await this.userService.findById(req.session.User);
                res.render('homeAdmin', { blogs: blogs, user: user });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showFormUser = async (req, res) => {
            if (req.session.User) {
                let users = await UserService_1.default.getAll();
                let user = await this.userService.findById(req.session.User);
                res.render('userAdmin', { users: users, user: user });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.deleteBlog = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                await this.blogService.remove(id);
                res.redirect(301, '/admin/home');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.deleteUser = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                await this.userService.remove(id);
                res.redirect(301, '/admin/user');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.blockUser = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                await this.userService.block(id);
                res.redirect(301, '/admin/user');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.activeUser = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                await this.userService.active(id);
                res.redirect(301, '/admin/user');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.searchUser = async (req, res) => {
            let users = await UserService_1.default.search(req.query.keyword);
            res.status(200).json(users);
        };
        this.searchBlog = async (req, res) => {
            let blogs = await BlogService_1.default.searchByAdmin(req.query.keyword);
            res.status(200).json(blogs);
        };
        this.showFormDetail = async (req, res) => {
            if (req.session.User) {
                let blog = await BlogService_1.default.findById(req.params.id);
                let user = await this.userService.findById(req.session.User);
                res.render('blogs/detail', { blog: blog, user: user });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.userService = UserService_1.default;
        this.blogService = BlogService_1.default;
    }
}
exports.default = new AdminController();
//# sourceMappingURL=AdminController.js.map