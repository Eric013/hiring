import { UserRepository } from '../../Domain/Repositories/UserRepository';
import { User } from '../../Domain/Models/User';
import { CreateUserCommand } from '../Commands/CreateUserCommand';

export class CreateUserHandler {
    constructor(private userRepository: UserRepository) {}

    async handle(command: CreateUserCommand): Promise<void> {
        const user = new User(command.userId, command.userName);
        await this.userRepository.save(user);
    }
}
