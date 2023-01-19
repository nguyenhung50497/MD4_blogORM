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
        let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user JOIN blog_Tag b ON p.id = b.blog JOIN tag t ON b.tag = tag.idTag`
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
        let sql = `SELECT * FROM Blog p JOIN Blog_Tag b ON p.id = b.blog JOIN tag t ON b.tag = tag.idTag WHERE id = '%${id}%'`
        let blog = await this.blogRepository.query(sql);
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
        let sql = `SELECT * FROM Blog p JOIN Blog_Tag b ON p.id = b.blog JOIN tag t ON b.tag = tag.idTag WHERE name LIKE '%${name}%'`
        let blogs = await this.blogRepository.query(sql);
        if (!blogs) {
            return null;
        }
        return blogs;
    }
}

export default new BlogService();