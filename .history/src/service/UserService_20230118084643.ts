import { User } from "../model/user";
import { Cart } from "../model/blog-tag";
import { Product } from "../model/blog";
import { AppDataSource } from "../data-source";

class UserService {
    private userRepository;
    private cartRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.cartRepository = AppDataSource.getRepository(Cart);
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

    checkUsername = async (user) => {
        let usernameCheck = await this.userRepository.findOneBy({ username: user.username});
        if (!usernameCheck) {
            return null;
        }
        return usernameCheck;
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

    findCartByUser = async (user) => {
        let sql = `SELECT * FROM cart JOIN product ON cart.product = product.id WHERE user = ${user}`
        let cart = await this.cartRepository.query(sql);
        if (!cart) {
            return null;
        }
        return cart;
    }

    private removeCart = async (idCart) => {
        let product = await this.cartRepository.findOneBy({idCart: idCart});
        if (!product) {
            return null;
        }
        return this.cartRepository.delete({idCart: idCart});
    }

    // totalMoney = async (user) => {
    //     let cart = await Cart.find({ user: user }).populate('product');
    //     let sum = 0;
    //     if (cart) {
    //         for (let i = 0; i < cart.length; i++) {
    //             let product = await Product.findById(cart[i].product);
    //             sum += cart[i].quantity * product.price;
    //         }
    //     }
    // }
}

export default new UserService();