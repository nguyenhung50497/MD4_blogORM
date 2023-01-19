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
        let sql = `SELECT * FROM blog p JOIN tag c ON p.tag = c.idtag`
        let blogs = await this.blogRepository.query(sql);
        return blogs;
    }

    save = async (blog) => {
        return this.blogRepository.save(blog);
    }

    private update = async (id, newblog) => {
        let blog = await this.blogRepository.findOneBy({id: id});
        if (!blog) {
            return null;
        }
        return this.blogRepository.update({id: id}, newblog);
    }

    findById = async (id) => {
        let blog = await this.blogRepository.findOneBy({id: id});
        if (!blog) {
            return null;
        }
        return blog;
    }

    private remove = async (id) => {
        let blog = await this.blogRepository.findOneBy({id: id});
        if (!blog) {
            return null;
        }
        return this.blogRepository.delete({id: id});
    }

    search = async (name) => {
        let sql = `SELECT * FROM blog p JOIN tag c ON p.tag = c.idtag WHERE name LIKE '%${name}%'`
        let blogs = await this.blogRepository.query(sql);
        if (!blogs) {
            return null;
        }
        return blogs;
    }

    priceRange = async (value) => {
        let blogs;
        let sql;
        switch (value) {
            case 99:
                sql = `SELECT * FROM blog p JOIN tag c ON p.tag = c.idtag WHERE price BETWEEN 0 AND ${value}`
                blogs = await this.blogRepository.query(sql);
                if (!blogs) {
                    return null;
                }
                return blogs;
            case 499:
                sql = `SELECT * FROM blog p JOIN tag c ON p.tag = c.idtag WHERE price BETWEEN 100 AND ${value}`
                blogs = await this.blogRepository.query(sql);
                if (!blogs) {
                    return null;
                }
                return blogs;
            case 999:
                sql = `SELECT * FROM blog p JOIN tag c ON p.tag = c.idtag WHERE price BETWEEN 500 AND ${value}`
                blogs = await this.blogRepository.query(sql);
                if (!blogs) {
                    return null;
                }
                return blogs;
            case 1999:
                sql = `SELECT * FROM blog p JOIN tag c ON p.tag = c.idtag WHERE price BETWEEN 1000 AND ${value}`
                blogs = await this.blogRepository.query(sql);
                if (!blogs) {
                    return null;
                }
                return blogs;
            default:
                return blogs = await this.blogRepository.find();
        }
    }
}

export default new BlogService();