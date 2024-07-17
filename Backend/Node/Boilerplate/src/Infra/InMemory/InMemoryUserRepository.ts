import { UserRepository } from '../../Domain/Repositories/UserRepository';
import { User } from '../../Domain/Models/User';

export class InMemoryUserRepository implements UserRepository {
    private users: Map<string, User> = new Map();

    async findById(userId: string): Promise<User | undefined> {
        return this.users.get(userId);
    }

    async save(user: User): Promise<void> {
        this.users.set(user.id, user);
    }
}
