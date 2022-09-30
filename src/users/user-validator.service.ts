import { Injectable } from '@nestjs/common';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UsersDataService } from './users-data.service';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UsersDataService) {}

  async validateUniqueEmail(email: string): Promise<void> {
    const userEmail = await this.userRepository.getUserByEmail(email);
    if (userEmail) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
