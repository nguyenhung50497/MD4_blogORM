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
            let products = await blogService.getAll();
            res.render('homeLogined', { products: products });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showHomeUser = async (req: Request, res: Response) => {
        if (req.session.User) {
            let products = await blogService.getAll();
            res.render('homeCustomer', { products: products });
        }
        else {
            res.redirect(301, '/users/login');
        }
    }

    showFormCreate = async (req: Request, res: Response) => {
        if (req.session.User) {
            console.log(2);
            let categories = await blogService.getAll();
            res.render('products/create', {categories: categories});
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
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await blogService.save(product);
                    console.log('added product');
                    
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
            let product = await blogService.findById(id);
            let categories = await tagService.getAll();
            res.render('products/edit', {product: product, categories: categories});
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
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await this.blogService.update(id, product);
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
            let product = await blogService.findById(req.params.id);
            res.render('products/detail', { product: product });
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