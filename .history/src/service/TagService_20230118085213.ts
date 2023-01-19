import { Tag } from "../model/tag";
import { AppDataSource } from "../data-source";

class TagService {
    private tagRepository;
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Tag);
    }

    getAll = async () => {
        let categories = await this.categoryRepository.find();
        return categories;
    }

}

export default new TagService();