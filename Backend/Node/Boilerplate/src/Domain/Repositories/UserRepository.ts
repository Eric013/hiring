import { User } from '../Models/User';

export interface UserRepository {
    findById(userId: string): Promise<User | undefined>;
    save(user: User): Promise<void>;
}
