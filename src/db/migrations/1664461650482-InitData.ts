import { AppDataSource } from '../../app.datasource';
import { Tag } from '../../products/db/tags.entity';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserAddress } from '../../users/db/userAddress.entity';

export class InitData1664461650482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.saveProducts(await this.saveTags());
    await this.saveUsers();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [
      {
        name: 'NEW',
      },
      {
        name: 'PROMO',
      },
      {
        name: 'LAST_ITEMS',
      },
    ];

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await AppDataSource.getRepository('Tag').save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }

  private async saveProducts(tags: Tag[]): Promise<void> {
    const products = [];
    for (let i = 0; i < 10; i++) {
      const savedId = faker.datatype.uuid();

      const product = {
        id: savedId,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        count: faker.datatype.number(10),
        tags: [tags[0], tags[1]],
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      products.push(product);
    }
    console.log('Products saved');
    await AppDataSource.getRepository('Product').save(products);
  }

  private async saveUsers(): Promise<void> {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const savedId = faker.datatype.uuid();

      const user = {
        id: savedId,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        dateOfBirth: faker.date.past(),
        role: 'ADMIN',
        address: await this.saveUserAddress(),
      };
      users.push(user);
    }
    console.log('Users saved');
    await AppDataSource.getRepository('User').save(users);
  }

  private async saveUserAddress(): Promise<UserAddress[]> {
    const userAddressessArr: UserAddress[] = [];
    const userAddresses = [];
    for (let i = 0; i < 10; i++) {
      const savedId = faker.datatype.uuid();

      const address = {
        id: savedId,
        country: faker.address.country(),
        city: faker.address.city(),
        street: faker.address.street(),
        number: faker.address.buildingNumber(),
      };
      userAddresses.push(address);
    }

    for (const address of userAddresses) {
      const addressToSave = new UserAddress();
      addressToSave.id = address.id;
      addressToSave.country = address.country;
      addressToSave.city = address.city;
      addressToSave.street = address.street;
      addressToSave.number = address.number;

      userAddressessArr.push(
        await AppDataSource.getRepository('UserAddress').save(addressToSave),
      );
    }
    console.log('Addresses saved');
    return userAddressessArr;
  }
}
