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
        let checkTag = await this.tagRepository.findOneBy({nameTag: nameTag});
        console.log(checkTag);
        
        if (checkTag) {
            return checkTag.idTag;
        }
        else {
            let newTag = await this.tagRepository.save(nameTag);
            console.log(newTag);
            
            return newTag.idTag;
        }
    }
}

export default new TagService();