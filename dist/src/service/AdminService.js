"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
class UserService {
    constructor() {
        this.getAll = async () => {
            let users = await this.userRepository.find();
            return users;
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username, password: user.password });
            if (!userCheck) {
                return null;
            }
            return userCheck;
        };
        this.checkUsername = async (user) => {
            let usernameCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!usernameCheck) {
                return null;
            }
            return usernameCheck;
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
        this.search = async (firstName) => {
            let sql = `SELECT * FROM User WHERE firstName LIKE '%${firstName}%'`;
            let blogs = await this.userRepository.query(sql);
            if (!blogs) {
                return null;
            }
            return blogs;
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=AdminService.js.map