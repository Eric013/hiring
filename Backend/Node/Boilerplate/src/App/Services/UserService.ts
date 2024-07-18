import { UserRepository } from './../../Domain/Repositories/UserRepository';
import { User } from '../../Domain/Models/User';

export class UserService implements UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(name: string, email: string): Promise<User> {
        const user = new User(name, email);
        await this.userRepository.save(user);

        return user;
    }

    async getUserById(userId: string): Promise<User | undefined> {
        return this.userRepository.findById(userId);
    }
}
