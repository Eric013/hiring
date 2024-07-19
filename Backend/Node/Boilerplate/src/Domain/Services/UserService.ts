import { User } from '../Models/User';

export interface UserService {
    createUser(name: string, email: string): Promise<User>;
    getUserById(userId: string): Promise<User | undefined>;
}
