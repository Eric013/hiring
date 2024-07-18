import { UserRepository } from '../../Domain/Repositories/UserRepository';
import { User } from '../../Domain/Models/User';

export class InMemoryUserRepository implements UserRepository {
    private users: Map<string, User> = new Map();

    constructor(users?: User[]) {
        this.users = new Map(users?.map((user) => [user.id, user]));
    }

    async findById(userId: string): Promise<User | undefined> {
        return Promise.resolve(this.users.get(userId));
    }

    async save(user: User): Promise<void> {
        Promise.resolve(this.users.set(user.id, user));
    }
}
