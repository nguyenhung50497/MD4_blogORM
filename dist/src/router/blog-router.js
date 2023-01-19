"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const BlogController_1 = __importDefault(require("../controller/BlogController"));
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter.get('/create', BlogController_1.default.showFormCreate);
exports.blogRouter.post('/create', BlogController_1.default.createBlog);
exports.blogRouter.get('/update/:id', BlogController_1.default.showFormEdit);
exports.blogRouter.post('/edit/:id', BlogController_1.default.updateBlog);
exports.blogRouter.post('/delete/:id', BlogController_1.default.deleteBlog);
exports.blogRouter.get('/detail-user/:id', BlogController_1.default.showFormDetail);
exports.blogRouter.get('/detail-public/:id', BlogController_1.default.showDetailPublic);
//# sourceMappingURL=blog-router.js.map