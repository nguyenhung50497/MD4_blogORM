"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../model/tag");
const data_source_1 = require("../data-source");
class TagService {
    constructor() {
        this.getAll = async () => {
            let tags = await this.tagRepository.find();
            return tags;
        };
        this.checkTag = async (nameTag) => {
            let checkTag = await this.tagRepository.findOneBy({ nameTag: nameTag });
            if (checkTag) {
                return checkTag.idTag;
            }
            else {
                let newTag = await this.tagRepository.save({ nameTag });
                return newTag.idTag;
            }
        };
        this.tagRepository = data_source_1.AppDataSource.getRepository(tag_1.Tag);
    }
}
exports.default = new TagService();
//# sourceMappingURL=TagService.js.map