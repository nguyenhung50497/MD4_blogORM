import { Blog } from "../model/blog";
import { Tag } from "../model/tag";
import { AppDataSource } from "../data-source";

class BlogService {
    private blogRepository
    private tagRepository
    constructor() {
        this.blogRepository = AppDataSource.getRepository(Blog);
        this.tagRepository = AppDataSource.getRepository(Tag);
    }

    getAll = async () => {
        let sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory`
        let products = await this.blogRepository.query(sql);
        return products;
    }

    save = async (product) => {
        return this.blogRepository.save(product);
    }

    private update = async (id, newProduct) => {
        let product = await this.blogRepository.findOneBy({id: id});
        if (!product) {
            return null;
        }
        return this.blogRepository.update({id: id}, newProduct);
    }

    findById = async (id) => {
        let product = await this.blogRepository.findOneBy({id: id});
        if (!product) {
            return null;
        }
        return product;
    }

    private remove = async (id) => {
        let product = await this.blogRepository.findOneBy({id: id});
        if (!product) {
            return null;
        }
        return this.blogRepository.delete({id: id});
    }

    search = async (name) => {
        let sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE name LIKE '%${name}%'`
        let products = await this.blogRepository.query(sql);
        if (!products) {
            return null;
        }
        return products;
    }

    priceRange = async (value) => {
        let products;
        let sql;
        switch (value) {
            case 99:
                sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 0 AND ${value}`
                products = await this.blogRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 499:
                sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 100 AND ${value}`
                products = await this.blogRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 999:
                sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 500 AND ${value}`
                products = await this.blogRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 1999:
                sql = `SELECT * FROM product p JOIN category c ON p.category = c.idCategory WHERE price BETWEEN 1000 AND ${value}`
                products = await this.productRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            default:
                return products = await this.productRepository.find();
        }
    }
}

export default new BlogService();