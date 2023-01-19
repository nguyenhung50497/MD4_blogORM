import { Request, Response } from "express";
import blogService from '../service/BlogService';
import tagService from '../service/TagService';

class BlogController {
    private blogService;
    private tagService;
    constructor() {
        this.blogService = blogService;
        this.tagService = tagService;
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
            res.render('homeUser', { blogs: blogs });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormCreate = async (req: Request, res: Response) => {
        if (req.session.User) {
            let tags = await blogService.getAll();
            res.render('blogs/create', {tags: tags});
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
                    let newBlog = {
                        name: blog.name,
                        content: blog.content,
                        image: blog.image,
                        statusBlog: blog.status,
                        user: req.session.User
                    }
                    await blogService.save(newBlog);
                    let searchBlog = await blogService.findByName(newBlog.name);
                    let blogTag = {
                        blog: searchBlog.id,
                        tag: 
                    }
                    await blogService.saveBlogTag(newBlog);
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
            res.render('blogs/edit', {blog: blog, tags: tags});
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
            res.redirect(301, '/home-user');
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormDetail = async (req: Request, res: Response) => {
        if (req.session.User) {
            let blog = await blogService.findById(req.params.id);
            res.render('blogs/detail', { blog: blog });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }
}

export default new BlogController();