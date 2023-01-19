import { Request, Response } from "express";
declare class BlogController {
    private blogService;
    private tagService;
    private userService;
    constructor();
    showHome: (req: Request, res: Response) => Promise<void>;
    showHomeUser: (req: Request, res: Response) => Promise<void>;
    showFormCreate: (req: Request, res: Response) => Promise<void>;
    createBlog: (req: Request, res: Response) => Promise<void>;
    showFormEdit: (req: Request, res: Response) => Promise<void>;
    updateBlog: (req: Request, res: Response) => Promise<void>;
    deleteBlog: (req: Request, res: Response) => Promise<void>;
    showFormDetail: (req: Request, res: Response) => Promise<void>;
    showDetailPublic: (req: Request, res: Response) => Promise<void>;
}
declare const _default: BlogController;
export default _default;
