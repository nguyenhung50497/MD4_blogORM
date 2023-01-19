import { Request, Response } from "express";
import blogService from '../service/BlogService';
import tagService from '../service/TagService';
import userService from '../service/UserService';

class BlogController {
    private blogService;
    private tagService;
    private userService;
    constructor() {
        this.blogService = blogService;
        this.tagService = tagService;
        this.userService = userService;
    }

    showHome = async (req: Request, res: Response) => {
        let blogs = await blogService.getPublic();
        res.render('home', { blogs: blogs });
    }

    showHomeUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let blogs1 = await blogService.getPublic();
            let blogs2 = await blogService.getMyBlogPrivate(req.session.User);
            let blogs = blogs1.concat(blogs2);
            let user = await this.userService.findById(req.session.User);
            res.render('homeUser', { blogs: blogs, user: user });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormCreate = async (req: Request, res: Response) => {
        if (req.session.User) {
            let tags = await tagService.getAll();
            let user = await this.userService.findById(req.session.User);
            res.render('blogs/create', {tags: tags, user: user});
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    createBlog = async (req: Request, res: Response) => {
        if (req.session.User) {
            if (req.files) {
                let image = req.files.image;
                if ('mv' in image) {
                    await image.mv('./public/storage/' + image.name);
                    let blog = req.body;
                    blog.image = '/storage/' + image.name;
                    let checkTag = 
                    let newBlog = {
                        name: blog.name,
                        content: blog.content,
                        image: blog.image,
                        statusBlog: blog.statusBlog,
                        user: req.session.User
                    }
                    await blogService.save(newBlog);
                    let searchBlog = await blogService.findByName(newBlog.name);
                    let blogTag = {
                        blog: searchBlog.id,
                        tag: blog.tag,
                    }
                    await blogService.saveBlogTag(blogTag);
                    res.redirect(301, '/home-user');
                }
            }
        }
        else {
            res.redirect(301, '/users/login');
        }
    }
    
    showFormEdit = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            let blog = await blogService.findById(id);
            let tags = await tagService.getAll();
            let user = await this.userService.findById(req.session.User);
            res.render('blogs/edit', {blog: blog[0], tags: tags, user: user});
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    updateBlog = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            if (req.files) {
                let image = req.files.image;
                if ('mv' in image) {
                    await image.mv('./public/storage/' + image.name);
                    let blog = req.body;
                    blog.image = '/storage/' + image.name;
                    await this.blogService.update(id, blog);
                    res.redirect(301, '/home-user');
                }
            }
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    deleteBlog = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.blogService.remove(id);
            res.redirect(301, '/users/my-blog');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormDetail = async (req: Request, res: Response) => {
        if (req.session.User) {
            let blog = await blogService.findById(req.params.id);
            let user = await this.userService.findById(req.session.User);
            res.render('blogs/detail', { blog: blog[0], user: user });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showDetailPublic = async (req: Request, res: Response) => {
            let blog = await blogService.findById(req.params.id);
            res.render('blogs/detailPublic', { blog: blog[0]});
    }
}

export default new BlogController();