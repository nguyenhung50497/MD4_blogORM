declare class BlogService {
    private blogRepository;
    private tagRepository;
    private blogTagRepository;
    constructor();
    getAll: () => Promise<any>;
    getPublic: () => Promise<any>;
    getMyBlogPrivate: (idUser: any) => Promise<any>;
    getMyBlog: (idUser: any) => Promise<any>;
    save: (blog: any) => Promise<any>;
    saveBlogTag: (blogTag: any) => Promise<any>;
    private update;
    private deleteTagBlog;
    findById: (id: any) => Promise<any>;
    findByName: (name: any) => Promise<any>;
    private remove;
    search: (name: any, idUser: any) => Promise<any>;
    searchByAdmin: (name: any) => Promise<any>;
}
declare const _default: BlogService;
export default _default;
