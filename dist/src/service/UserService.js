"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
class UserService {
    constructor() {
        this.getAll = async () => {
            let sql = `SELECT * FROM User WHERE role = 'user'`;
            let users = await this.userRepository.query(sql);
            return users;
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username, password: user.password });
            if (!userCheck) {
                return null;
            }
            return userCheck;
        };
        this.checkEmail = async (user) => {
            let emailCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!emailCheck) {
                return null;
            }
            return emailCheck;
        };
        this.registerUser = async (user) => {
            return await this.userRepository.save(user);
        };
        this.findById = async (id) => {
            let user = await this.userRepository.findOneBy({ idUser: id });
            if (!user) {
                return null;
            }
            return user;
        };
        this.changePassword = async (id, newPassword) => {
            let user = await this.userRepository.findOneBy({ idUser: id });
            if (!user) {
                return null;
            }
            return this.userRepository.update({ idUser: id }, { password: newPassword });
        };
        this.search = async (name) => {
            let sql = `SELECT * FROM User WHERE role = 'user' AND (firstName LIKE '%${name}%' OR lastName LIKE '%${name}%') `;
            let blogs = await this.userRepository.query(sql);
            if (!blogs) {
                return null;
            }
            return blogs;
        };
        this.remove = async (id) => {
            let blog = await this.userRepository.findOneBy({ idUser: id });
            if (!blog) {
                return null;
            }
            return this.userRepository.delete({ idUser: id });
        };
        this.block = async (id) => {
            let blog = await this.userRepository.findOneBy({ idUser: id });
            if (!blog) {
                return null;
            }
            return this.userRepository.update({ idUser: id }, { status: "Locked" });
        };
        this.active = async (id) => {
            let blog = await this.userRepository.findOneBy({ idUser: id });
            if (!blog) {
                return null;
            }
            return this.userRepository.update({ idUser: id }, { status: "Active" });
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map