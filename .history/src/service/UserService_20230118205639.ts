import { User } from "../model/user";
import { Blog } from "../model/blog";
import { AppDataSource } from "../data-source";

class UserService {
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    getAll = async () => {
        let users = await this.userRepository.find();
        return users;
    }


    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({ username: user.username, password: user.password });
        if (!userCheck) {
            return null;
        }
        return userCheck;
    }

    checkEmail = async (user) => {
        let emailCheck = await this.userRepository.findOneBy({ username: user.username});
        if (!emailCheck) {
            return null;
        }
        return emailCheck;
    }

    registerUser = async (user) => {
        return await this.userRepository.save(user);
    }

    findById = async (id) => {
        let user = await this.userRepository.findOneBy({ idUser: id });
        if (!user) {
            return null;
        }
        return user;
    }

    private changePassword = async (id, newPassword) => {
        let user = await this.userRepository.findOneBy({ idUser: id});
        if (!user) {
            return null;
        }
        return this.userRepository.update({idUser: id}, {password: newPassword});
    }

    search = async (firstName) => {
        let sql = `SELECT * FROM User WHERE firstName LIKE '%${firstName}%' AND role = 'admin'`
        let blogs = await this.userRepository.query(sql);
        if (!blogs) {
            return null;
        }
        return blogs;
    }

    private remove = async (id) => {
        let blog = await this.userRepository.findOneBy({idUser: id});
        if (!blog) {
            return null;
        }
        return this.userRepository.delete({idUser: id});
    }

    private block = async (id) => {
        let blog = await this.userRepository.findOneBy({idUser: id});
        if (!blog) {
            return null;
        }
        return this.userRepository.update({idUser: id}, {status: "Locked"});
    }

}

export default new UserService();