import { EntityRepository, Repository, In } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUsersByName(names: string[]): Promise<User[]> {
    return this.find({
      where: {
        firstName: In(names),
      },
    });
  }

  // findUserByEmail(emails: string[]): Promise<User[]> {
  //   return this.find({
  //     where: {
  //       email: In(emails),
  //     },
  //   });
  // }
}
