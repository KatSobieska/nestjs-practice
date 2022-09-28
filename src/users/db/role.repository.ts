import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Role } from './roles.entity';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }
  findRolesByName(names: string[]): Promise<Role[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
