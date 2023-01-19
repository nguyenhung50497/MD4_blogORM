import { Request, Response } from "express";
declare module "express-session" {
    interface SessionData {
        User: {
            [key: string]: any;
        };
    }
}
declare class UserController {
    private userService;
    private blogService;
    constructor();
    showFormLogin: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    showFormRegister: (req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
    showFormChangePassword: (req: Request, res: Response) => Promise<void>;
    changePassword: (req: Request, res: Response) => Promise<void>;
    showMyBlog: (req: Request, res: Response) => Promise<void>;
    searchBlog: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
