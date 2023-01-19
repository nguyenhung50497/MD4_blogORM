"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const BlogController_1 = __importDefault(require("../controller/BlogController"));
const blog_router_1 = require("./blog-router");
const user_router_1 = require("./user-router");
const admin_router_1 = require("./admin-router");
exports.router = (0, express_1.Router)();
exports.router.get('/home', BlogController_1.default.showHome);
exports.router.get('/home-user', BlogController_1.default.showHomeUser);
exports.router.use('/blogs', blog_router_1.blogRouter);
exports.router.use('/users', user_router_1.userRouter);
exports.router.use('/admin', admin_router_1.adminRouter);
//# sourceMappingURL=router.js.map