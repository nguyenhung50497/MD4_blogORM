import { Blog } from "../model/blog";
import { Tag } from "../model/tag";
import { BlogTag } from "../model/blog-tag";
import { AppDataSource } from "../data-source";

class BlogService {
    private blogRepository
    private tagRepository
    private blogTagRepository
    constructor() {
        this.blogRepository = AppDataSource.getRepository(Blog);
        this.tagRepository = AppDataSource.getRepository(Tag);
        this.blogTagRepository = AppDataSource.getRepository(BlogTag);
    }

    getAll = async () => {
        let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user`
        let blogs = await this.blogRepository.query(sql);
        return blogs;
    }

    getPublic = async () => {
        let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user WHERE statusBlog = 'Public'`
        let blogs = await this.blogRepository.query(sql);
        return blogs;
    }

    getMyBlogPrivate = async(idUser) => {
        let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user WHERE idUser = ${idUser} AND statusBlog = 'Private'`
        let blogs = await this.blogRepository.query(sql);
        return blogs;
    }

    getMyBlog = async(idUser) => {
        let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user WHERE idUser = ${idUser}`
        let blogs = await this.blogRepository.query(sql);
        return blogs;
    }

    save = async (blog) => {
        return this.blogRepository.save(blog);
    }

    saveBlogTag = async (blogTag) => {
        return this.blogTagRepository.save(blogTag);
    }

    private update = async (id, newblog) => {
        let blog = await this.blogRepository.findOneBy({id: id});
        if (!blog) {
            return null;
        }
        await this.blogRepository.update({id: id}, {name: newblog.name, content: newblog.content, image: newblog.image, statusBlog: newblog.statusBlog});
        return "Update success";
    }

    

    findById = async (id) => {
        let sql = `SELECT * FROM blog p JOIN blog_tag b ON p.id = b.blog JOIN tag t ON b.tag = t.idTag JOIN user u ON p.user = u.idUser WHERE id = ${id}`
        let blog = await this.blogRepository.query(sql);
        if (!blog) {
            return null;
        }
        return blog;
    }

    findByName = async (name) => {
        let blog = await this.blogRepository.findOneBy({name: name});
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

    search = async (name, idUser) => {
        let sql = `SELECT * FROM blog p JOIN user u ON p.user = u.idUser WHERE name LIKE '%${name}%' AND statusBlog = 'Public'`;
        let blogs1 = await this.blogRepository.query(sql);
        sql = `SELECT * FROM blog p JOIN user u ON p.user = u.idUser WHERE name LIKE '%${name}%' AND statusBlog = 'Private' AND idUser = ${idUser}`;
        let blogs2 = await this.blogRepository.query(sql);
        let blogs = await blogs1.concat(blogs2);
        if (!blogs) {
            return null;
        }
        return blogs;
    }

    searchByAdmin = async (name) => {
        let sql = `SELECT * FROM blog p JOIN user u ON p.user = u.idUser WHERE name LIKE '%${name}%'`;
        let blogs = await this.blogRepository.query(sql);
        if (!blogs) {
            return null;
        }
        return blogs;
    }

}

export default new BlogService();