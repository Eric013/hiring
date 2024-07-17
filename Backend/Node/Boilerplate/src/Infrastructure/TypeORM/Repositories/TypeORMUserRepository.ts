import { AppDataSource } from './../../../../datasource';
import { UserRepository } from '../../../Domain/Repositories/UserRepository';
import { User } from '../../../Domain/Entities/User';
import { UserEntity } from '../../../Infra/TypeORM/Entities/UserEntity';




export class TypeORMUserRepository implements UserRepository {
  private repository = AppDataSource.getRepository(UserEntity);

  async findById(userId: string): Promise<User | undefined> {
    const userEntity = await this.repository.findOneBy({id: userId});
    if (!userEntity) return undefined;
    return new User(userEntity.id, userEntity.name);
  }

  async save(user: User): Promise<void> {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.name = user.name;
    await this.repository.save(userEntity);
  }
}
