declare class UserService {
    private userRepository;
    constructor();
    getAll: () => Promise<any>;
    checkUser: (user: any) => Promise<any>;
    checkUsername: (user: any) => Promise<any>;
    registerUser: (user: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    private changePassword;
    search: (firstName: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
