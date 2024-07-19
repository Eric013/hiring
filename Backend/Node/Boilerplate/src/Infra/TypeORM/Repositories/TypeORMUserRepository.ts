import { AppDataSource } from './../../../../datasource';
import { UserRepository } from '../../../Domain/Repositories/UserRepository';
import { UserEntity } from '../Entities/UserEntity';
import { User } from '../../../Domain/Models/User';

export class TypeORMUserRepository implements UserRepository {
    private repository = AppDataSource.getRepository(UserEntity);

    constructor(users?: User[]) {
        if (users) {
            this.initialize(users);
        }
    }

    private async initialize(users: User[]): Promise<void> {
        const userEntities = users.map((user) => {
            const userEntity = new UserEntity();
            userEntity.id = user.id;
            userEntity.name = user.name;
            return userEntity;
        });

        await Promise.all(
            userEntities.map((userEntity) => this.repository.save(userEntity)),
        );
    }

    async findById(userId: string): Promise<User | undefined> {
        const userEntity = await this.repository.findOneBy({ id: userId });
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
