import { EntityRepository, Repository, In } from 'typeorm';
import { Tag } from './tags.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  findTagsByName(names: string[]): Promise<Tag[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
