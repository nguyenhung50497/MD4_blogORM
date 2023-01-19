"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = require("../model/blog");
const tag_1 = require("../model/tag");
const blog_tag_1 = require("../model/blog-tag");
const data_source_1 = require("../data-source");
class BlogService {
    constructor() {
        this.getAll = async () => {
            let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user`;
            let blogs = await this.blogRepository.query(sql);
            return blogs;
        };
        this.getPublic = async () => {
            let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user WHERE statusBlog = 'Public'`;
            let blogs = await this.blogRepository.query(sql);
            return blogs;
        };
        this.getMyBlogPrivate = async (idUser) => {
            let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user WHERE idUser = ${idUser} AND statusBlog = 'Private'`;
            let blogs = await this.blogRepository.query(sql);
            return blogs;
        };
        this.getMyBlog = async (idUser) => {
            let sql = `SELECT * FROM user u JOIN blog p ON u.idUser = p.user WHERE idUser = ${idUser}`;
            let blogs = await this.blogRepository.query(sql);
            return blogs;
        };
        this.save = async (blog) => {
            return this.blogRepository.save(blog);
        };
        this.saveBlogTag = async (blogTag) => {
            return this.blogTagRepository.save(blogTag);
        };
        this.update = async (id, newblog) => {
            let blog = await this.blogRepository.findOneBy({ id: id });
            if (!blog) {
                return null;
            }
            await this.blogRepository.update({ id: id }, { name: newblog.name, content: newblog.content, image: newblog.image, statusBlog: newblog.statusBlog });
            return "Update success";
        };
        this.deleteTagBlog = async (idBlog) => {
            let blog = await this.blogTagRepository.findOneBy({ blog: idBlog });
            if (!blog) {
                return null;
            }
            return this.blogTagRepository.delete({ blog: idBlog });
        };
        this.findById = async (id) => {
            let sql = `SELECT * FROM blog p JOIN blog_tag b ON p.id = b.blog JOIN tag t ON b.tag = t.idTag JOIN user u ON p.user = u.idUser WHERE id = ${id}`;
            let blog = await this.blogRepository.query(sql);
            if (!blog) {
                return null;
            }
            return blog;
        };
        this.findByName = async (name) => {
            let blog = await this.blogRepository.findOneBy({ name: name });
            if (!blog) {
                return null;
            }
            return blog;
        };
        this.remove = async (id) => {
            let blog = await this.blogRepository.findOneBy({ id: id });
            if (!blog) {
                return null;
            }
            return this.blogRepository.delete({ id: id });
        };
        this.search = async (name, idUser) => {
            let sql = `SELECT * FROM blog p JOIN user u ON p.user = u.idUser WHERE name LIKE '%${name}%' AND statusBlog = 'Public'`;
            let blogs1 = await this.blogRepository.query(sql);
            sql = `SELECT * FROM blog p JOIN user u ON p.user = u.idUser WHERE name LIKE '%${name}%' AND statusBlog = 'Private' AND idUser = ${idUser}`;
            let blogs2 = await this.blogRepository.query(sql);
            let blogs = await blogs1.concat(blogs2);
            if (!blogs) {
                return null;
            }
            return blogs;
        };
        this.searchByAdmin = async (name) => {
            let sql = `SELECT * FROM blog p JOIN user u ON p.user = u.idUser WHERE name LIKE '%${name}%'`;
            let blogs = await this.blogRepository.query(sql);
            if (!blogs) {
                return null;
            }
            return blogs;
        };
        this.blogRepository = data_source_1.AppDataSource.getRepository(blog_1.Blog);
        this.tagRepository = data_source_1.AppDataSource.getRepository(tag_1.Tag);
        this.blogTagRepository = data_source_1.AppDataSource.getRepository(blog_tag_1.BlogTag);
    }
}
exports.default = new BlogService();
//# sourceMappingURL=BlogService.js.map