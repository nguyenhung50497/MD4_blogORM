import { Request, Response } from "express";
declare module "express-session" {
    interface SessionData {
        User: {
            [key: string]: any;
        };
    }
}
declare class AdminController {
    private userService;
    private blogService;
    constructor();
    showHomeAdmin: (req: Request, res: Response) => Promise<void>;
    showFormUser: (req: Request, res: Response) => Promise<void>;
    deleteBlog: (req: Request, res: Response) => Promise<void>;
    deleteUser: (req: Request, res: Response) => Promise<void>;
    blockUser: (req: Request, res: Response) => Promise<void>;
    activeUser: (req: Request, res: Response) => Promise<void>;
    searchUser: (req: Request, res: Response) => Promise<void>;
    searchBlog: (req: Request, res: Response) => Promise<void>;
    showFormDetail: (req: Request, res: Response) => Promise<void>;
}
declare const _default: AdminController;
export default _default;
