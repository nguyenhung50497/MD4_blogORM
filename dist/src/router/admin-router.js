"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const AdminController_1 = __importDefault(require("../controller/AdminController"));
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.get('/home', AdminController_1.default.showHomeAdmin);
exports.adminRouter.get('/user', AdminController_1.default.showFormUser);
exports.adminRouter.post('/delete-blog/:id', AdminController_1.default.deleteBlog);
exports.adminRouter.post('/delete-user/:id', AdminController_1.default.deleteUser);
exports.adminRouter.post('/block-user/:id', AdminController_1.default.blockUser);
exports.adminRouter.post('/active-user/:id', AdminController_1.default.activeUser);
exports.adminRouter.get('/search-user', AdminController_1.default.searchUser);
exports.adminRouter.get('/search-blog', AdminController_1.default.searchBlog);
exports.adminRouter.get('/detail/:id', AdminController_1.default.showFormDetail);
//# sourceMappingURL=admin-router.js.map