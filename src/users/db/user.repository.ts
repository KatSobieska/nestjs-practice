import { Injectable } from '@nestjs/common';
import { TextFilterType } from 'src/shared/enums/textFilterType.enum';
import {
  Repository,
  In,
  DataSource,
  FindManyOptions,
  FindOptionsWhere,
  Between,
  MoreThan,
  LessThan,
  Like,
  Equal,
} from 'typeorm';
import { UsersQuery } from '../queries/UsersQuery.interface';
import { User } from './users.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  findUsersByName(names: string[]): Promise<User[]> {
    return this.find({
      where: {
        firstName: In(names),
      },
    });
  }

  private buildPredicate(query: UsersQuery): FindManyOptions<User> {
    const predicate: FindOptionsWhere<User> = {};

    if (query.dateOfBirthLaterThan && query.dateOfBirthEarlierThan) {
      predicate.dateOfBirth = Between(
        new Date(query.dateOfBirthLaterThan),
        new Date(query.dateOfBirthEarlierThan),
      );
    } else if (query.dateOfBirthLaterThan) {
      predicate.dateOfBirth = MoreThan(new Date(query.dateOfBirthLaterThan));
    } else if (query.dateOfBirthEarlierThan) {
      predicate.dateOfBirth = LessThan(new Date(query.dateOfBirthEarlierThan));
    }

    if (query.firstName && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.firstName = Like(`%${query.firstName}%`);
    } else if (query.firstName) {
      predicate.firstName = Equal(query.firstName);
    }

    if (query.lastName && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.lastName = Like(`%${query.lastName}%`);
    } else if (query.lastName) {
      predicate.lastName = Equal(query.lastName);
    }

    if (query.email && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.email = Like(`%${query.email}%`);
    } else if (query.email) {
      predicate.email = Equal(query.email);
    }

    if (query.role) {
      predicate.role = Equal(query.role);
    }

    const findManyOptions: FindManyOptions<User> = {
      where: predicate,
    };

    findManyOptions.order = {
      [query.sortField || 'createdAt']: query.firstName,
    };

    return findManyOptions;
  }

  findAll(_query_: UsersQuery): Promise<User[]> {
    return this.find(this.buildPredicate(_query_));
  }

  findUserByEmail(_query_: UsersQuery): Promise<User> {
    return this.findOne(this.buildPredicate(_query_));
  }
}
