import { EntityRepository, In, Repository } from 'typeorm';
import { Role } from './roles.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  findRolesByName(names: string[]): Promise<Role[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
