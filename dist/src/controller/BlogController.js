"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogService_1 = __importDefault(require("../service/BlogService"));
const TagService_1 = __importDefault(require("../service/TagService"));
const UserService_1 = __importDefault(require("../service/UserService"));
class BlogController {
    constructor() {
        this.showHome = async (req, res) => {
            let blogs = await BlogService_1.default.getPublic();
            res.render('home', { blogs: blogs });
        };
        this.showHomeUser = async (req, res) => {
            if (req.session.User) {
                let blogs1 = await BlogService_1.default.getPublic();
                let blogs2 = await BlogService_1.default.getMyBlogPrivate(req.session.User);
                let blogs = blogs1.concat(blogs2);
                let user = await this.userService.findById(req.session.User);
                res.render('homeUser', { blogs: blogs, user: user });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showFormCreate = async (req, res) => {
            if (req.session.User) {
                let user = await this.userService.findById(req.session.User);
                res.render('blogs/create', { user: user });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.createBlog = async (req, res) => {
            if (req.session.User) {
                if (req.files) {
                    let image = req.files.image;
                    if ('mv' in image) {
                        await image.mv('./public/storage/' + image.name);
                        let blog = req.body;
                        blog.image = '/storage/' + image.name;
                        let newBlog = {
                            name: blog.name,
                            content: blog.content,
                            image: blog.image,
                            statusBlog: blog.statusBlog,
                            user: req.session.User
                        };
                        const saveBlog = await BlogService_1.default.save(newBlog);
                        let tags = blog.tag.split(' ');
                        console.log(tags);
                        for (let i = 0; i < tags.length; i++) {
                            let checkTag = await this.tagService.checkTag(tags[i]);
                            let blogTag = {
                                blog: saveBlog.id,
                                tag: checkTag,
                            };
                            await BlogService_1.default.saveBlogTag(blogTag);
                        }
                        res.redirect(301, '/home-user');
                    }
                }
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showFormEdit = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                let blogs = await BlogService_1.default.findById(id);
                let tags = '';
                for (let i = 0; i < blogs.length; i++) {
                    tags += blogs[i].nameTag + ' ';
                }
                let user = await this.userService.findById(req.session.User);
                res.render('blogs/edit', { blog: blogs[0], tags: tags, user: user });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.updateBlog = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                if (req.files) {
                    let image = req.files.image;
                    if ('mv' in image) {
                        await image.mv('./public/storage/' + image.name);
                        let blog = req.body;
                        blog.image = '/storage/' + image.name;
                        await this.blogService.update(id, blog);
                        await this.blogService.deleteTagBlog(id);
                        let tags = blog.tag.split(' ');
                        console.log(tags);
                        for (let i = 0; i < tags.length; i++) {
                            let checkTag = await this.tagService.checkTag(tags[i]);
                            let blogTag = {
                                blog: id,
                                tag: checkTag,
                            };
                            await BlogService_1.default.saveBlogTag(blogTag);
                        }
                        res.redirect(301, '/home-user');
                    }
                }
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.deleteBlog = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                await this.blogService.remove(id);
                res.redirect(301, '/users/my-blog');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showFormDetail = async (req, res) => {
            if (req.session.User) {
                let blog = await BlogService_1.default.findById(req.params.id);
                console.log(blog);
                let user = await this.userService.findById(req.session.User);
                res.render('blogs/detail', { blog: blog, user: user });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showDetailPublic = async (req, res) => {
            let blog = await BlogService_1.default.findById(req.params.id);
            res.render('blogs/detailPublic', { blog: blog });
        };
        this.blogService = BlogService_1.default;
        this.tagService = TagService_1.default;
        this.userService = UserService_1.default;
    }
}
exports.default = new BlogController();
//# sourceMappingURL=BlogController.js.map