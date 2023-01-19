declare class UserService {
    private userRepository;
    constructor();
    getAll: () => Promise<any>;
    checkUser: (user: any) => Promise<any>;
    checkEmail: (user: any) => Promise<any>;
    registerUser: (user: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    private changePassword;
    search: (name: any) => Promise<any>;
    private remove;
    private block;
    private active;
}
declare const _default: UserService;
export default _default;
