import { Tag } from "../model/tag";
import { AppDataSource } from "../data-source";

class TagService {
    private tagRepository;
    constructor() {
        this.tagRepository = AppDataSource.getRepository(Tag);
    }

    getAll = async () => {
        let tags = await this.tagRepository.find();
        return tags;
    }

    checkTag = async (nameTag) => {
        let checkTag = await this.tagRepository.fi
    }
}

export default new TagService();