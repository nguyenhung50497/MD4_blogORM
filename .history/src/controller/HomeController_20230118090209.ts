import { Request, Response } from "express";
import blogService from '../service/BlogService';
import tagService from '../service/TagService';

class HomeController {
    private blogService;
    private tagService;
    constructor() {
        this.blogService = blogService;
        this.tagService = tagService;
    }

    showHome = async (req: Request, res: Response) => {
        let blogs = await blogService.getAll();
        res.render('home', { blogs: blogs });
    }

    test = async (req: Request, res: Response) => {
        let categories = await blogService.getAll();
        res.render('blogs/create', {categories: categories});
    }

    showHomeAdmin = async (req: Request, res: Response) => {
        console.log(req.session.User);
        if (req.session.User) {
            let blogs = await blogService.getAll();
            res.render('homeLogined', { blogs: blogs });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showHomeUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let blogs = await blogService.getAll();
            res.render('homeCustomer', { blogs: blogs });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormCreate = async (req: Request, res: Response) => {
        if (req.session.User) {
            console.log(2);
            let categories = await blogService.getAll();
            res.render('blogs/create', {categories: categories});
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
                    await blogService.save(blog);
                    console.log('added blog');
                    
                    res.redirect(301, '/home-logined');
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
            let categories = await tagService.getAll();
            res.render('blogs/edit', {blog: blog, categories: categories});
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
                    res.redirect(301, '/home-logined');
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
            res.redirect(301, '/home-logined');
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

    searchBlog = async (req: Request, res: Response) => {
        let products = await blogService.search(req.body.search);
        res.render('homeCustomer', { products: products });
    }
}

export default new HomeController();